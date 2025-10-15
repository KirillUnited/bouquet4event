import * as z from "zod";
import {SubscriptionSchema} from "@/components/shared/forms/lib/validation";

export interface RegisterFormProps {
    id: string;
    onSubmit: (event: React.FormEvent) => void;
    isSubmitting: boolean;
    formControl: any; // Adjust the type based on your form control type
}
export interface RegisterFormContainerProps {
    className?: string;
    title?: string;
    description?: string;
    children: React.ReactNode;
}
export interface PaymentFormProps {
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    formControl: any;
    orderNumber?: string;
    token?: string;
}
export interface OptionType {
    value: string;
    label: string;
    emoji?: string;
    description?: string;
}

export interface StepProps {
    onNext: () => void;
    onBack?: () => void;
    control: any;
}
export type SubscriptionFormData = z.infer<typeof SubscriptionSchema>;