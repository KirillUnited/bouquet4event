'use client'
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import React from 'react'
import { CallBackForm } from '../forms'
import { Button } from '@/components/ui/button'

export default function CallBackDialog() {
    return (
        <Dialog>
            <DialogTrigger
                asChild
            >
                <Button variant="outline" size="lg">
                    <i className="fa fa-phone-volume mr-2"></i>
                    обратная связь
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
