import React from "react";
import {StepProps} from "@/components/shared/forms/types";
import {Card} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";

export const EventDateStep: React.FC<StepProps & { onDateUndefined: (isUndefined: boolean) => void }> = ({
                                                                                                      onNext,
                                                                                                      control,
                                                                                                      onDateUndefined
                                                                                                  }) => {
    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Когда состоится событие?</h3>
            <div className="space-y-4">
                <FormField
                    control={control}
                    name="eventDate"
                    render={({ field }) => (
                        <FormItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                            disabled={!field.onChange}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, 'PPP', { locale: ru })
                                            ) : (
                                                <span>Выберите дату</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        locale={ru}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="dateUndefined"
                        onChange={(e) => {
                            onDateUndefined(e.target.checked);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="dateUndefined" className="text-sm font-medium">
                        Дата пока не определена
                    </label>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="button" onClick={onNext}>
                        Далее
                    </Button>
                </div>
            </div>
        </Card>
    );
};