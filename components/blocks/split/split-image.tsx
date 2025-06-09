import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitImage = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-image" }
>;

export default function SplitImage({ image, caption }: SplitImage) {
  return image && image.asset?._id ? (
    <div className="relative h-[25rem] sm:h-[30rem] md:h-[25rem] lg:h-full -order-1 lg:order-none">
      <Image
        src={urlFor(image).url()}
        alt={image.alt || ""}
        placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
        blurDataURL={image?.asset?.metadata?.lqip || ""}
        fill
        className="object-cover rounded-lg object-top"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        quality={100}
      />
      {caption && caption.title && (
        <div className="absolute -bottom-8 md:-left-8 bg-background p-4 rounded-lg shadow-xl">
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-award text-2xl md:text-4xl text-primary"></i>
            <div>
              <p className="text-sm md:text-base font-semibold">
                {caption.title}
              </p>
              <p className="text-xs md:text-sm text-foreground/70">{caption.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
