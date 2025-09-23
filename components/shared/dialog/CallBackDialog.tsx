'use client'
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import React from 'react'
import { CallBackForm } from '../forms'
import { Button } from '@/components/ui/button'
import {CTAButtonProps} from "@/components/shared/buttons/CTAButton";

export default function CallBackDialog({ title, href, buttonVariant = "default", target, className, customGoal='' }: CTAButtonProps) {
    return (
        <Dialog>
            <DialogTrigger
                asChild
            >
                <Button variant={buttonVariant} size="lg">
                    <i className="fa fa-phone-volume mr-2"></i>
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Обратная связь
                </DialogTitle>
                <DialogDescription>
                    Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
                </DialogDescription>
                <CallBackForm />
            </DialogContent>
        </Dialog>
    )
}
