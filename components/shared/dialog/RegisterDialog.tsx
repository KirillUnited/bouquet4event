import Register from '@/components/blocks/forms/register'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ButtonVariant } from '@/sanity.types'
import { stegaClean } from 'next-sanity'
import React from 'react'

interface RegisterDialogProps {
    title: string,
    buttonVariant?: ButtonVariant,
    triggerClassName?: string,
}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({ title, buttonVariant = "default", triggerClassName }) => {
    return (
        <Dialog>
            <DialogTrigger
                asChild
                key={title}
            >
                <Button
                    key={title}
                    variant={stegaClean(buttonVariant)}
                    size="lg"
                    className={cn(triggerClassName)}
                >
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-5xl overflow-y-auto max-h-[calc(100vh-2rem)] py-8" >
                <Register />
            </DialogContent>
        </Dialog>
    )
}
