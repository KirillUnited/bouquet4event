"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getNavItemIcon } from "@/lib/navigation";
import { AuthButtonVariant } from "@/components/dashboard/AuthConstants";

const LoginIcon = getNavItemIcon(AuthButtonVariant.LOGIN);
const CreateUserIcon = getNavItemIcon(AuthButtonVariant.SIGNUP);

export interface AuthGuestButtonsProps {
  className?: string;
}

export default function AuthGuestButtons({ className }: AuthGuestButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col xl:flex-row xl:items-center rounded-lg gap-4 p-2 xl:p-0",
        className,
      )}
    >
      <Button asChild variant="outline">
        <div className="flex items-center gap-2">
          <LoginIcon className="w-5 h-5 text-muted-foreground" />
          <Link href="/login">{AuthButtonVariant.LOGIN}</Link>
        </div>
      </Button>
      <Button asChild>
        <div className="flex items-center gap-2">
          <CreateUserIcon className="w-5 h-5" />
          <Link href={`/signup`}>{AuthButtonVariant.SIGNUP}</Link>
        </div>
      </Button>
    </div>
  );
}
