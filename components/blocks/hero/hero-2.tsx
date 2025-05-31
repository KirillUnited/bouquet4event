import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import Image from "next/image";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-2" }
>;

export default function Hero2({ tagLine, title, body, links }: Hero2Props) {
  return (
    <section className="text-[#f9fafb] py-20 lg:pt-40 text-center relative">
      <div className="absolute inset-0 z-0">
          <Image
            className="animate-fade-up [animation-delay:500ms] opacity-0 h-full w-full object-cover"
            src={'https://readdy.ai/api/search-image?query=modern%20minimalist%20wedding%20scene%20with%20elegant%20floral%20arrangements%2C%20deep%20teal%20and%20coral%20accents%2C%20architectural%20elements%2C%20clean%20lines%2C%20soft%20natural%20lighting%2C%20high%20end%20professional%20photography%2C%20luxury%20wedding%20atmosphere&width=1440&height=800&seq=7&orientation=landscape"'}
            alt={'Bouquet Photography'}
            width={1200}
            height={800}
            priority
          />
          <div className="absolute inset-0 bg-[#030712]/70"></div>
        </div>
      <div className="container"> 
        {tagLine && (
          <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
            <span className="text-base font-semibold">{tagLine}</span>
          </h1>
        )}
        {title && (
          <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
            {title}
          </h2>
        )}
        {body && (
          <div className="text-lg mt-6 max-w-2xl mx-auto animate-fade-up [animation-delay:300ms] opacity-0">
            <PortableTextRenderer value={body} />
          </div>
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
