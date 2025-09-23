import {cn} from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TagLine from "@/components/ui/tag-line";
import {createElement} from "react";
import {stegaClean} from "next-sanity";
import {PAGE_QUERYResult} from "@/sanity.types";
import {CallBackDialog} from "@/components/shared/dialog";
import {Card} from "@/components/ui/card";

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
                                         footerBody,
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
                    "flex flex-col gap-6",
                    sticky ? "lg:sticky lg:top-56" : undefined,
                    noGap ? "px-10" : undefined
                )}
            >
                <header>
                    {tagLine && <TagLine title={tagLine} element="span" className='leading-none'/>}
                    {title &&
                        createElement(
                            "h2",
                            {
                                className: cn("my-2 font-semibold leading-none"),
                            },
                            title
                        )}
                </header>

                <article>
                    {body && <PortableTextRenderer value={body}/>}
                </article>

                {Array.isArray(statistics) && statistics.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {statistics.map(({value, label}) => (
                            <li key={label} className="text-center">
                                <p className="text-3xl font-bold text-primary mb-2">{value}</p>
                                <p className=" font-normal text-foreground/70">{label}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <footer className="flex flex-col">
                    <Card className='px-4 pt-4'>{footerBody && <PortableTextRenderer value={footerBody}/>}</Card>

                    {link?.href && (
                        <div className="flex flex-col self-stretch md:self-start mt-8">
                            <CallBackDialog title={link.title} href={link.href}
                                            buttonVariant={stegaClean(link.buttonVariant)} target={link.target}/>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
}
