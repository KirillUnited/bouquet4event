import { cn } from "@/lib/utils";
import { SectionPadding, ColorVariant } from "@/sanity.types";

interface SectionContainerProps {
  color?: ColorVariant | null;
  padding?: SectionPadding | null;
  children: React.ReactNode;
  className?: string;
  sectionID?: string;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  className,
  sectionID,
}: SectionContainerProps) {
  return (
    <section
      id={sectionID ? `${sectionID}` : undefined}
      className={cn(
        `bg-${color} relative`,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
        className
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}
