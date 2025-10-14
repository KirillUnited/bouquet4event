type Props = {
    email: string;
    accountSum?: number;
    name?: string;
    phone?: string;
    region?: string;
    nextDeliveryDate?: string;
};

export default function AccountOverview({ 
    email, 
    accountSum, 
    name, 
    phone, 
    region, 
    nextDeliveryDate 
}: Props) {
    return (
        <div className="rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Обзор аккаунта</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Имя</div>
                    <div className="text-lg font-medium">{name || 'Не указано'}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div className="text-lg font-medium">{email}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Телефон</div>
                    <div className="text-lg font-medium">{phone || 'Не указан'}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Регион</div>
                    <div className="text-lg font-medium">{region || 'Не указан'}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Баланс счета</div>
                    <div className="text-lg font-medium">{accountSum?.toLocaleString('ru-RU') || 0} ₽</div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Следующая доставка</div>
                    <div className="text-lg font-medium">{nextDeliveryDate || '—'}</div>
                </div>
            </div>
        </div>
    );
}


