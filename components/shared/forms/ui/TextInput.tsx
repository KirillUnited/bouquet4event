import * as React from "react";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface TextInputProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    control,
    name,
    label,
    placeholder,
    className,
    required = false,
    type = "text",
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className={className}
                            type={type}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextInput;