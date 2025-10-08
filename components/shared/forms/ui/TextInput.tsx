import * as React from "react";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextInputProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    type?: string;
    icon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
    control,
    name,
    label,
    placeholder,
    className,
    required = false,
    type = "text",
    icon,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{required ? <span className="text-destructive ml-1">*</span> : <span className="text-foreground/90 text-sm font-light"> (Необязательно)</span>}</FormLabel>

                    <div className="relative w-full">
                        {icon && (
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                {icon}
                            </div>
                        )}
                        <FormControl className={cn(
                            icon && "pl-9"
                        )}>
                            <Input
                                {...field}
                                placeholder={placeholder}
                                className={className}
                                type={type}
                            />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextInput;