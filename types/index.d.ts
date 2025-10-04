export type NavItem = {
  label: string;
  href: string;
  target: boolean;
};

export type NavigationMenuItem = {
  label: string;
  href: string;
  target: boolean;
  description?: string;
};

export type NavigationMenu = {
  title: string;
  menuItems: NavigationMenuItem[];
};

export type BreadcrumbLink = {
  label: string;
  href: string;
};
