import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-2" }
>;

export default function Hero2({ tagLine, title, body, links, image }: Hero2Props) {
  return (
    <section className="text-[#f9fafb] py-20 text-center relative">
      {image && image.asset?._id && (
        <div className="absolute inset-0 z-0">
          <Image
            className="animate-fade-up [animation-delay:500ms] opacity-0 h-full w-full object-cover"
            src={urlFor(image).url()}
            alt={image.alt || ""}
            width={image.asset?.metadata?.dimensions?.width || 1200}
            height={image.asset?.metadata?.dimensions?.height || 800}
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            priority
          />
          <div className="absolute inset-0 bg-[#030712]/70"></div>
        </div>
      )}
      <div className="container">
        {tagLine && (
          <span className="backdrop-blur-lg bg-background/30 leading-none animate-fade-up [animation-delay:100ms] opacity-0 border-primary rounded-sm text-pretty text-foreground/70 text-center px-3 py-1 text-sm/6 ring-1 ring-primary/10 hover:ring-primary/20">
            🌸 {tagLine}
          </span>
        )}
        {title && (
          <h1 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
            {title}
          </h1>
        )}
        {body && (
          <article className="text-lg mt-6 max-w-2xl mx-auto animate-fade-up [animation-delay:300ms] opacity-0">
            <PortableTextRenderer value={body} />
          </article>
        )}
        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up [animation-delay:400ms] opacity-0">
            {links.map((link) => (
              <Button
                key={link.title}
                variant={stegaClean(link?.buttonVariant)}
                asChild
              >
                <Link
                  href={link.href as string}
                  target={link.target ? "_blank" : undefined}
                  rel={link.target ? "noopener" : undefined}
                >
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
