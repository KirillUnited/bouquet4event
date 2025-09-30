import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { TextInput } from './ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Schema for form validation
const subscriptionSchema = z.object({
  eventType: z.string().min(1, 'Пожалуйста, выберите тип события'),
  eventDate: z.date().optional(),
  style: z.string().min(1, 'Пожалуйста, выберите стиль букета'),
  duration: z.string().min(1, 'Пожалуйста, выберите длительность подписки'),
  name: z.string().min(2, 'Имя должно содержать хотя бы 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const FlowerSubscriptionWizard = () => {
  const [step, setStep] = useState(1);
  const [isDateUndefined, setIsDateUndefined] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const eventType = watch('eventType');
  const eventDate = watch('eventDate');
  const style = watch('style');
  const duration = watch('duration');

  const eventTypes = [
    { emoji: '💍', label: 'Свадьба', value: 'wedding' },
    { emoji: '🎂', label: 'День рождения', value: 'birthday' },
    { emoji: '🎉', label: 'Юбилей', value: 'anniversary' },
    { emoji: '🎁', label: 'Просто подарок', value: 'gift' },
  ];

  const styles = [
    { emoji: '🌸', label: 'Нежный', description: 'пастель, лёгкие оттенки', value: 'delicate' },
    { emoji: '🌹', label: 'Классический', description: 'розы, традиционные композиции', value: 'classic' },
    { emoji: '🌻', label: 'Яркий', description: 'сочные цвета, акценты', value: 'bright' },
    { emoji: '💐', label: 'Авторский', description: 'эксклюзивный дизайн от флориста', value: 'designer' },
  ];

  const durations = [
    { label: '3 месяца', value: '3' },
    { label: '6 месяцев', value: '6' },
    { label: '12 месяцев', value: '12' },
    { label: 'Ещё не определились', value: 'undecided' },
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: SubscriptionFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Для какого события нужна цветочная подписка?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setValue('eventType', type.value);
                    nextStep();
                  }}
                  className={cn(
                    'p-4 border rounded-lg text-left transition-colors',
                    eventType === type.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
                  )}
                >
                  <span className="text-2xl">{type.emoji}</span>
                  <div className="mt-2 font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Когда состоится событие?</h3>
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !eventDate && 'text-muted-foreground'
                    )}
                    disabled={isDateUndefined}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventDate ? (
                      format(eventDate, 'PPP', { locale: ru })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={(date) => {
                      setValue('eventDate', date);
                    }}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dateUndefined"
                  checked={isDateUndefined}
                  onChange={(e) => {
                    setIsDateUndefined(e.target.checked);
                    if (e.target.checked) {
                      setValue('eventDate', undefined);
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="dateUndefined" className="text-sm font-medium">
                  Дата пока не определена
                </label>
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={nextStep}>
                  Далее
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Какой стиль букетов вам нравится больше всего?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {styles.map((styleItem) => (
                <button
                  key={styleItem.value}
                  type="button"
                  onClick={() => {
                    setValue('style', styleItem.value);
                    nextStep();
                  }}
                  className={cn(
                    'p-4 border rounded-lg text-left transition-colors',
                    style === styleItem.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{styleItem.emoji}</span>
                    <div>
                      <div className="font-medium">{styleItem.label}</div>
                      <div className="text-sm text-muted-foreground">{styleItem.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">На какой срок вы хотите оформить подписку?</h3>
            <div className="space-y-4">
              {durations.map((durationItem) => (
                <button
                  key={durationItem.value}
                  type="button"
                  onClick={() => {
                    setValue('duration', durationItem.value);
                    nextStep();
                  }}
                  className={cn(
                    'w-full p-4 border rounded-lg text-left transition-colors',
                    duration === durationItem.value ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
                  )}
                >
                  {durationItem.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Мы подготовим для вас персональное предложение по цветочной подписке 🌸</h3>
              <p className="text-muted-foreground mb-6">
                Оставьте контакты, и наш флорист свяжется с вами, чтобы обсудить детали
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <TextInput
                  {...register('name')}
                  label="Ваше имя"
                  placeholder="Введите ваше имя"
                  error={errors.name?.message}
                />
              </div>
              <div>
                <TextInput
                  {...register('phone')}
                  label="Телефон"
                  placeholder="+7 (___) ___-__-__"
                  error={errors.phone?.message}
                />
              </div>
              <div>
                <TextInput
                  {...register('email')}
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  error={errors.email?.message}
                />
              </div>
              <Button type="submit" className="w-full">
                Отправить заявку
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div
              key={stepNum}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                step >= stepNum
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
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Form steps */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      {step > 1 && step < 5 && (
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Назад
          </Button>
          {step === 4 && (
            <Button type="button" onClick={nextStep}>
              Далее
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default FlowerSubscriptionWizard;
