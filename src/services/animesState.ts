import type { Anime } from '@/types'

interface CachedAnime {
	data: Anime
	timestamp: number
}

const CACHE_DURATION = 1000 * 60 * 60 * 12 // 12 horas
const store = new Map<Anime['animeId'], CachedAnime>()

let lastCleanupTime = 0
const CLEANUP_INTERVAL = 1000 * 60 * 5 // Limpiar cada 5 minutos como máximo
let pendingCleanup = false // Bandera para limpieza diferida

// Funciones auxiliares privadas
function isExpired(timestamp: number): boolean {
	return Date.now() - timestamp > CACHE_DURATION
}

function isValidAnime(anime: Anime): boolean {
	return Boolean(anime?.animeId && anime.title)
}

function shouldCleanup(): boolean {
	return Date.now() - lastCleanupTime > CLEANUP_INTERVAL
}

// Limpieza diferida para mejor rendimiento
function scheduledCleanup(): void {
	if (pendingCleanup) return // Ya hay una limpieza programada

	pendingCleanup = true
	setTimeout(() => {
		cleanExpired()
		pendingCleanup = false
	}, 0) // Ejecutar en el próximo ciclo de eventos
}

function cleanExpired(): void {
	// Evitar limpiezas frecuentes
	if (!shouldCleanup()) return

	lastCleanupTime = Date.now()

	let expiredCount = 0
	const now = Date.now()
	const expiredThreshold = now - CACHE_DURATION

	for (const [id, cached] of store.entries()) {
		if (cached.timestamp < expiredThreshold) {
			store.delete(id)
			expiredCount++
		}
	}

	return // La función ahora es mucho más eficiente
}

// Función para forzar limpieza explícitamente
export function forceCleanup(): number {
	const sizeBefore = store.size
	cleanExpired()
	lastCleanupTime = Date.now() // Actualizar el tiempo aún si no hizo falta limpiar
	return sizeBefore - store.size // Retorna cantidad de elementos eliminados
}

// Funciones públicas exportadas
export function addAnimeToIndex(anime: Anime): Anime {
	if (!isValidAnime(anime)) return anime

	store.set(anime.animeId, {
		data: anime,
		timestamp: Date.now(),
	})

	// Programar limpieza diferida si es momento de limpiar
	if (shouldCleanup()) scheduledCleanup()

	return anime
}

export function addAnimesToIndex(animes: Anime[]): Anime[] {
	const timestamp = Date.now()
	let validCount = 0

	// Optimización: pre-asignar capacidad del array si es posible
	const validAnimes = new Array<Anime>(animes.length)
	let validIndex = 0

	for (const anime of animes) {
		if (isValidAnime(anime)) {
			store.set(anime.animeId, {
				data: anime,
				timestamp,
			})
			validAnimes[validIndex++] = anime
			validCount++
		}
	}

	// Solo limpiar si se añaden muchos elementos, pero de forma diferida
	if (validCount > 10 && shouldCleanup()) {
		scheduledCleanup()
	}

	return animes // Mantener compatibilidad de la API
}

export function getIndexedAnime(animeId: Anime['animeId']): Anime | undefined {
	const cached = store.get(animeId)
	if (!cached) return undefined

	if (isExpired(cached.timestamp)) {
		store.delete(animeId)
		return undefined
	}

	return cached.data
}

export function removeIndexedAnime(animeId: Anime['animeId']): void {
	store.delete(animeId)
}

export function getAllIndexedAnimes(): Anime[] {
	// Programar limpieza diferida si es momento de limpiar
	if (shouldCleanup()) scheduledCleanup()

	// Optimizar para evitar iteraciones innecesarias
	const result: Anime[] = []
	const now = Date.now()
	const validThreshold = now - CACHE_DURATION

	// Pre-asignar capacidad aproximada
	result.length = store.size
	let validIndex = 0

	for (const cached of store.values()) {
		if (cached.timestamp >= validThreshold) {
			result[validIndex++] = cached.data
		}
	}

	// Ajustar longitud real del array
	if (validIndex < result.length) {
		result.length = validIndex
	}

	return result
}

export function getStoreSize(): number {
	// Diferir limpieza para no impactar rendimiento
	if (shouldCleanup()) {
		scheduledCleanup()
	}
	return store.size
}
