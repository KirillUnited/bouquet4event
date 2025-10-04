export type NavItem = {
  label: string;
  href: string;
  target: boolean;
};

export type NavigationMenuItem = {
  label: string;
  linkType: "page" | "external";
  href?: string;
  target?: boolean;
  description?: string;
  pageReference?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
};

export type NavigationMenu = {
  title: string;
  menuItems: NavigationMenuItem[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
