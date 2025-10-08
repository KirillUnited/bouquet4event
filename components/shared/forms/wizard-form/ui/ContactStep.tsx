import React from "react";
import {useFormContext} from "react-hook-form";
import {Card} from "@/components/ui/card";
import TextInput from "../../ui/TextInput";
import PhoneInput from "../../ui/PhoneInput";
import {CheckboxInput} from "@/components/shared/forms/ui";
import {Button} from "@/components/ui/button";
import {SubscriptionFormData} from "@/components/shared/forms/types";

export const ContactStep: React.FC<{ onBack: () => void; onSubmit: (data: SubscriptionFormData) => void }> = ({
                                                                                                           onBack,
                                                                                                           onSubmit
                                                                                                       }) => {
    const form = useFormContext<SubscriptionFormData>();

    return (
        <Card className="p-6">
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">
                    Мы подготовим для вас персональное предложение по цветочной подписке 🌸
                </h3>
                <p className="text-muted-foreground">
                    Оставьте контакты, и наш флорист свяжется с вами, чтобы обсудить детали
                </p>
            </div>

            <div className="space-y-6">
                <TextInput
                    control={form.control}
                    name="name"
                    label="Ваше имя"
                    placeholder="Введите ваше имя"
                    required
                />

                <PhoneInput
                    control={form.control}
                    name="phone"
                    required
                />

                <TextInput
                    control={form.control}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="email@example.com"
                    required
                />

                <CheckboxInput
                    control={form.control}
                    name="privacyPolicy"
                    label={
                        <span className="text-sm">Я согласен с <a href="/privacy" target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a></span>
                    }
                    required
                    className="mt-1"
                />

                <CheckboxInput
                    control={form.control}
                    name="privacyPolicyData"
                    label={
                        <span className="text-sm">Я согласен с <a href="/soglasie-na-obrabotku-personalnykh-dannykh" target="_blank"
                                                                  className="text-primary-500 hover:text-primary-600 underline">обработкой персональных данных</a></span>
                    }
                    required
                    className="mt-1"
                />

                <div className="flex justify-between pt-2">
                    <Button type="button" variant="outline" onClick={onBack}>
                        Назад
                    </Button>
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                        Отправить заявку
                    </Button>
                </div>
            </div>
        </Card>
    );
};
