import React from "react";
import {OptionType, StepProps} from "@/components/shared/forms/types";
import {Card} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";


export const StyleStep: React.FC<StepProps> = ({ onNext, control }) => {
    const styles: OptionType[] = [
        { emoji: '🌸', label: 'Нежный', description: 'пастель, лёгкие оттенки', value: 'delicate' },
        { emoji: '🌹', label: 'Классический', description: 'розы, традиционные композиции', value: 'classic' },
        { emoji: '🌻', label: 'Яркий', description: 'сочные цвета, акценты', value: 'bright' },
        { emoji: '💐', label: 'Авторский', description: 'эксклюзивный дизайн от флориста', value: 'designer' },
    ];

    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Какой стиль букетов вам нравится больше всего?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {styles.map((style) => (
                    <FormField
                        key={style.value}
                        control={control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            field.onChange(style.value);
                                            onNext();
                                        }}
                                        className={cn(
                                            'w-full p-4 border rounded-lg text-left transition-colors',
                                            field.value === style.value ? 'border-primary bg-primary/10' : 'hover:border-primary hover:bg-primary/10 hover:cursor-pointer'
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">{style.emoji}</span>
                                            <div>
                                                <div className="font-medium">{style.label}</div>
                                                <div className="text-sm text-muted-foreground">{style.description}</div>
                                            </div>
                                        </div>
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
