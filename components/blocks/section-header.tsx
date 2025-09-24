import { cn } from "@/lib/utils";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";

import { PAGE_QUERYResult } from "@/sanity.types";
import TagLine from "@/components/ui/tag-line";

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "section-header" }
>;

export default function SectionHeader({
  sectionID,
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  description,
}: SectionHeaderProps) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding} sectionID={sectionID || undefined}>
      <div
        className={cn(
          align === "center" ? "max-w-[48rem] text-center mx-auto" : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div
          className={cn('flex flex-col',
              color === "primary" ? "text-background" : undefined,
              align === "center" ? "items-center" : undefined,
          )
        }
        >
          {tagLine && (
              <TagLine title={tagLine} element="span" className={cn('leading-none',
                align === "center" ? "self-center" : "self-start",
              )}/>
          )}
          <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>
        </div>
        <p className="text-pretty">{description}</p>
      </div>
    </SectionContainer>
  );
}
