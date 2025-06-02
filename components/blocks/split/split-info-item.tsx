import PortableTextRenderer from "@/components/portable-text-renderer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitInfoList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-info-list" }
>;
type SplitInfoItem = NonNullable<SplitInfoList["list"]>[number];

export default function SplitCardsItem({
  image,
  icon,
  title,
  body,
  tags,
}: SplitInfoItem) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 transition-colors duration-1000 ease-in-out",
      )}
    >
      <div className="flex gap-4">
        {image && image.asset?._id ? (
          <div className="shrink-0 w-10 h-10 flex items-center justify-center">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={
                image?.asset?.metadata?.lqip &&
                  image?.asset?.mimeType !== "image/svg+xml"
                  ? "blur"
                  : undefined
              }
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              width={image.asset?.metadata?.dimensions?.width || 40}
              height={image?.asset?.metadata?.dimensions?.height || 40}
            />
          </div>
        ) : icon && (
          <div className={cn(
            "shrink-0 w-10 h-10 flex items-center justify-center",
          )}>
            <i className={cn(
              "fa-solid text-3xl text-primary",
              icon
            )}></i>
          </div>
        )
        }
        <div className="flex flex-col gap-2">
          {title && (
            <div className="text-xl font-semibold leading-[1.1]">{title}</div>
          )}
          {body && <PortableTextRenderer value={body} />}
        </div>
      </div>

      {
        tags && (
          <div
            className={cn(
              "flex flex-wrap gap-3 mt-4 transition-colors duration-1000 ease-in-out",
            )}
          >
            {tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  "transition-colors duration-1000 ease-in-out",
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )
      }
    </div>
  );
}
