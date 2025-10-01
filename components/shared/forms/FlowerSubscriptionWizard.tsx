'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { ContactStep, DurationStep, EventDateStep, EventTypeStep, ProgressBar, StyleStep} from './ui';
import {SubscriptionFormData} from "@/components/shared/forms/types";
import {subscriptionSchema} from "@/components/shared/forms/lib/validation/subscriptionSchema";

const FlowerSubscriptionWizard = () => {
  const [step, setStep] = useState(1);
  const [isDateUndefined, setIsDateUndefined] = useState(false);

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      eventType: '',
      style: '',
      duration: '',
      name: '',
      phone: '',
      email: '',
    },
  });

  const { handleSubmit, watch, setValue } = form;

  const handleDateUndefined = (isUndefined: boolean) => {
    setIsDateUndefined(isUndefined);
    if (isDateUndefined) {
      setValue('eventDate', undefined);
    }
  };

  const onSubmit = (data: SubscriptionFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <ProgressBar currentStep={step} totalSteps={5} />

        <div className="mb-8">
          {step === 1 && <EventTypeStep onNext={nextStep} control={form.control} />}
          {step === 2 && (
            <EventDateStep
              onNext={nextStep}
              control={form.control}
              onDateUndefined={handleDateUndefined}
            />
          )}
          {step === 3 && <StyleStep onNext={nextStep} control={form.control} />}
          {step === 4 && <DurationStep onNext={nextStep} control={form.control} />}
          {step === 5 && <ContactStep onBack={prevStep} onSubmit={onSubmit} />}
        </div>
      </form>
    </Form>
  );
};

export default FlowerSubscriptionWizard;
