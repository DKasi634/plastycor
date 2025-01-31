// components/YouTubePlayer.tsx
import { SectionContainer } from '@/styles/globals.styles';
import YouTube from 'react-youtube';

type YouTubePlayerProps = {
    videoId: string;
    className?: string;
};

export const YouTubePlayer = ({ videoId, className = "" }: YouTubePlayerProps) => {
    const opts = {
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    return (
        <section className="flex flex-col my-4">
            <SectionContainer>
                <div className={`aspect-video overflow-hidden rounded-sm pb-4 ${className}`}>
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        className="h-full w-full"
                        iframeClassName="h-full w-full"
                    />
                </div>
            </SectionContainer>
        </section>
    );
};