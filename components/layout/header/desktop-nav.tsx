import Link from "next/link";
import {NavItem} from "@/types";
import {getNavItemIcon, NavItemLabel} from "@/lib/navigation";

export default function DesktopNav({navItems}: { navItems: NavItem[] }) {
    return (
        <ul className="hidden xl:flex items-center gap-7 text-primary">
            {navItems.map((navItem) => {
                const Icon = getNavItemIcon(navItem.label as NavItemLabel);

                return (
                    <li key={navItem.label}>
                        <Link
                            key={navItem.label}
                            href={navItem.href}
                            target={navItem.target ? "_blank" : undefined}
                            rel={navItem.target ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2 transition-colors hover:text-primary/70 dark:hover:text-primary text-foreground/85 text-sm font-semibold"
                        >
                            <Icon size={16} className="text-primary" />
                            {navItem.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}
