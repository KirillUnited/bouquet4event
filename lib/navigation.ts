import {NavigationMenuItem} from "@/types";
import {
    Star,
    Workflow,
    Flower2,
    Info,
    Phone,
    LogIn,
    UserPlus,
    User,
    CircleHelp,
    type LucideIcon, LogOut,
} from "lucide-react";

/**
 * Transforms Sanity navigation menu items to the format expected by navigation components
 */
export function transformNavigationItems(items: NavigationMenuItem[]): Array<{
    label: string;
    href: string;
    target: boolean;
}> {
    return items.map((item) => {
        let href = "#";

        if (item.linkType === "page" && item.pageReference?.slug) {
            // For internal pages, construct the URL from the slug
            href = `/${item.pageReference.slug}`;
        } else if (item.linkType === "external" && item.href) {
            // For external links, use the provided href
            href = item.href;
        }

        return {
            label: getNavigationItemDisplayName(item),
            href,
            target: item.target || false,
        };
    });
}

/**
 * Gets the display name for a navigation item based on its type
 */
export function getNavigationItemDisplayName(item: NavigationMenuItem): string {
    if (item.linkType === "page" && item.pageReference?.title) {
        return item.pageReference.title;
    }
    return item.label;
}

/**
 * Supported navigation item labels.
 * Use these string literals for type-safe access and autocompletion.
 */
export type NavItemLabel =
    | "Преимущества"
    | "Как это работает"
    | "Наши букеты"
    | "О нас"
    | "Контакты"
    | "Войти"
    | "Создать аккаунт"
    | "Профиль"
    | "Выйти"

/**
 * A mapping of navigation item labels to their corresponding Lucide icons.
 * Each key represents a label, and each value is a Lucide icon component.
 */
const navItemIcons: Record<NavItemLabel, LucideIcon> = {
    "Преимущества": Star,
    "Как это работает": Workflow,
    "Наши букеты": Flower2,
    "О нас": Info,
    "Контакты": Phone,
    "Войти": LogIn,
    "Создать аккаунт": UserPlus,
    "Профиль": User,
    "Выйти": LogOut,
};

/**
 * Returns a Lucide icon component corresponding to a given navigation item label.
 * If the label is not found in the predefined list, a default icon (CircleHelp) is returned.
 *
 * @function getNavItemIcon
 * @param {string} label - The label of the navigation item (in Russian).
 * @returns {LucideIcon} A Lucide icon component representing the given label.
 *
 * @example
 * ```tsx
 * const Icon = getNavItemIcon("Наши букеты");
 * return <Icon className="w-5 h-5 text-muted-foreground" />;
 * ```
 */
export function getNavItemIcon(label: NavItemLabel): LucideIcon {
    return navItemIcons[label] || CircleHelp;
}
