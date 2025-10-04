import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult, Statistics } from "@/sanity.types";
import { CallBackDialog } from "@/components/shared/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { StatInfoList2 } from "@/components/shared/info-list";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
    NonNullable<SplitRow["splitColumns"]>[number],
    { _type: "split-content" }
>;

interface SplitContentProps extends SplitContent {
    noGap?: boolean;
    statistics: Statistics | null;
    benefits?: any;
}

export default function SplitContent({
    sticky,
    padding,
    noGap,
    tagLine,
    title,
    body,
    statistics,
    benefits,
    infoList,
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
                    {tagLine && <TagLine title={tagLine} element="span" className='leading-none' />}
                    {title &&
                        createElement(
                            "h2",
                            {
                                className: cn("text-3xl md:text-5xl my-2 font-semibold leading-none"),
                            },
                            title
                        )}
                </header>

                <article>
                    {body && <PortableTextRenderer value={body} />}
                </article>

                {Array.isArray(benefits) && benefits.length > 0 && (
                    <div className="flex flex-col gap-8">
                        <div className={cn(
                            "grid md:grid-cols-2 gap-4",
                        )}>
                            {benefits?.map((item, index) => {
                                return (
                                    <Card key={index} className="hover:shadow-2xl">
                                        <CardContent className="flex flex-col gap-4 pt-6">
                                            <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                                                <i className={cn("text-3xl text-primary", item?.icon)}></i>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-xl font-semibold leading-none font-sans">
                                                    {item?.title}
                                                </h3>
                                                {item?.description && <p className="text-sm md:text-base font-light text-foreground/75">{item.description}</p>}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                )}

                {infoList?.list && infoList?.list?.length > 0 && (
                    <div className="flex flex-col gap-8">
                        <h3 className="font-bold leading-none">Преимущества свадебной цветочной подписки</h3>
                        <div className={cn(
                            "grid md:grid-cols-2 gap-2",
                        )}>
                            {infoList?.list?.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-4">
                                        <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                                            <i className={cn("text-3xl text-primary", item?.icon)}></i>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-xl font-semibold leading-none font-sans">
                                                {item?.title}
                                            </h4>
                                            {item?.body && <PortableTextRenderer value={item.body} />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {Array.isArray(statistics?.items) && statistics.items.length > 0 && (
                    <StatInfoList2 items={statistics?.items} _type="statistics"/>
                )}

                {(footerBody || link?.href) && (
                    <footer className="flex flex-col">
                        {footerBody && (
                            <Card className='px-4 pt-4'>{footerBody && <PortableTextRenderer value={footerBody} />}</Card>
                        )}

                        {link?.href && (
                            <div className="flex flex-col self-stretch md:self-start mt-8">
                                <CallBackDialog title={link.title} href={link.href}
                                    buttonVariant={stegaClean(link.buttonVariant)} target={link.target} />
                            </div>
                        )}
                    </footer>)}

            </div>
        </div>
    );
}
