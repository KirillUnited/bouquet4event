import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/AppIcon";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/dashboard/ui/Input";
import StudioSelect from "@/components/dashboard/ui/StudioSelect";

type AccountProps = {
  email: string;
  accountSum?: number;
  name?: string;
  phone?: string;
  region?: string;
  nextDeliveryDate?: string;
};

interface Props {
  user: AccountProps & {
    avatar: string;
    joinDate: Date | string | undefined;
    referralLink: string;
    accountStatus: string;
    bouquetCategory?: string;
    deliveryAddress?: string;
    deliveryDate?: string;
    deliveryInterval?: string;
    bouquetWishes?: string;
  };
  stats: {
    totalDeliveries: number;
    favoriteFlowers: number;
    accountSum: number;
    referrals: number;
    recentActivity: {
      type: "delivery" | "rating" | "preference";
      description: string;
      date: string;
    }[];
  };
}

export default function AccountOverview({ user, stats }: Props) {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    })?.format(amount);
  };

  const membershipBadge = () => {
    const monthsActive = Math.floor(
      (new Date() - new Date(user?.joinDate)) / (1000 * 60 * 60 * 24 * 30),
    );

    if (monthsActive >= 12)
      return {
        text: "Любитель цветов",
        color: "bg-conversion text-conversion-foreground",
      };
    if (monthsActive >= 6)
      return { text: "Друг сада", color: "bg-primary text-primary-foreground" };
    return {
      text: "Новый цветовод",
      color: "bg-accent text-accent-foreground",
    };
  };

  const bouquetCategoryOptions = [
    { value: "Romantic", label: "Романтический" },
    { value: "Seasonal", label: "Сезонный" },
    { value: "Luxe", label: "Люкс" },
    { value: "Classic", label: "Классический" },
    { value: "Modern", label: "Современный" },
  ];

  const deliveryIntervalOptions = [
    { value: "Weekly", label: "Еженедельно" },
    { value: "Bi-weekly", label: "Раз в две недели" },
    { value: "Monthly", label: "Ежемесячно" },
    { value: "One-time", label: "Разовая доставка" },
  ];

  const accountStatusOptions = [
    { value: "Active", label: "Активен" },
    { value: "Inactive", label: "Неактивен" },
    { value: "Suspended", label: "Заблокирован" },
    { value: "Cancelled", label: "Отменен" },
  ];

  const badge = membershipBadge();

  return (
    <Card className="p-6 shadow-natural">
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0">
          <Image
            src={
              user?.avatar ||
              "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png"
            }
            width={64}
            height={64}
            alt={`Аватар пользователя ${user?.name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-playfair text-xl font-semibold text-foreground">
              Добро пожаловать, {user?.name}!
            </h2>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}
            >
              {badge?.text}
            </span>
          </div>
          <p className="text-muted-foreground mb-1">{user?.email}</p>
          <p className="text-sm text-muted-foreground">
            Участник с {formatDate(user?.joinDate)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats?.totalDeliveries}
          </p>
          <p className="text-sm text-muted-foreground">Всего доставок</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            <Icon name="Heart" size={24} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats?.favoriteFlowers}
          </p>
          <p className="text-sm text-muted-foreground">Любимые цветы</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
            <Icon name="DollarSign" size={24} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(stats?.accountSum)}
          </p>
          <p className="text-sm text-muted-foreground">Сумма на счету</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <Icon name="Users" size={24} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats?.referrals}
          </p>
          <p className="text-sm text-muted-foreground">Приглашенные друзья</p>
        </div>
      </div>

      {/* New Information Fields */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">
          Дополнительная информация
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StudioSelect
            options={bouquetCategoryOptions}
            label="Категория букета"
            placeholder="Выберите категорию"
            defaultValue={user?.bouquetCategory}
            disabled
          />

          <Input
            label="Адрес доставки"
            type="text"
            value={user?.deliveryAddress || ""}
            placeholder="Введите адрес доставки"
            disabled
          />

          <Input
            label="Дата доставки"
            type="date"
            value={user?.deliveryDate || ""}
            disabled
          />

          <Select
            label="Интервал доставки"
            options={deliveryIntervalOptions}
            value={user?.deliveryInterval}
            placeholder="Выберите интервал"
            disabled
          />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Пожелания к букету
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={user?.bouquetWishes || ""}
              placeholder="Опишите ваши пожелания к букету"
              disabled
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={user?.email || ""}
            placeholder="email@example.com"
            disabled
          />

          <Input
            label="Реферальная ссылка"
            type="text"
            value={user?.referralLink || ""}
            placeholder="https://bloombox.ru/ref/..."
            disabled
          />

          <Select
            label="Статус аккаунта"
            options={accountStatusOptions}
            value={user?.accountStatus}
            placeholder="Статус аккаунта"
            disabled
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">
          Последняя активность
        </h4>
        <div className="space-y-3">
          {stats?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${activity?.type === "delivery" ? "bg-green-100 text-green-600" : ""}
                ${activity?.type === "rating" ? "bg-yellow-100 text-yellow-600" : ""}
                ${activity?.type === "preference" ? "bg-blue-100 text-blue-600" : ""}
              `}
              >
                <Icon
                  name={
                    activity?.type === "delivery"
                      ? "Package"
                      : activity?.type === "rating"
                        ? "Star"
                        : "Settings"
                  }
                  size={16}
                />
              </div>
              <div className="flex-1">
                <p className="text-foreground">{activity?.description}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDate(activity?.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
