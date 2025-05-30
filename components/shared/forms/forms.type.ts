export interface RegisterFormProps {
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