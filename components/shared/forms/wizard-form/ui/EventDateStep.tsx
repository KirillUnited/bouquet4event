import React from "react";
import {StepProps} from "@/components/shared/forms/types";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {DatePicker} from "@/components/shared/forms/ui/DatePicker";

export const EventDateStep: React.FC<StepProps & { onDateUndefined: (isUndefined: boolean) => void }> = ({
                                                                                                      onNext,
                                                                                                      control,
                                                                                                      onDateUndefined
                                                                                                  }) => {
    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Когда состоится событие?</h3>
            <div className="space-y-4">
                <DatePicker
                    control={control}
                    label="Дата планируемого мероприятия"
                    className="mt-1"
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