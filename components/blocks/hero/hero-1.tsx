import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormRegister from "@/components/blocks/forms/register";

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
        <section className="py-20 relative">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center z-10">
                        {tagLine && (
                            <p className="backdrop-blur-lg bg-background/30 leading-[0] animate-fade-up [animation-delay:100ms] opacity-0 border-1 border-primary rounded-md p-2">
                                <span className="text-base font-light">{tagLine}</span>
                            </p>
                        )}
                        {title && (
                            <h1 className="mt-6 animate-fade-up [animation-delay:200ms] opacity-0">
                                {title}
                            </h1>
                        )}
                        {body && (
                            <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0">
                                <PortableTextRenderer value={body} />
                            </div>
                        )}
                        {links && links.length > 0 && (
                            <div
                                className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
                                <Dialog>
                                    {links.map((link) => (
                                        <DialogTrigger
                                            asChild
                                            key={link.title}
                                        >
                                            <Button
                                                key={link.title}
                                                variant={stegaClean(link?.buttonVariant)}
                                                asChild
                                                size="lg"
                                            >
                                                <Link
                                                    href={link.href as string}
                                                    target={link.target ? "_blank" : undefined}
                                                    rel={link.target ? "noopener" : undefined}
                                                >
                                                    {link.title}
                                                </Link>
                                            </Button>
                                        </DialogTrigger>
                                    ))}
                                    <DialogContent className="w-full max-w-full sm:max-w-5xl overflow-y-auto max-h-[100svh] py-8 rounded-none sm:rounded-lg" >
                                        <FormRegister />
                                    </DialogContent>
                                </Dialog>
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
