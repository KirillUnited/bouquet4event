import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import React from 'react'
import { toast } from 'sonner';

function FormRegisterSuccess({ values }: any) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Ваш цветочный счёт создан!</h2>
            <p className="text-gray-600 mb-6">
                Поделитесь этой ссылкой с гостями, чтобы они могли внести свой вклад в ваш цветочный счёт
            </p>
            {/* !TODO: Temporary block */}
            <div className="mb-4 w-full max-w-fit p-4 border-1 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-left text-gray-500">Имя:</div>
                    <div className="text-right font-medium">{values.name}</div>
                    <div className="text-left text-gray-500">Телефон:</div>
                    <div className="text-right font-medium">{values.phone}</div>
                    <div className="text-left text-gray-500">Регион:</div>
                    <div className="text-right font-medium">{values.region}</div>
                    <div className="text-left text-gray-500">Номер счёта:</div>
                    <div className="text-right font-medium">{values.id}</div>
                </div>
            </div>
            <div className="w-full max-w-md bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between gap-2">
                    <code className="text-sm text-gray-800 flex-1 overflow-hidden overflow-ellipsis">
                        https://bouquet4event.com/account/{values.name.toLowerCase().replace(/\s+/g, '-')}-{Date.now()}
                    </code>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            navigator.clipboard.writeText(`https://bouquet4event.com/account/${values.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`);
                            toast.success('Ссылка скопирована!');
                        }}
                    >
                        Копировать
                    </Button>
                </div>
            </div>
            <p className="text-sm text-gray-500">
                Мы отправили детали на указанный номер телефона. Наш менеджер свяжется с вами в ближайшее время.
            </p>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button className="mt-8">
                        Готово
                    </Button>
                </DialogClose>
            </DialogFooter>
        </div>
    )
}

export default FormRegisterSuccess