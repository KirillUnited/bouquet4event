import Header from "@/components/layout/header";
import {Card} from "@/components/ui/card";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <div className={`container flex-1 flex items-center justify-center`}>
                <Card className="w-full max-w-md p-6 bg-card">{children}</Card>
            </div>
        </div>
    );
}


