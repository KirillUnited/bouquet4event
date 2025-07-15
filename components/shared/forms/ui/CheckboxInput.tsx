import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CheckboxInputProps {
    control: Control<any>;
    name: string;
    label: React.ReactNode;
    className?: string;
    required?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    control,
    name,
    label,
    className,
    required = false,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("grid grid-cols-[auto_1fr] rounded-md", className)}>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-[0]">
                        <FormLabel className="text-sm font-normal">
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default CheckboxInput;