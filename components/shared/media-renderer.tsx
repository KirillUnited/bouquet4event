import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {cn, getSanityFileUrl} from "@/lib/utils";
import {Media} from "@/sanity.types";

export interface MediaRendererProps {
  media: Media;
  className?: string;
  imageClassName?: string;
  videoClassName?: string;
  priority?: boolean;
}

export async function MediaRenderer({
  media,
  className = "",
  imageClassName = "",
  videoClassName = "",
  priority = false,
}: MediaRendererProps) {
  if (!media) return null;

  if (media.mediaType === 'image' && media.image?.asset?._ref) {
    return (
      <div className={cn("relative w-full h-full", className)}>
        <Image
          className={cn("w-full h-full object-cover", imageClassName)}
          src={urlFor(media.image).width(1920).height(1080).format("webp").crop("center").url()}
          alt={media.image.alt || ""}
          width={1920}
          height={1080}
          placeholder={"blur"}
          blurDataURL={urlFor(media.image).width(1920).height(1080).format("webp").crop("center").url() || ""}
          priority={priority}
          quality={100}
        />
      </div>
    );
  }

  if (media.mediaType === 'video' && media.video?.asset?._ref) {
    const videoUrl= await getSanityFileUrl(media.video?.asset?._ref || "");
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
            src={videoUrl || ""} 
            type={'video/mp4'} 
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
}
