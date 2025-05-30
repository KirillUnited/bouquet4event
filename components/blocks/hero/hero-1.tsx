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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
                        {tagLine && (
                            <p className="backdrop-blur-lg bg-background/30 leading-none animate-fade-up [animation-delay:100ms] opacity-0 border-primary rounded-sm text-pretty text-foreground/70 text-center px-3 py-1 text-sm/6 ring-1 ring-primary/10 hover:ring-primary/20">
                                {tagLine}
                            </p>
                        )}
                        {title && (
                            <h1 className="mt-6 animate-fade-up [animation-delay:200ms] opacity-0 text-pretty">
                                {title}
                            </h1>
                        )}
                        {body && (
                            <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0 text-pretty">
                                <PortableTextRenderer value={body} />
                            </div>
                        )}
                        {links && links.length > 0 && (
                            <div
                                className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
                                {links.map((link) => (
                                    <CTAButton
                                        key={link.title}
                                        title={link.title}
                                        href={link.href as string}
                                        buttonVariant={stegaClean(link?.buttonVariant)}
                                        target={link.target}
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
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-transparent"></div>
            </div>
        </section>
    );
}
