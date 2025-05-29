import Link from "next/link";
import { Logo, LogoMobile } from "@/components/ui/logo";
import MobileNav from "@/components/layout/header/mobile-nav";
import DesktopNav from "@/components/layout/header/desktop-nav";
import { ModeToggle } from "@/components/ui/menu-toggle";
import { NAV_ITEMS } from "@/config";
import { cn } from "@/lib/utils";
import { SocialsList } from "@/components/shared/socials";

export default function Header() {
  return (
    <header className={cn(
      "sticky top-0 w-full border-border/40 bg-background/70 backdrop-blur-lg z-50"
    )}>
      <div className="container flex items-center justify-between min-h-14 py-2">
        <Link href="/" aria-label="Home page" className="flex items-center">
          <Logo className="hidden xl:block w-40" />
          <LogoMobile className="xl:hidden w-16" />
        </Link>
        <div className="hidden xl:flex self-center">
          <DesktopNav navItems={NAV_ITEMS} />
        </div>
        <div className="flex items-center">
          <SocialsList className="hidden xl:flex mr-4" />
          <ModeToggle />
          <div className="xl:hidden">
            <MobileNav navItems={NAV_ITEMS} />
          </div>
        </div>
      </div>
    </header>
  );
}
