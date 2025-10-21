import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/AppIcon";
import Image from "next/image";
import { Badge, BadgeProps } from "../ui/badge";

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
    avatar?: string;
    createdAt?: string | undefined;
    referralLink?: string;
    accountStatus?: string;
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
  const formatDate = (dateString?: string) => {
    return new Date(dateString || "")?.toLocaleDateString("ru-RU", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount?: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    })?.format(amount || 0);
  };

  const membershipBadge = () => {
    const monthsActive = Math.floor(
      (new Date().getTime() - (user?.createdAt ? new Date(user.createdAt).getTime() : 0)) / (1000 * 60 * 60 * 24 * 30)
    );

    if (monthsActive >= 12)
      return {
        text: "Любитель цветов",
        color: "bg-purple-100 text-purple-600",
        variant: "secondary",
      };
    if (monthsActive >= 6)
      return { 
        text: "Друг сада", 
        color: "bg-green-100 text-green-600",
        variant: "secondary",
      };

    return {
      text: "Новый цветовод",
      color: "bg-accent text-accent-foreground",
      variant: "outline",
    };
  };

  const badge = membershipBadge();

  return (
    <Card className="p-4 md:p-6 shadow-natural">
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
          <div className="flex items-start gap-3 flex-wrap mb-2">
            <h2 className="max-md:text-2xl font-semibold text-foreground overflow-hidden">
              Добро пожаловать, <span className="font-bold line-clamp-1 truncate">{user?.name}!</span>
            </h2>
            <Badge
              variant={badge?.variant as BadgeProps["variant"]}
              className={`${badge?.color}`}
            >
              {badge?.text}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1 line-clamp-1 truncate">{user?.email}</p>
          <p className="text-sm text-muted-foreground">
            Участник с {formatDate(user?.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground truncate">
            {stats?.totalDeliveries}
          </p>
          <p className="text-sm text-muted-foreground">Всего доставок</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            <Icon name="Heart" size={24} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-foreground truncate">
            {stats?.favoriteFlowers}
          </p>
          <p className="text-sm text-muted-foreground">Любимые цветы</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
            <Icon name="DollarSign" size={24} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-foreground truncate">
            {formatCurrency(stats?.accountSum)}
          </p>
          <p className="text-sm text-muted-foreground">Сумма на счету</p>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <Icon name="Users" size={24} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-foreground truncate">
            {stats?.referrals}
          </p>
          <p className="text-sm text-muted-foreground">Приглашенные друзья</p>
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
