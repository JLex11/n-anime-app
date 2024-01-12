import { EpisodeVideo } from '@/types'
import { Iframe } from './Iframe'
import { VideoSectionWrapper } from './VideoSectionWrapper'

export type IframeData = {
	SUB: EpisodeVideo[]
	DUB?: EpisodeVideo[]
}

interface Props {
	iframesData?: IframeData
	title?: string
}

export function VideoSection({ iframesData, title }: Props) {
	if (!iframesData) return null

	return (
		<VideoSectionWrapper iframesData={iframesData} title={title}>
			<Iframe IframeData={iframesData.SUB?.[0]} />
		</VideoSectionWrapper>
	)
}
