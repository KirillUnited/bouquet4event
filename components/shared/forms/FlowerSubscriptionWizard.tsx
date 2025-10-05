'use client';

import {useState, useCallback, JSX} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { createUserAccount } from '@/lib/userAccount';
import { openCheckoutMessage } from '@/lib/messenger';
import { ProgressBar, EventTypeStep, EventDateStep, StyleStep, DurationStep } from './ui';
import TextInput from './ui/TextInput';
import PhoneInput from './PhoneInput';
import { subscriptionSchema } from './lib/validation/subscriptionSchema';
import FormRegisterSuccess from './FormRegisterSuccess';

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface FlowerSubscriptionWizardProps {
  onSubmitSuccess?: (data: any) => void;
  goal?: string;
}

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

function FlowerSubscriptionWizard({
  onSubmitSuccess,
  goal = 'schet2'
}: FlowerSubscriptionWizardProps): JSX.Element {
  const [step, setStep] = useState(1);
  const [isDateUndefined, setIsDateUndefined] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({});

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      eventType: '',
      eventDate: undefined,
      style: '',
      duration: '',
      name: '',
      phone: '',
      email: '',
      privacyPolicy: false,
      privacyPolicyData: false
    },
  });

  const { handleSubmit, setValue, control, formState } = form;

  const handleDateUndefined = (isUndefined: boolean) => {
    setIsDateUndefined(isUndefined);
    if (isDateUndefined) {
      setValue('eventDate', undefined);
    }
  };

  const handleSend = useCallback(async (values: SubscriptionFormData) => {
    try {
      setIsSubmitting(true);
      const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const userLink = `${NEXT_PUBLIC_SITE_URL}/payment/${userId}`;

      const result = await createUserAccount({
        userId,
        userDonationLink: userLink,
        name: values.name,
        phone: values.phone,
        region: 'Москва',
        date: values.eventDate || new Date(),
        totalAmount: 0,
        privacyPolicy: values.privacyPolicy,
        privacyPolicyData: values.privacyPolicyData,
        eventType: values.eventType,
        style: values.style,
        duration: values.duration,
        email: values.email
      });

      if (result) {
        toast.success('Ваша заявка успешно отправлена!');
        setFormValues(result);
        form.reset();
        setStep(1);

        if (typeof window !== "undefined" && typeof (window as any).ym === "function" && goal) {
          (window as any).ym(103963322, "reachGoal", goal);
          console.log(`Yandex.Metrika: цель ${goal} отправлена`);
        }

        await openCheckoutMessage(result);
        onSubmitSuccess?.(result);
        return result;
      } else {
        throw new Error('Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
      }
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [goal, onSubmitSuccess]);

  const onSubmit = handleSubmit(async (values) => {
    await handleSend(values);
  });

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
                <TextInput
                  control={control}
                  name="name"
                  label="Ваше имя"
                  placeholder="Введите ваше имя"
                  required
                />

                <PhoneInput
                  control={control}
                  name="phone"
                  required
                />

                <TextInput
                  control={control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  required
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    {...form.register('privacyPolicy')}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="privacyPolicy" className="text-sm">
                    Я согласен с <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">политикой конфиденциальности</a>
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacyPolicyData"
                    {...form.register('privacyPolicyData')}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="privacyPolicyData" className="text-sm">
                    Я согласен с <a href="/soglasie-na-obrabotku-personalnykh-dannykh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">обработкой персональных данных</a>
                  </label>
                </div>

                {formState.errors.privacyPolicy && (
                  <p className="text-sm text-red-500">{formState.errors.privacyPolicy.message}</p>
                )}

                {formState.errors.privacyPolicyData && (
                  <p className="text-sm text-red-500">{formState.errors.privacyPolicyData.message}</p>
                )}

                <div className="flex justify-between pt-2">
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
