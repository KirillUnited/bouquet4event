import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { Media as MediaType } from "@/sanity/schemas/blocks/media/media";
import { client } from "@/sanity/lib/client";

// Helper function to get video URL from Sanity
const getVideoUrl = (ref: string): string => {
  const projectId = client.config().projectId;
  const dataset = client.config().dataset;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${ref}`;
};

interface MediaRendererProps {
  media: MediaType;
  className?: string;
  imageClassName?: string;
  videoClassName?: string;
  priority?: boolean;
}

export function MediaRenderer({
  media,
  className = "",
  imageClassName = "",
  videoClassName = "",
  priority = false,
}: MediaRendererProps) {
  if (!media) return null;

  console.log(media)

  if (media.mediaType === 'image' && media.image?.asset?._ref) {
    return (
      <div className={cn("relative w-full h-full", className)}>
        <Image
          className={cn("w-full h-full object-cover", imageClassName)}
          src={urlFor(media.image).url()}
          alt={media.image.alt || ""}
          width={media.image.asset?.metadata?.dimensions?.width || 1920}
          height={media.image.asset?.metadata?.dimensions?.height || 1080}
          placeholder={media.image.asset?.metadata?.lqip ? "blur" : undefined}
          blurDataURL={media.image.asset?.metadata?.lqip || ""}
          priority={priority}
          quality={100}
        />
      </div>
    );
  }

  if (media.mediaType === 'video' && media.video?.asset?._ref) {
    const videoUrl = getVideoUrl(media.video.asset._ref);
    const posterUrl = media.video.poster?.asset?._ref 
      ? urlFor(media.video.poster).url() 
      : undefined;

    return (
      <div className={cn("relative w-full h-full overflow-hidden", className)}>
        <video
          className={cn("w-full h-full object-cover", videoClassName)}
          autoPlay={media.video.autoplay}
          loop={media.video.loop}
          muted={media.video.muted}
          playsInline
          controls={media.video.controls}
          poster={posterUrl}
        >
          <source 
            src={videoUrl} 
            type={media.video.asset?.mimeType || 'video/mp4'} 
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
}
