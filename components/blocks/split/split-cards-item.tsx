import PortableTextRenderer from "@/components/portable-text-renderer";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult, ColorVariant } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;
type SplitCardItem = NonNullable<NonNullable<SplitCardsList["list"]>[number]>;

interface SplitCardsItemProps extends SplitCardItem {
  color?: ColorVariant;
}

export default function SplitCardsItem({
  color,
  icon,
  image,
  tagLine,
  title,
  body,
}: SplitCardsItemProps) {
  const hasImage = image && image.asset?._id;

  return (
    <Card
      className={cn("relative overflow-hidden hover:shadow-lg transition-shadow",
        hasImage && "after:absolute after:inset-0 after:bg-slate-900/75 text-white",
      )}
    >
      <CardContent className="relative pt-6 z-10 flex flex-col items-center text-center">
        {icon && (
          <div className={cn(
            "w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6",
          )}>
            <i className={cn(
              "text-2xl text-white",
              icon
            )}></i>
          </div>
        )}

        {tagLine && (
          <div
            className={cn(
              "font-bold text-2xl lg:text-3xl transition-colors duration-1000 ease-in-out",
              color === "primary" ? "text-background" : undefined
            )}
          >
            {tagLine}
          </div>
        )}

        {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}
        {body && (
          <div
            className={cn(
              "text-foreground/90 text-balance",
              hasImage && "text-white/80",
            )}
          >
            <PortableTextRenderer value={body} />
          </div>
        )}
      </CardContent>

      {hasImage && (
        <div className="absolute inset-0 z-0">
          <Image
            className="object-cover w-full h-full"
            src={urlFor(image).url()}
            alt={image.alt || ""}
            placeholder={
              image?.asset?.metadata?.lqip &&
                image?.asset?.mimeType !== "image/svg+xml"
                ? "blur"
                : undefined
            }
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            width={image.asset?.metadata?.dimensions?.width || 320}
            height={image?.asset?.metadata?.dimensions?.height || 320}
          />
        </div>
      )}
    </Card>
  )
}
