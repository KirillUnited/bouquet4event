import * as React from "react";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    icon?: React.ReactNode;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    control,
    name,
    label = "Телефон",
    placeholder = "+7 (___) ___-__-__",
    className,
    required = false,
    icon,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                // Создаем ref для маскированного ввода
                const inputRef = React.useRef<HTMLInputElement>(null);

                // Эффект для применения маски к полю ввода
                React.useEffect(() => {
                    if (inputRef.current) {
                        // Импортируем динамически, чтобы избежать проблем с SSR
                        import("use-mask-input").then(({ withMask }) => {
                            withMask("+7 (999) 999-99-99")(inputRef.current);
                        });
                    }
                }, []);

                return (
                    <FormItem>
                        <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
                        <div className="relative w-full">
                            {icon && (
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                    {icon}
                                </div>
                            )}
                            <FormControl className={cn(icon && "pl-9")}>
                                <Input
                                    {...field}
                                    ref={inputRef}
                                    placeholder={placeholder}
                                    className={className}
                                    type="tel"
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default PhoneInput;