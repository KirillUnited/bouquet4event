"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import { LogoMobile } from "@/components/ui/logo";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { SocialsList } from "@/components/shared/socials";
import { SocialsListProps } from "@/components/shared/socials/SocialsList";
import {CTAButton} from "@/components/shared/buttons";
import AuthButtons from "@/components/dashboard/ui/AuthButtons";

export default function MobileNav({ navItems, socials, user }: { navItems: NavItem[], socials: SocialsListProps["items"], user: { email: string } | null }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <LogoMobile className="w-10 h-10" />
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container flex flex-col gap-6 items-center">
            <ul className="text-center space-y-3">
              {navItems.map((navItem) => (
                <li key={navItem.label}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={navItem.href}
                    target={navItem.target ? "_blank" : undefined}
                    rel={navItem.target ? "noopener noreferrer" : undefined}
                    className="hover:text-decoration-none hover:opacity-50 text-lg uppercase"
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* <CTAButton /> */}

            <SocialsList items={socials} />
            
            <AuthButtons user={user} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
