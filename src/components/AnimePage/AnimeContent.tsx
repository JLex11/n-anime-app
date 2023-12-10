import styles from "@/components/AnimePage/Anime.module.css"
import { getAnime } from "@/services/getAnime"
import { AnimeHeader } from "./AnimeHeader"
import { Description } from "./Description"
import { Episodes } from "./Episodes"
import { Genres } from "./Genres"

export async function AnimeContent({
	animeId,
	limit,
}: { animeId: string; limit: string }) {
	const anime = await getAnime(animeId)
	if (!anime) return null

	return (
		<section className={styles.content}>
			<AnimeHeader title={anime.title} otherTitles={anime.otherTitles} />
			<Description description={anime.description} />
			<Genres genres={anime.genres} />
			<Episodes
				limit={limit}
				animeId={anime.animeId}
				fallbackImg={anime.images?.coverImage}
				animeTitle={anime.title}
			/>
		</section>
	)
}