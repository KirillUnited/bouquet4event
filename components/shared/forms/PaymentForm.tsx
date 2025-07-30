'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2Icon } from "lucide-react";
import { CheckboxInput, TextInput } from "@/components/shared/forms/ui";
import { DatePicker } from "@/components/shared/forms/ui/DatePicker";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

export interface PaymentFormProps {
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    formControl: any;
    orderNumber?: string;
    token?: string;
}

/**
 * A payment form component that allows users to select a donation amount and provide their email address.
 *
 * @param {PaymentFormProps} props - The component props.
 * @param {function} props.onSubmit - A callback function to handle form submission.
 * @param {boolean} props.isSubmitting - A boolean indicating whether the form is currently submitting.
 * @param {object} props.formControl - An object to control form inputs.
 * @return {JSX.Element} The payment form component.
 */
export default function PaymentForm({ 
    onSubmit, 
    isSubmitting, 
    formControl, 
    orderNumber = `order`,
    token = '' // Default test token, replace with your actual token
}: PaymentFormProps) {
    const [donationAmount, setDonationAmount] = useState(4000);
    const handleSliderChange = (value: number[]) => {
        setDonationAmount(value[0]);
    };

    return (
        <form className="max-w-2xl mx-auto bg-background p-4 md:p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
                <h3 className="text-xl font-semibold">Выберите сумму</h3>
                <div className="">
                    <FormField
                        control={formControl}
                        name="amount"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value ?? 4000]}
                                        value={[field.value]}
                                        max={10000}
                                        min={4000}
                                        step={500}
                                        onValueChange={(value) => {
                                            field.onChange(value[0])
                                            handleSliderChange(value)
                                        }}
                                        className="mb-2"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <span>4 000 ₽</span>
                        <span>10 000 ₽</span>
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                        <span>Сумма вклада:</span>
                        <span className="font-semibold">{donationAmount.toLocaleString()} ₽</span>
                    </div>
                    <div
                        className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                        <span>Итого к оплате:</span>
                        <span>{donationAmount.toLocaleString()} ₽</span>
                    </div>
                </div>
                <div className='grid gap-4'>
                    {/*<DatePicker className='flex flex-col' label="Дата планируемого мероприятия" required control={formControl}/>*/}
                    <TextInput control={formControl} name={'email'} type='email'
                               label="Email для чека"
                               placeholder="email@example.com" required/>
                </div>
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
                        <span className="text-sm">Я согласен с <a href="/soglasie-na-obrabotku-personalnykh-dannykh"
                                                                  target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">обработкой персональных данных</a></span>
                    }
                    required
                    className="mt-1"
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2Icon className="w-6 h-6 mr-2 animate-spin"/>}
                    Перейти к оплате
                </Button>
            </div>
        </form>
    )
}
