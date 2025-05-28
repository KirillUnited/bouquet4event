'use client';
import Link from "next/link";
import { Logo, LogoMobile } from "@/components/ui/logo";
import MobileNav from "@/components/layout/header/mobile-nav";
import DesktopNav from "@/components/layout/header/desktop-nav";
import { ModeToggle } from "@/components/ui/menu-toggle";
import { NAV_ITEMS } from "@/config";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [yValue, setYValue] = useState(0);
  const [toHide, setToHide] = useState(false);

  useEffect(() => {
    const showHeaderOnScrollUp = () => {
      if (yValue >= window.scrollY) {
        setToHide(false);
      } else {
        setToHide(true);
      }
      setYValue(window.scrollY);
    };

    window.addEventListener("scroll", showHeaderOnScrollUp);

    return () => {
      window.removeEventListener("scroll", showHeaderOnScrollUp);
    };
  }, [yValue]);

  return (
    <header className={cn("sticky top-0 w-full border-border/40 bg-background/70 backdrop-blur-lg z-50",
      "transition-all duration-300 ease-in-out translate-0",
      toHide && " -translate-y-full",
    )}>
      <div className="container flex items-center justify-between min-h-14 py-2">
        <Link href="/" aria-label="Home page" className="flex items-center">
          <Logo className="hidden xl:block w-40" />
          <LogoMobile className="xl:hidden w-16" />
        </Link>
        <div className="hidden xl:flex self-center">
          <DesktopNav navItems={NAV_ITEMS} />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden xl:block">
            <Button
              asChild
              size="sm"
              >
              <Link href="#register">
                Регистрация
              </Link>
            </Button>
          </div>
          <div className="flex items-center">
            <ModeToggle />
            <div className="xl:hidden">
              <MobileNav navItems={NAV_ITEMS} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
