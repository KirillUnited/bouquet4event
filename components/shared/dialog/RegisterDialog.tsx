import Register from '@/components/blocks/forms/register'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ButtonVariant } from '@/sanity.types'
import { stegaClean } from 'next-sanity'
import React from 'react'

interface RegisterDialogProps {
    title: string,
    buttonVariant: ButtonVariant
}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({ title, buttonVariant = "default" }) => {
    return (
        <Dialog>
            <DialogTrigger
                asChild
                key={title}
            >
                <Button
                    key={title}
                    variant={stegaClean(buttonVariant)}
                    asChild
                    size="lg"
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
