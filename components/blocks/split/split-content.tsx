import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-content" }
>;

interface SplitContentProps extends SplitContent {
  noGap?: boolean;
}

export default function SplitContent({
  sticky,
  padding,
  noGap,
  tagLine,
  title,
  body,
  statistics,
  link,
}: SplitContentProps) {
  return (
    <div
      className={cn(
        !sticky ? "flex flex-col justify-center" : undefined,
        padding?.top ? "pt-0 xl:pt-20" : undefined,
        padding?.bottom ? "pb-0 xl:pb-20" : undefined
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          sticky ? "lg:sticky lg:top-56" : undefined,
          noGap ? "px-10" : undefined
        )}
      >
        {tagLine && <TagLine title={tagLine} element="h2" />}
        {title &&
          createElement(
            tagLine ? "h3" : "h2",
            {
              className: cn("my-4 font-semibold leading-[1.2]"),
            },
            title
          )}
        {body && <PortableTextRenderer value={body} />}
        {Array.isArray(statistics) && statistics.length > 0 && (
          <div className="mt-8">
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {statistics.map(({ value, label }) => (
                <li key={label} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{value}</p>
                  <p className=" font-normal text-foreground/70">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        )
        }
        {link?.href && (
          <div className="flex flex-col self-stretch md:self-auto">
            <Button
              className="mt-2 w-full md:w-auto"
              variant={stegaClean(link?.buttonVariant)}
              size="lg"
              asChild
            >
              <Link
                href={link.href}
                target={link.target ? "_blank" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div >
  );
}
