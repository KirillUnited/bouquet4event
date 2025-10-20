"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/AuthContext";
import AuthDropdown from "@/components/dashboard/ui/AuthDropdown";
import AuthGuestButtons from "@/components/dashboard/ui/AuthGuestButtons";

export interface AuthButtonsProps {
  className?: string;
}

export default function AuthButtons({ className }: AuthButtonsProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return isAuthenticated && user ? (
    <AuthDropdown user={user} onLogout={handleLogout} className={className} />
  ) : (
    <AuthGuestButtons className={className} />
  );
}
