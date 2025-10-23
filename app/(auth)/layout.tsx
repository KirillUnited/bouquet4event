import Footer from "@/components/layout/footer";
import SectionContainer from "@/components/layout/section-container";
import { Card } from "@/components/ui/card";
import { Logo, LogoMobile } from "@/components/ui/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <div className="container flex items-center justify-between min-h-14 py-2">
                    <Link href="/" aria-label="Home page" className="flex items-center">
                        <Logo className="hidden xl:block w-40" />
                        <LogoMobile className="xl:hidden w-16" />
                    </Link>
                </div>
            </header>
            <main className={`flex-1`}>
                <SectionContainer padding={{ _type: "section-padding", top: true, bottom: true }}>
                    <Card className="w-full max-w-md mx-auto p-4 lg:p-6 bg-card">{children}</Card>
                </SectionContainer>
            </main>
            <Footer />
        </div>
    );
}


