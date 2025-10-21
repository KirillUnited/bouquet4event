import Icon from "@/components/ui/AppIcon";
import {Button} from "@/components/ui/button";
import { SubscriptionData } from "@/types/dashboard";
import { ArrowUpIcon, PauseIcon, SettingsIcon } from "lucide-react";
import { Card } from "../ui/card";

const SubscriptionCard = ({
  subscription,
  onManage,
  onPause,
  onUpgrade,
}: {
  subscription: SubscriptionData;
  onManage: (id: string) => void;
  onPause: (id: string) => void;
  onUpgrade: (id: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "paused":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString)?.toLocaleDateString("ru-RU", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="p-4 md:p-6 shadow-natural">
      <div className="flex items-start flex-wrap gap-4 justify-between mb-4">
        <div>
          <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
            {subscription?.planName}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription?.status)}`}
            >
              {subscription?.status?.charAt(0)?.toUpperCase() +
                subscription?.status?.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ${subscription?.price}/в месяц
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManage(subscription?.id)}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon size={16} />
              <span className="max-md:sr-only">Управлять</span>
            </div>
          </Button>
          {subscription?.status === "active" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPause(subscription?.id)}
            >
              <div className="flex items-center gap-2">
                <PauseIcon size={16} />
                <span className="max-md:sr-only">Пауза</span>
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            Следующая доставка
          </p>
          <p className="font-medium text-foreground">
            {formatDate(subscription?.nextDelivery)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Частота доставки</p>
          <p className="font-medium text-foreground">
            {subscription?.frequency}
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-4 justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>доставки с {formatDate(subscription?.startDate)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Package" size={16} />
            <span>{subscription?.deliveriesCount} доставок</span>
          </div>
        </div>
        {subscription?.canUpgrade && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpgrade(subscription?.id)}
            className="text-conversion border-conversion hover:bg-conversion hover:text-conversion-foreground"
          >
            <div className="flex items-center gap-2">
              <ArrowUpIcon size={16} />
              Улучшить план
            </div>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionCard;
