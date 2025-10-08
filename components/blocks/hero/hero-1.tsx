import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {Media, PAGE_QUERYResult, Statistics} from "@/sanity.types";
import React from "react";
import { CTAButton } from "@/components/shared/buttons";
import { StatInfoList } from "@/components/shared/info-list";
import { MediaRenderer } from "@/components/shared/media-renderer";

type Hero1 = Extract<
    NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
    { _type: "hero-1" }
>;

interface Hero1Props extends Hero1 {
    statistics: Statistics | null
    media: Media | null
}

export default function Hero1({
                                  tagLine,
                                  title,
                                  body,
                                  links,
                                  statistics,
                                  media
                              }: Hero1Props) {
    return (
        <section className="relative">
            <div className="container">
                <div className="">
                    <div className="max-w-4xl flex items-center py-20 sm:min-h-[80svh]">
                        <div
                            className="flex-1 flex flex-col justify-center md:items-start text-left z-10">
                            {tagLine && (
                                <span
                                    className="self-start backdrop-blur-lg bg-background/30 leading-none animate-fade-up [animation-delay:100ms] opacity-0 border-primary rounded-sm text-pretty text-foreground/70 text-center px-3 py-1 text-sm/6 ring-1 ring-primary/10 hover:ring-primary/20">
                                {tagLine}
                            </span>
                            )}
                            {title && (
                                <h1 className="mt-6 animate-fade-up [animation-delay:200ms] opacity-0 text-balance leading-none">
                                    {title}
                                </h1>
                            )}
                            <div className='flex-1'>
                                {body && (
                                    <article
                                        className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0 text-balance">
                                        <PortableTextRenderer value={body}/>
                                    </article>
                                )}
                                {links && links.length > 0 && (
                                    <div
                                        className="mt-10 flex flex-wrap gap-2 animate-fade-up [animation-delay:400ms] opacity-0 w-full">
                                        {links.map((link) => (
                                            <CTAButton
                                                key={link.title}
                                                title={link.title}
                                                href={link.href as string}
                                                buttonVariant={stegaClean(link?.buttonVariant)}
                                                target={link.target}
                                                customGoal="schet1"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {Array.isArray(statistics?.items) && statistics?.items?.length > 0 && (
                                <footer className='mt-10 hidden sm:block'>
                                    <StatInfoList items={statistics?.items} _type="statistics"/>
                                </footer>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 z-0">
                {media && (
                    <div className="h-full w-full">
                        <MediaRenderer 
                            media={media}
                            className="animate-fade-up [animation-delay:500ms] opacity-0 h-full w-full"
                            priority
                        />
                    </div>
                )}
                <div className="absolute inset-0 dark:bg-background/70 bg-background/35" />
            </div>
        </section>
    );
}
