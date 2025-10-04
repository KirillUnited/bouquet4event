import { NavigationMenuItem } from "@/types";

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
