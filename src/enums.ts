export enum ResponseType {
	JSON = 'json',
	TEXT = 'text',
	BUFFER = 'buffer',
}

export enum animeStatus {
	BROADCAST = '1',
	FINALIZED = '2',
	SOON = '3',
}

export enum APIRoutes {
	vercelBaseUrl = 'https://anime-scrapper-alpha.vercel.app/api',
	fl0BaseUrl = 'https://anime-scrapper-2rl4-dev.fl0.io/api',
	renderBaseUrl = 'https://anime-scrapper-3c3n.onrender.com/api',
	LatestEpisodes = '/episodes/latest',
	VideoStreaming = '/episodes/sources',
	LatestAnimes = '/animes/latest',
	BroadcastAnimes = '/animes/broadcast',
	RatingAnimes = '/animes/latest/rating',
	InfoAnime = '/animes',
	AnimeEpisodes = '/animes/:animeId/episodes',
	SearchAnimes = '/animes/search',
	RelatedAnimes = '/animes/:animeId/related',
}

export enum autoCompleteHotKeys {
	ENTER = 'enter',
	SPACE = 'space',
	TAB = 'tab',
	ARROW_DOWN = 'arrowdown',
	ARROW_UP = 'arrowup',
	CTRL_SPACE = 'ctrl+space',
	OUT = 'escape',
	LAUNCH = '/',
}
