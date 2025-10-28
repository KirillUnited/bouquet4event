import AuthButtons from '@/components/dashboard/ui/AuthButtons'
import { Logo, LogoMobile } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/menu-toggle'
import Link from 'next/link'
import React from 'react'
import MobileNav from './mobile-nav'
import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/site'
import { stegaClean } from 'next-sanity'
import { transformNavigationItems } from '@/lib/navigation'
import { NAV_ITEMS } from '@/config'

const AuthNav = async () => {
    const { data: siteSettings } = await sanityFetch({
        query: SITE_SETTINGS_QUERY,
    });

    // Use navigation from Sanity or fallback to config
    const mainNavigation = stegaClean(siteSettings?.mainNavigation);

    // Transform Sanity navigation items to match the expected format
    const navItems = mainNavigation?.menuItems
        ? transformNavigationItems(mainNavigation.menuItems)
        : NAV_ITEMS;
        
    return (
        <header>
            <div className="container flex items-center justify-between min-h-14 py-2">
                <Link href="/" aria-label="Home page" className="flex items-center">
                    <Logo className="hidden xl:block w-40" />
                    <LogoMobile className="xl:hidden w-16" />
                </Link>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <AuthButtons className="hidden xl:flex" />
                    <div className="xl:hidden">
                        <MobileNav
                            navItems={navItems}
                            socials={siteSettings?.siteContactInfo?.socialLinks}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AuthNav