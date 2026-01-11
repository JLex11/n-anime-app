-- =====================================================
-- COMMENTS SYSTEM MIGRATION
-- =====================================================
-- This migration creates the database schema for the comments system
-- Features: Nested comments (2 levels), likes, @mentions
-- Execute this SQL in Supabase SQL Editor

-- =====================================================
-- COMMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  anime_id TEXT NOT NULL,
  episode_id TEXT,  -- NULL for anime comments, populated for episode comments
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,  -- NULL for top-level comments
  content TEXT NOT NULL CHECK (char_length(content) >= 1 AND char_length(content) <= 10000),
  edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COMMENT LIKES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, comment_id)  -- One like per user per comment
);

-- =====================================================
-- COMMENT MENTIONS TABLE (for tracking @username mentions)
-- =====================================================
CREATE TABLE IF NOT EXISTS comment_mentions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  mentioned_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, mentioned_user_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
-- Index for fetching comments by anime
CREATE INDEX IF NOT EXISTS idx_comments_anime_id ON comments(anime_id, created_at DESC);

-- Index for fetching comments by episode
CREATE INDEX IF NOT EXISTS idx_comments_episode_id ON comments(episode_id, created_at DESC) WHERE episode_id IS NOT NULL;

-- Index for fetching replies to a comment
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id, created_at DESC) WHERE parent_id IS NOT NULL;

-- Index for user's own comments
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id, created_at DESC);

-- Index for comment likes count aggregation
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON comment_likes(comment_id);

-- Index for user's liked comments
CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id ON comment_likes(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_mentions ENABLE ROW LEVEL SECURITY;

-- Comments: Anyone can read
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

-- Comments: Authenticated users can create
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Comments: Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comments: Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Comment Likes: Anyone can view
CREATE POLICY "Comment likes are viewable by everyone"
  ON comment_likes FOR SELECT
  USING (true);

-- Comment Likes: Authenticated users can create
CREATE POLICY "Authenticated users can like comments"
  ON comment_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Comment Likes: Users can delete their own likes
CREATE POLICY "Users can unlike comments"
  ON comment_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Comment Mentions: Anyone can view
CREATE POLICY "Comment mentions are viewable by everyone"
  ON comment_mentions FOR SELECT
  USING (true);

-- Comment Mentions: System can create (via server action)
CREATE POLICY "Authenticated users can create mentions"
  ON comment_mentions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to prevent deeply nested comments (max 2 levels)
CREATE OR REPLACE FUNCTION check_comment_depth()
RETURNS TRIGGER AS $$
DECLARE
  parent_parent_id UUID;
BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    -- Get the parent's parent_id
    SELECT parent_id INTO parent_parent_id
    FROM comments
    WHERE id = NEW.parent_id;

    -- If parent has a parent, we're at level 3 (not allowed)
    IF parent_parent_id IS NOT NULL THEN
      RAISE EXCEPTION 'Comments can only be nested 2 levels deep';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to enforce nesting depth
DROP TRIGGER IF EXISTS check_comment_depth_trigger ON comments;
CREATE TRIGGER check_comment_depth_trigger
  BEFORE INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION check_comment_depth();

-- =====================================================

  ALTER TABLE comments
ADD COLUMN IF NOT EXISTS thread_id UUID;

-- thread_id apunta al comentario root (top-level) del hilo
ALTER TABLE comments
ADD CONSTRAINT comments_thread_id_fkey
FOREIGN KEY (thread_id) REFERENCES comments(id)
ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION set_comment_thread_id()
RETURNS TRIGGER AS $$
DECLARE
  p_thread_id UUID;
BEGIN
  -- Asegurar id disponible en BEFORE INSERT (por si llega NULL)
  IF NEW.id IS NULL THEN
    NEW.id := gen_random_uuid();
  END IF;

  IF NEW.parent_id IS NULL THEN
    -- comentario raíz => su propio hilo
    NEW.thread_id := NEW.id;
  ELSE
    -- respuesta => hereda el hilo del padre
    SELECT thread_id INTO p_thread_id
    FROM comments
    WHERE id = NEW.parent_id;

    IF p_thread_id IS NULL THEN
      -- padre antiguo o no migrado: el hilo es el padre
      NEW.thread_id := NEW.parent_id;
    ELSE
      NEW.thread_id := p_thread_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_comment_thread_id_trigger ON comments;
CREATE TRIGGER set_comment_thread_id_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION set_comment_thread_id();

-- 1) Roots: thread_id = id
UPDATE comments
SET thread_id = id
WHERE parent_id IS NULL AND thread_id IS NULL;

-- 2) Respuestas: heredan thread_id del padre (repetible por seguridad)
UPDATE comments c
SET thread_id = COALESCE(p.thread_id, p.id)
FROM comments p
WHERE c.parent_id = p.id
  AND c.thread_id IS NULL;

DROP TRIGGER IF EXISTS check_comment_depth_trigger ON comments;
DROP FUNCTION IF EXISTS check_comment_depth();


CREATE INDEX IF NOT EXISTS idx_comments_thread_id_created_at
ON comments(thread_id, created_at ASC);

-- =====================================================
-- COMMENT DISLIKES MIGRATION
-- =====================================================

-- =====================================================
-- COMMENT DISLIKES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS comment_dislikes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, comment_id)  -- One dislike per user per comment
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
-- Index for comment dislikes count aggregation
CREATE INDEX IF NOT EXISTS idx_comment_dislikes_comment_id ON comment_dislikes(comment_id);

-- Index for user's disliked comments
CREATE INDEX IF NOT EXISTS idx_comment_dislikes_user_id ON comment_dislikes(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
ALTER TABLE comment_dislikes ENABLE ROW LEVEL SECURITY;

-- Comment Dislikes: Anyone can view
CREATE POLICY "Comment dislikes are viewable by everyone"
  ON comment_dislikes FOR SELECT
  USING (true);

-- Comment Dislikes: Authenticated users can create
CREATE POLICY "Authenticated users can dislike comments"
  ON comment_dislikes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Comment Dislikes: Users can delete their own dislikes
CREATE POLICY "Users can remove dislikes"
  ON comment_dislikes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);