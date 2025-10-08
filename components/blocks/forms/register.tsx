'use client';
import { RegisterDialogOverview } from "@/components/shared/dialog";
import { FlowerSubscriptionWizard, RegisterFormContainer } from "@/components/shared/forms";
import { ColorVariant, PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "@/components/layout/section-container";
import { stegaClean } from "next-sanity";
import useRegisterForm from "@/hooks/useRegisterForm";
import { formSchema } from "@/hooks/useRegisterForm";
import FormRegisterSuccess from "@/components/shared/forms/FormRegisterSuccess";

type FormRegisterProps = Extract<
    NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
    { _type: "form-register" }
>;

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function Register({
    padding,
    colorVariant,
    title,
    description,
    buttonText,
    successMessage,
    privacyPolicyText,
    goal,
    customGoal
}: FormRegisterProps & { customGoal?: string }) {
    const { formValues, onSubmit } = useRegisterForm({
        goal: goal || customGoal,
    });

    const color = stegaClean(colorVariant) as ColorVariant;

    return (
        <>
            {formValues && (
                <FormRegisterSuccess values={formValues} />
            )}
            <SectionContainer color={color} padding={padding}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RegisterFormContainer
                        title={title || "Зарегистрировать цветочный счёт"}
                        description={description || "Заполните форму, и мы свяжемся с вами в ближайшее время, чтобы обсудить все детали вашей цветочной подписки."}
                    >
                        <FlowerSubscriptionWizard goal={goal || customGoal} onSubmitSuccess={onSubmit} />
                    </RegisterFormContainer>
                    <RegisterDialogOverview />
                </div>
            </SectionContainer>
        </>
    );
}
