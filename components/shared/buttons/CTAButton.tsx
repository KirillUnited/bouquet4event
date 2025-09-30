import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRightIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import Register from "@/components/blocks/forms/register";
import { ButtonVariant } from "@/sanity.types";

export type CTAButtonProps = {
    title?: string;
    href: string;
    buttonVariant?: ButtonVariant;
    target?: boolean;
    className?: string;
    customGoal?: string;
};

export function CTAButton({ title="Открыть счёт", href='#', buttonVariant = "default", target, className, customGoal='' }: CTAButtonProps) {
    const ButtonContent = (
        <Button
            variant={buttonVariant}
            asChild
            size="lg"
            className={`w-full md:w-auto md:min-w-40 group ${className || ''}`}
        >
            <Link
                href={href}
                target={target ? "_blank" : undefined}
                rel={target ? "noopener" : undefined}
            >
                {buttonVariant === "default" && (
                    <UserPlusIcon
                        className="group-hover:scale-125 transition-transform"
                        size={16}
                    />
                )}
                {title}
                {target && (
                    <ArrowUpRightIcon
                        className="group-hover:translate-x-1 transition-transform"
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
                <DialogTitle className="hidden">{title}</DialogTitle>
                <DialogContent className="w-full max-w-full sm:max-w-5xl overflow-y-auto max-h-[100svh] py-8 px-0 md:px-4 rounded-none sm:rounded-lg">
                    <Register
                        _key='register'
                        _type='form-register'
                        padding={null}
                        colorVariant={null}
                        stackAlign={null}
                        title={null}
                        description={null}
                        buttonText={null}
                        successMessage={null}
                        privacyPolicyText={null}
                        goal={null}
                        customGoal={customGoal}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return ButtonContent;
}