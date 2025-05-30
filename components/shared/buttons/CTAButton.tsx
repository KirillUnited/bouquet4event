import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import Register from "@/components/blocks/forms/register";
import { ButtonVariant } from "@/sanity.types";

type CTAButtonProps = {
    title?: string;
    href: string;
    buttonVariant?: ButtonVariant;
    target?: boolean;
    className?: string;
};

export function CTAButton({ title, href, buttonVariant = "default", target, className }: CTAButtonProps) {
    const ButtonContent = (
        <Button
            variant={buttonVariant}
            asChild
            size="lg"
            className={`w-full md:w-auto group ${className || ''}`}
        >
            <Link
                href={href}
                target={target ? "_blank" : undefined}
                rel={target ? "noopener" : undefined}
            >
                {title}
                {target && (
                    <ArrowUpRightIcon
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={16}
                    />
                )}
            </Link>
        </Button>
    );

    if (buttonVariant === "default") {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    {ButtonContent}
                </DialogTrigger>
                <DialogContent className="w-full max-w-full sm:max-w-5xl overflow-y-auto max-h-[100svh] py-8 rounded-none sm:rounded-lg">
                    <Register />
                </DialogContent>
            </Dialog>
        );
    }

    return ButtonContent;
}