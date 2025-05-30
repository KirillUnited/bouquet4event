import * as React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    regions?: Array<{ value: string; label: string }>;
}

const RegionSelect: React.FC<RegionSelectProps> = ({
    control,
    name,
    label = "Регион",
    placeholder = "Выберите регион",
    className,
    required = false,
    regions = [
        { value: "Москва", label: "Москва" },
        { value: "Московская область", label: "Московская область" },
    ],
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger className={`mt-1 w-full ${className}`}>
                                <SelectValue placeholder={placeholder} className="w-full" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region.value} value={region.value}>
                                    {region.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RegionSelect;