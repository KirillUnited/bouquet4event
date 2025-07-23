import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import React from 'react'
import { toast } from 'sonner';

function FormRegisterSuccess({ values }: any) {
    const userLink = `${process.env.NEXT_PUBLIC_SITE_URL}/payment/${values.userId}`;

    return (
        <Dialog defaultOpen>
            <DialogTitle className="hidden">Зарегистрирован</DialogTitle>
            <DialogDescription className="hidden" />
            <DialogContent className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center overflow-y-auto text-center max-h-[90vh]">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Ваш цветочный счёт создан!</h2>
                <p className="text-foreground/70 mb-6 text-balance">
                    Поделитесь этой ссылкой с гостями, чтобы они могли внести свой вклад в ваш цветочный счёт
                </p>
                {/* !TODO: Temporary block */}
                <div className="mb-4 w-full max-w-fit p-4 border-1 rounded-lg">
                    <ul className="grid grid-cols-2 gap-2 text-sm overflow-x-auto">
                        <li className="text-left text-foreground/60">Имя:</li>
                        <li className="text-right font-medium">{values.name}</li>
                        <li className="text-left text-foreground/60">Телефон:</li>
                        <li className="text-right font-medium">{values.phone}</li>
                        <li className="text-left text-foreground/60">Регион:</li>
                        <li className="text-right font-medium">{values.region}</li>
                        <li className="text-left text-foreground/60">Номер счёта:</li>
                        <li className="text-right font-medium">{values.userId}</li>
                    </ul>
                </div>
                <div className="w-full bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between gap-2">
                        <code className="text-sm text-gray-800 flex-1 overflow-hidden overflow-ellipsis">
                            {userLink}
                        </code>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                navigator.clipboard.writeText(userLink);
                                toast.success('Ссылка скопирована!');
                            }}
                        >
                            Копировать
                        </Button>
                    </div>
                </div>
                <p className="text-sm text-foreground/60 text-balance">
                    Мы отправили детали на указанный номер телефона. Наш менеджер свяжется с вами в ближайшее время.
                </p>
                <DialogFooter className="items-center sm:justify-center self-stretch">
                    <DialogClose asChild>
                        <Button className="mt-8 w-[min(220px,100%)]">
                            Готово
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default FormRegisterSuccess