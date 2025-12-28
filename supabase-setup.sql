-- ============================================
-- SUPABASE DATABASE SETUP
-- ============================================
-- Execute este script en el SQL Editor de Supabase
-- (Dashboard > SQL Editor > New Query)

-- ============================================
-- 1. TABLA: user_profiles
-- ============================================
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Función para auto-crear perfil al registrarse
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- 2. TABLA: user_favorites
-- ============================================
CREATE TABLE public.user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  anime_id TEXT NOT NULL,
  anime_title TEXT NOT NULL,
  anime_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, anime_id)
);

-- Índices para mejor rendimiento
CREATE INDEX user_favorites_user_id_idx ON public.user_favorites(user_id);
CREATE INDEX user_favorites_anime_id_idx ON public.user_favorites(anime_id);

-- Habilitar Row Level Security
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view their own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 3. TABLA: watch_progress
-- ============================================
CREATE TABLE public.watch_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  anime_id TEXT NOT NULL,
  episode_number INTEGER NOT NULL,
  episode_id TEXT NOT NULL,
  progress_seconds INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  completed BOOLEAN DEFAULT false,
  last_watched TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, anime_id, episode_id)
);

-- Índices para mejor rendimiento
CREATE INDEX watch_progress_user_id_idx ON public.watch_progress(user_id);
CREATE INDEX watch_progress_anime_id_idx ON public.watch_progress(anime_id);
CREATE INDEX watch_progress_last_watched_idx ON public.watch_progress(last_watched DESC);

-- Habilitar Row Level Security
ALTER TABLE public.watch_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can manage their own watch progress"
  ON public.watch_progress FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
-- Después de ejecutar este script:
-- 1. Configura OAuth en Authentication > Providers (Google y GitHub)
-- 2. Actualiza .env.local con tus credenciales de Supabase
-- 3. Configura las URLs de redirección en Authentication > URL Configuration
