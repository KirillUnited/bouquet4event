import Image from 'next/image';

export default function RegisterDialogOverview() {
    return (
        <div className="bg-muted p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-6">Как мы работаем</h3>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md mb-8">
                <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                    </div>
                    <div>
                        <p className="font-semibold mb-1 text-sm text-black/90">Bouquet for Event | Цветочный счёт</p>
                        <p className="text-gray-600 text-xs">
                            Здравствуйте! Мы получили вашу заявку на создание цветочного счёта. Расскажите, пожалуйста, о предстоящем событии.
                        </p>
                    </div>
                </div>
                <div className="flex items-start mb-4 justify-end">
                    <div>
                        <p className="text-gray-600 text-xs text-right">
                            Здравствуйте! Мы планируем свадьбу 15 июня. Хотели бы организовать цветочную подписку вместо букетов.
                        </p>
                    </div>
                    <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center ml-2 mt-2 flex-shrink-0"></div>
                </div>
                <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                    </div>
                    <div>
                        <p className="font-semibold mb-1 text-sm text-black/90">Bouquet for Event | Цветочный счёт</p>
                        <p className="text-gray-600 text-xs">
                            Отлично! Давайте обсудим ваши предпочтения по цветам и периодичности доставки. Какие цветы вы любите?
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Image
                    src="https://readdy.ai/api/search-image?query=happy%20couple%20receiving%20flower%20delivery%20at%20home%2C%20joyful%20moment%2C%20soft%20natural%20lighting%2C%20elegant%20bouquet%2C%20cozy%20home%20interior%2C%20soft%20beige%20background%2C%20high%20quality%20professional%20photography&width=400&height=300&seq=5&orientation=landscape"
                    alt="Счастливая пара получает доставку цветов"
                    className="w-full h-48 object-cover object-top rounded-lg mb-4"
                    width={800}
                    height={400}
                    quality={50}
                />
                <p className="text-gray-600 text-sm">
                    После регистрации вы получите персональную ссылку, которой сможете поделиться с гостями
                </p>
            </div>
        </div>
    )
}
