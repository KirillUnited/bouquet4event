'use client';

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Loader2Icon} from "lucide-react";
import {CheckboxInput, TextInput} from "@/components/shared/forms/ui";
import {DatePicker} from "@/components/shared/forms/ui/DatePicker";
import {FormControl, FormField, FormItem} from "@/components/ui/form";

export interface PaymentFormProps {
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    formControl: any;
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
export default function PaymentForm({onSubmit, isSubmitting, formControl}: PaymentFormProps) {
    const [donationAmount, setDonationAmount] = useState(4000);
    const handleSliderChange = (value: number[]) => {
        setDonationAmount(value[0]);
    };

    return (
        <form className="max-w-2xl mx-auto bg-background p-4 md:p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
            <div className="text-center mb-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl">
                        Вы можете подарить цветы, которые останутся надолго
                    </h2>
                    <p className="text-foreground/75 text-pretty">
                        Анна и Михаил решили создать цветочный счёт вместо традиционных букетов.
                        Ваш вклад поможет им получать свежие букеты каждую неделю после свадьбы.
                    </p>
                </div>
                <img
                    src="https://readdy.ai/api/search-image?query=elegant%20wedding%20couple%20portrait%2C%20romantic%20atmosphere%2C%20soft%20natural%20lighting%2C%20bride%20with%20bouquet%2C%20groom%20in%20suit%2C%20soft%20beige%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=6&orientation=landscape"
                    alt="Свадебная пара"
                    className="w-full h-64 object-cover object-top rounded-lg mt-6"
                />
            </div>
            <div className="mb-8 flex flex-col gap-6">
                <h3 className="text-xl font-semibold">Выберите сумму</h3>
                <div className="">
                    <FormField
                        control={formControl}
                        name="amount"
                        render={({ field }) => (
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
                <div className='grid md:grid-cols-2 gap-4'>
                    <DatePicker className='flex flex-col' label="Дата планируемого мероприятия" required
                                control={formControl}/>
                    <TextInput control={formControl} name={'email'} type='email' label="Email для чека"
                               placeholder="email@example.com" className="mt-1" required/>
                </div>
                <CheckboxInput
                    control={formControl}
                    name="privacyPolicy"
                    label={
                        <span className="text-sm">Я согласен с <a href="/privacy" target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a> и на обработку персональных данных</span>
                    }
                    required
                    className="mt-1"
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2Icon className="w-6 h-6 mr-2 animate-spin"/>}
                    Отправить
                </Button>
            </div>
        </form>
    )
}
