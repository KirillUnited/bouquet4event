import React from "react";
import {Card} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {OptionType, StepProps} from "@/components/shared/forms/types";

export const EventTypeStep: React.FC<StepProps> = ({ onNext, control }) => {
    const eventTypes: OptionType[] = [
        { emoji: '💍', label: 'Свадьба', value: 'wedding' },
        { emoji: '🎂', label: 'День рождения', value: 'birthday' },
        { emoji: '🎉', label: 'Юбилей', value: 'anniversary' },
        { emoji: '🎁', label: 'Просто подарок', value: 'gift' },
    ];

    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Для какого события нужна цветочная подписка?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventTypes.map((type) => (
                    <FormField
                        key={type.value}
                        control={control}
                        name="eventType"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            field.onChange(type.value);
                                            onNext();
                                        }}
                                        className={cn(
                                            'w-full p-4 border rounded-lg text-left transition-colors',
                                            field.value === type.value ? 'border-primary bg-primary/10' : 'hover:border-primary hover:bg-primary/10 hover:cursor-pointer'
                                        )}
                                    >
                                        <span className="text-2xl">{type.emoji}</span>
                                        <div className="mt-2 font-medium">{type.label}</div>
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