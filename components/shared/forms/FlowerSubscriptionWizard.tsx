'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import TextInput from './ui/TextInput';
import PhoneInput from './PhoneInput';
import { Card, CardContent } from '@/components/ui/card';
import { CheckboxInput } from './ui';

// Schema for form validation
const subscriptionSchema = z.object({
  eventType: z.string().min(1, 'Пожалуйста, выберите тип события'),
  eventDate: z.date().optional(),
  style: z.string().min(1, 'Пожалуйста, выберите стиль букета'),
  duration: z.string().min(1, 'Пожалуйста, выберите длительность подписки'),
  name: z.string().min(2, 'Имя должно содержать хотя бы 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "Необходимо согласиться с политикой конфиденциальности"
  }),
  privacyPolicyData: z.boolean().refine(val => val === true, {
    message: "Необходимо согласиться с обработкой персональных данных"
  }),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface OptionType {
  value: string;
  label: string;
  emoji?: string;
  description?: string;
}

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  control: any;
}

const EventTypeStep: React.FC<StepProps> = ({ onNext, control }) => {
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
                      field.value === type.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
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

const EventDateStep: React.FC<StepProps & { onDateUndefined: (isUndefined: boolean) => void }> = ({
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

const StyleStep: React.FC<StepProps> = ({ onNext, control }) => {
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
                      field.value === style.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
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

const DurationStep: React.FC<StepProps> = ({ onNext, control }) => {
  const durations: OptionType[] = [
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
                      field.value === duration.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
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

const ContactStep: React.FC<{ onBack: () => void; onSubmit: (data: SubscriptionFormData) => void }> = ({
  onBack,
  onSubmit
}) => {
  const form = useFormContext<SubscriptionFormData>();

  return (
    <Card className="p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-2">
          Мы подготовим для вас персональное предложение по цветочной подписке 🌸
        </h3>
        <p className="text-muted-foreground">
          Оставьте контакты, и наш флорист свяжется с вами, чтобы обсудить детали
        </p>
      </div>

      <div className="space-y-6">
        <TextInput
          control={form.control}
          name="name"
          label="Ваше имя"
          placeholder="Введите ваше имя"
          required
        />

        <PhoneInput
          control={form.control}
          name="phone"
          required
        />

        <TextInput
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="email@example.com"
          required
        />

        <CheckboxInput
          control={form.control}
          name="privacyPolicy"
          label={
            <span className="text-sm">Я согласен с <a href="/privacy" target="_blank"
              className="text-primary-500 hover:text-primary-600 underline">политикой конфиденциальности</a></span>
          }
          required
          className="mt-1"
        />

        <CheckboxInput
          control={form.control}
          name="privacyPolicyData"
          label={
            <span className="text-sm">Я согласен с <a href="/soglasie-na-obrabotku-personalnykh-dannykh" target="_blank"
              className="text-primary-500 hover:text-primary-600 underline">обработкой персональных данных</a></span>
          }
          required
          className="mt-1"
        />

        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onBack}>
            Назад
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Отправить заявку
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
          <div
            key={stepNum}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              currentStep >= stepNum
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-400'
            )}
          >
            {stepNum}
          </div>
        ))}
      </div>
      <div className="h-1 bg-gray-100 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

const FlowerSubscriptionWizard = () => {
  const [step, setStep] = React.useState(1);
  const [isDateUndefined, setIsDateUndefined] = React.useState(false);

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
    if (isUndefined) {
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
