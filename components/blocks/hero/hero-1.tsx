import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import React from "react";
import { CTAButton } from "@/components/shared/buttons";

type Hero1Props = Extract<
    NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
    { _type: "hero-1" }
>;

export default function Hero1({
    tagLine,
    title,
    body,
    image,
    links,
}: Hero1Props) {
    return (
        <section className="relative">
            <div className="container py-20 min-h-[80svh]">
                <div className="max-w-4xl grid h-full grid-cols-1 gap-10 items-center">
                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
                        {tagLine && (
                            <span className="backdrop-blur-lg bg-background/30 leading-none animate-fade-up [animation-delay:100ms] opacity-0 border-primary rounded-sm text-pretty text-foreground/70 text-center px-3 py-1 text-sm/6 ring-1 ring-primary/10 hover:ring-primary/20">
                                {tagLine}
                            </span>
                        )}
                        {title && (
                            <h1 className="mt-6 animate-fade-up [animation-delay:200ms] opacity-0 text-balance leading-none">
                                {title}
                            </h1>
                        )}
                        {body && (
                            <article className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0 text-balance">
                                <PortableTextRenderer value={body} />
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
                </div>
            </div>
            <div className="absolute inset-0 z-0">
                {image && image.asset?._id && (
                    <Image
                        className="animate-fade-up [animation-delay:500ms] opacity-0 h-full w-full object-cover"
                        src={urlFor(image).url()}
                        alt={image.alt || ""}
                        width={image.asset?.metadata?.dimensions?.width || 800}
                        height={image.asset?.metadata?.dimensions?.height || 800}
                        placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                        blurDataURL={image?.asset?.metadata?.lqip || ""}
                        quality={100}
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-background/70"></div>
            </div>
        </section>
    );
}
