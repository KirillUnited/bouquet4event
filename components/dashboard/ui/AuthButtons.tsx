"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNavItemIcon } from "@/lib/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AccountData } from "@/lib/api/account";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const ProfileIcon = getNavItemIcon("Профиль");
const LogoutIcon = getNavItemIcon("Выйти");
const LoginIcon = getNavItemIcon("Войти");
const CreateUserIcon = getNavItemIcon("Создать аккаунт");

export interface AuthButtonsProps {
  user: AccountData | null;
  className?: string;
}

export default function AuthButtons({ user, className }: AuthButtonsProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (e) {
      // Можно добавить обработку ошибки
    }
    logout();
    router.push("/");
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 rounded-lg p-2 hover:cursor-pointer ${className}`}
      >
        <Avatar>
          <AvatarImage
            src={`https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png`}
            alt={user.email}
          />
          <AvatarFallback className="text-xs">{`${user.name?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-start leading-none">
          <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">
            {user.name || user.email}
          </span>
          <span className="text-muted-foreground max-w-[20ch] truncate text-xs">
            {user.email}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem className="hover:bg-accent hover:cursor-pointer">
              <ProfileIcon className="w-5 h-5 text-muted-foreground" />
              <span>Профиль</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className="hover:bg-accent hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutIcon className="w-5 h-5 text-muted-foreground" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-center rounded-lg gap-4 p-2 lg:p-0",
        className,
      )}
    >
      <Button asChild variant="link">
        <div className="flex items-center gap-2">
          <LoginIcon className="w-5 h-5 text-muted-foreground" />
          <Link href="/login">Войти</Link>
        </div>
      </Button>
      <Button asChild>
        <div className="flex items-center gap-2">
          <CreateUserIcon className="w-5 h-5" />
          <Link href={`/signup`}>Создать аккаунт</Link>
        </div>
      </Button>
    </div>
  );
}
