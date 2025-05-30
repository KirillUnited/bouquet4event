import React from 'react'
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import RegionSelect from './RegionSelect';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { RegisterFormContainerProps, RegisterFormProps } from './forms.type';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import CheckboxInput from './CheckboxInput';

export default function RegisterForm({ onSubmit, isSubmitting, formControl }: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-6">
                <TextInput
                    control={formControl}
                    name="name"
                    label="Имя"
                    placeholder="Введите ваше имя"
                    className="mt-1"
                    required
                />
                <PhoneInput
                    control={formControl}
                    name="phone"
                    required
                    className="mt-1"
                />
                <RegionSelect
                    control={formControl}
                    name="region"
                    required
                    className="mt-1"
                />
                <CheckboxInput
                    control={formControl}
                    name="privacyPolicy"
                    label={
                        <span className="text-sm">Я согласен с <a href="/privacy" target="_blank" className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a> и на обработку персональных данных</span>
                    }
                    required
                    className="mt-1"
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />}
                    Отправить заявку
                </Button>
            </div>
        </form>
    );
}

export function RegisterFormContainer({ className, title, description, children }: RegisterFormContainerProps) {
    return (
        <div className={cn("flex flex-col gap-8", className)}>
            {(title || description) && (
                <DialogHeader>
                    {title && (
                        <DialogTitle className="text-2xl sm:text-4xl text-balance">
                            {title}
                        </DialogTitle>
                    )}
                    {description && (
                        <DialogDescription className="text-foreground-85">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
            )}
            {children}
        </div>
    );
}