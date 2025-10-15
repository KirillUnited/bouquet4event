import React from 'react'
import TextInput from './ui/TextInput';
import PhoneInput from './ui/PhoneInput';
import RegionSelect from './ui/RegionSelect';
import { Button } from '@/components/ui/button';
import { Loader2Icon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { RegisterFormContainerProps, RegisterFormProps } from './types';
import { cn } from '@/lib/utils';
import CheckboxInput from './ui/CheckboxInput';
import { DatePicker } from "@/components/shared/forms/ui/DatePicker";

export const RegisterFormFieldset = ({ formControl }: { formControl: any }) => {
    return (
        <fieldset className="flex flex-col gap-6">
            <TextInput
                control={formControl}
                name="name"
                label="Имя"
                placeholder="Введите ваше имя"
                required
                icon={<UserIcon size={16} />}
            />
            <PhoneInput
                control={formControl}
                name="phone"
                required
                icon={<PhoneIcon size={16} />}
            />

            <TextInput
                control={formControl}
                name="email"
                type="email"
                label="Email"
                placeholder="email@example.com"
                required
                icon={<MailIcon size={16} />}
            />
            <RegionSelect
                control={formControl}
                name="region"
                required
            />
            <TextInput control={formControl} name="password" label="Пароль" placeholder="Введите ваш пароль" type="password" required />
            <DatePicker
                control={formControl}
                label="Дата планируемого мероприятия"
                required={false}
            />
            <div className="flex flex-col gap-2">
                <CheckboxInput
                    control={formControl}
                    name="privacyPolicy"
                    label={
                        <span className="text-sm">Я согласен с <a href="/privacy" target="_blank"
                            className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a> и с <a href="/soglasie-na-obrabotku-personalnykh-dannykh" target="_blank"
                                className="text-primary-500 hover:text-primary-600 underline">обработкой персональных данных</a></span>
                    }
                    required
                />
            </div>
        </fieldset>
    )
}

export default function RegisterForm({ id, onSubmit, isSubmitting, formControl }: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit} id={id}>
            <div className="space-y-6">
                <RegisterFormFieldset formControl={formControl} />
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
                <div className='flex flex-col gap-4'>
                    {title && (
                        <h2 className="text-3xl md:text-5xl text-balance">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-foreground-85 text-pretty">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}