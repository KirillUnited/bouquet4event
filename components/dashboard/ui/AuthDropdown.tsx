"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNavItemIcon } from "@/lib/navigation";
import { AuthButtonVariant } from "@/components/dashboard/AuthConstants";

const ProfileIcon = getNavItemIcon(AuthButtonVariant.LABEL);
const LogoutIcon = getNavItemIcon(AuthButtonVariant.LOGOUT);

interface User {
  avatar?: string | null;
  name?: string | null;
  email?: string | null;
}

interface AuthDropdownProps {
  user: User;
  onLogout: () => void | Promise<void>;
  className?: string;
}

export default function AuthDropdown({
  user,
  onLogout,
  className,
}: AuthDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          `flex items-center gap-2 rounded-lg p-2 hover:cursor-pointer border border-border xl:border-none`,
          className,
        )}
      >
        <Avatar>
          <AvatarImage
            src={
              user.avatar ||
              `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png`
            }
            alt={user.email || "User Avatar"}
          />
          <AvatarFallback className="text-xs">{`${user.name?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-start leading-none">
          <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
            {user.name || user.email}
          </span>
          {user.email && (
            <span className="text-muted-foreground max-w-[20ch] truncate text-xs">
              {user.email}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem className="hover:bg-accent hover:cursor-pointer">
              <ProfileIcon className="w-5 h-5 text-muted-foreground" />
              <span>{AuthButtonVariant.LABEL}</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className="hover:bg-accent hover:cursor-pointer"
            onClick={onLogout}
          >
            <LogoutIcon className="w-5 h-5 text-muted-foreground" />
            <span>{AuthButtonVariant.LOGOUT}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
