import Header from "@/components/layout/header";
import SectionContainer from "@/components/layout/section-container";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SectionContainer
          className={"bg-primary/5 dark:bg-black/80"}
          padding={{ _type: "section-padding", top: true, bottom: true }}
        >
          {children}
        </SectionContainer>
      </main>
    </div>
  );
}
