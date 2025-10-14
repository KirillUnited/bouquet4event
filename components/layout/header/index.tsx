import Link from "next/link";
import { Logo, LogoMobile } from "@/components/ui/logo";
import MobileNav from "@/components/layout/header/mobile-nav";
import DesktopNav from "@/components/layout/header/desktop-nav";
import { ModeToggle } from "@/components/ui/menu-toggle";
import { NAV_ITEMS } from "@/config";
import { cn } from "@/lib/utils";
import { SocialsList } from "@/components/shared/socials";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site";
import { stegaClean } from "next-sanity";
import { transformNavigationItems } from "@/lib/navigation";
import {cookies} from "next/headers";
import {verifyJwt} from "@/lib/auth";
import AuthButtons from "@/components/dashboard/ui/AuthButtons";

export default async function Header() {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  // Use navigation from Sanity or fallback to config
  const mainNavigation = stegaClean(siteSettings?.mainNavigation);

  // Transform Sanity navigation items to match the expected format
  const navItems = mainNavigation?.menuItems
    ? transformNavigationItems(mainNavigation.menuItems)
    : NAV_ITEMS;
  // User authorization
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? await verifyJwt(token) : null;

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
          <DesktopNav navItems={navItems} />
        </div>
        <div className="flex items-center gap-4">
          <SocialsList className="hidden xl:flex" items={siteSettings?.siteContactInfo?.socialLinks} />
          <ModeToggle />
          <AuthButtons user={user} className="hidden xl:flex" />
          <div className="xl:hidden">
            <MobileNav navItems={navItems} socials={siteSettings?.siteContactInfo?.socialLinks} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
