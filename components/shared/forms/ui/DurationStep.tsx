import React from "react";
import {OptionType, StepProps} from "@/components/shared/forms/types";
import {Card} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";


export const DurationStep: React.FC<StepProps> = ({ onNext, control }) => {
    const durations: OptionType[] = [
        { label: '1 месяц', value: '1' },
        { label: '3 месяца', value: '3' },
        { label: '6 месяцев', value: '6' },
        { label: '12 месяцев', value: '12' },
        { label: 'Ещё не определились', value: 'undecided' },
    ];

    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">На какой срок вы хотите оформить подписку?</h3>
            <div className="space-y-4">
                {durations.map((duration) => (
                    <FormField
                        key={duration.value}
                        control={control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            field.onChange(duration.value);
                                            onNext();
                                        }}
                                        className={cn(
                                            'w-full p-4 border rounded-lg text-left transition-colors',
                                            field.value === duration.value ? 'border-primary bg-primary/10' : 'hover:border-primary hover:bg-primary/10 hover:cursor-pointer'
                                        )}
                                    >
                                        {duration.label}
                                    </button>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </Card>
    );
};
