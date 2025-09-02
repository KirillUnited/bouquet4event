import type { Metadata } from "next";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { fontSans, fontSerif } from "@/config/fonts";
import JsonLd from "@/components/JsonLd";
import { getLocalBusinessJsonLd } from "@/lib/jsonLd";
import Script from "next/script";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Bouquet4Event",
    default: "Bouquet4Event",
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`,
        width: 64,
        height: 64,
      },
    ],
    siteName: "Bouquet4Event",
    locale: "ru-RU",
    type: "website",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getLocalBusinessJsonLd();
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Yandex.Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103963322', 'ym');

            ym(103963322, 'init', {
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                ecommerce:"dataLayer"
            });
          `}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none flex flex-col",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" richColors />
        <JsonLd data={jsonLd} />
        {/* Noscript fallback */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103963322"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
