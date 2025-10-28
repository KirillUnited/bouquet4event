import Footer from "@/components/layout/footer";
import AuthNav from "@/components/layout/header/auth-nav";
import SectionContainer from "@/components/layout/section-container";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNav />
      <main className="flex-1">
        <SectionContainer
          className={"bg-primary/5 dark:bg-black/80"}
          padding={{ _type: "section-padding", top: true, bottom: true }}
        >
          {children}
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
