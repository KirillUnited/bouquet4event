import React from 'react'
import TextInput from './ui/TextInput';
import PhoneInput from './PhoneInput';
import RegionSelect from './RegionSelect';
import {Button} from '@/components/ui/button';
import {Loader2Icon} from 'lucide-react';
import {RegisterFormContainerProps, RegisterFormProps} from './forms.type';
import {cn} from '@/lib/utils';
import CheckboxInput from './ui/CheckboxInput';
import {DatePicker} from "@/components/shared/forms/ui/DatePicker";

export default function RegisterForm({onSubmit, isSubmitting, formControl}: RegisterFormProps) {
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
                <DatePicker
                    control={formControl}
                    label="Дата планируемого мероприятия"
                    required
                    className="mt-1"
                />
                <CheckboxInput
                    control={formControl}
                    name="privacyPolicy"
                    label={
                        <span className="text-sm">Я согласен с <a href="/privacy" target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a></span>
                    }
                    required
                    className="mt-1"
                />
                <CheckboxInput
                    control={formControl}
                    name="privacyPolicyData"
                    label={
                        <span className="text-sm">Я согласен с <a href="/soglasie-na-obrabotku-personalnykh-dannykh" target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">обработкой персональных данных</a></span>
                    }
                    required
                    className="mt-1"
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2Icon className="w-6 h-6 mr-2 animate-spin"/>}
                    Отправить заявку
                </Button>
            </div>
        </form>
    );
}

export function RegisterFormContainer({className, title, description, children}: RegisterFormContainerProps) {
    return (
        <div className={cn("flex flex-col gap-8", className)}>
            {(title || description) && (
                <div className='flex flex-col gap-4 text-center sm:text-left'>
                    {title && (
                        <h2 className="text-2xl sm:text-4xl text-balance">
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