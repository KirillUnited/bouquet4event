'use client';

import React, { JSX } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
import { EventTypeStep, EventDateStep, StyleStep, DurationStep } from '@/components/shared/forms/wizard-form/ui';
import FormRegisterSuccess from '../FormRegisterSuccess';
import { ProgressBar } from "@/components/shared/forms/ui";
import useRegisterForm from '@/hooks/useRegisterForm';
import { RegisterFormFieldset } from '@/components/shared/forms';

interface FlowerSubscriptionWizardProps {
  onSubmitSuccess?: (data: any) => void;
  goal?: string;
}

function FlowerSubscriptionWizard({
  onSubmitSuccess,
  goal = 'schet2'
}: FlowerSubscriptionWizardProps): JSX.Element {
  const [step, setStep] = React.useState(1);
  const [isDateUndefined, setIsDateUndefined] = React.useState(false);

  const {
    form,
    formValues,
    isSubmitting,
    onSubmit,
    handleSend
  } = useRegisterForm({
    goal,
    onSuccess: (result) => {
      setStep(1);
      onSubmitSuccess?.(result);
    }
  });

  const { handleSubmit, setValue, control, formState } = form;

  const handleDateUndefined = (isUndefined: boolean) => {
    setIsDateUndefined(isUndefined);
    if (isUndefined) {
      setValue('eventDate', undefined);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
        <ProgressBar currentStep={step} totalSteps={5} />

        <div className="mb-8">
          {formState.isSubmitSuccessful && (
            <FormRegisterSuccess values={formValues} />
          )}
          {step === 1 && <EventTypeStep onNext={nextStep} control={control} />}
          {step === 2 && (
            <EventDateStep
              onNext={nextStep}
              control={control}
              onDateUndefined={handleDateUndefined}
            />
          )}
          {step === 3 && <StyleStep onNext={nextStep} control={control} />}
          {step === 4 && <DurationStep onNext={nextStep} control={control} />}
          {step === 5 && (
            <Card className="p-6">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">
                  Мы подготовим для вас персональное предложение по цветочной подписке 🌸
                </h3>
                <p className="text-muted-foreground">
                  Оставьте контакты, и наш флорист свяжется с вами, чтобы обсудить детали
                </p>
              </div>

              <div className="space-y-6">
                
                <RegisterFormFieldset formControl={control} />

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
                    Отправить заявку
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default FlowerSubscriptionWizard;
