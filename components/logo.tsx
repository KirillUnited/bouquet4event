import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <Image
    src="/images/logo.svg"
    alt="Logo"
    width={300}
    height={145}
    priority
    className={cn("w-full max-h-full", className)}
  />
);
export const LogoMobile: React.FC<LogoProps> = ({ className }) => (
  <Image
    src="/images/logo-mobile.svg"
    alt="Logo"
    width={64}
    height={64}
    priority
    className={cn("w-full max-h-full", className)}
  />
);