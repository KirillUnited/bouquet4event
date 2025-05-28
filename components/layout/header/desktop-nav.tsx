import Link from "next/link";
import { NavItem } from "@/types";
import { Button } from "../../ui/button";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  return (
    <ul className="hidden xl:flex items-center gap-7 text-primary">
      {navItems.map((navItem) => (
        <li key={navItem.label}>
          <Link
            key={navItem.label}
            href={navItem.href}
            target={navItem.target ? "_blank" : undefined}
            rel={navItem.target ? "noopener noreferrer" : undefined}
            className="transition-colors hover:text-primary/70 dark:hover:text-primary text-foreground/85 text-sm  font-semibold"
          >
            {navItem.label}
          </Link>
        </li>
      ))}
      <Button
        asChild>
        <Link href="#register">
          Регистрация
        </Link>
      </Button>
    </ul>
  );
}
