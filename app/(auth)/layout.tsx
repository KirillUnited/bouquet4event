import Header from "@/components/layout/header";
import SectionContainer from "@/components/layout/section-container";
import { Card } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className={`flex-1`}>
                <SectionContainer padding={{ _type: "section-padding", top: true, bottom: true }}>
                    <Card className="w-full max-w-md mx-auto p-4 lg:p-6 bg-card">{children}</Card>
                </SectionContainer>
            </main>
        </div>
    );
}


