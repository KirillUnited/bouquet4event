import React from "react";
import { StepProps } from "@/components/shared/forms/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/shared/forms/ui/DatePicker";
import { CheckboxInput } from "../../ui";

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
                <CheckboxInput
                    control={control}
                    id="dateUndefined"
                    name="dateUndefined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDateUndefined(e.target.checked)}
                    label={
                        'Дата пока не определена'
                    }
                />

                <div className="flex justify-end pt-4">
                    <Button type="button" onClick={onNext}>
                        Далее
                    </Button>
                </div>
            </div>
        </Card>
    );
};