"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import Button from "@/components/dashboard/ui/Button";

type NotificationType = "delivery" | "reminder" | "promotion" | "update" | "default";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: NotificationType;
  createdAt: string;
  read?: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const getNotificationIcon = (type?: NotificationType) => {
    switch (type) {
      case "delivery":
        return { name: "Package", color: "text-blue-600", bgColor: "bg-blue-100" };
      case "reminder":
        return { name: "Bell", color: "text-yellow-600", bgColor: "bg-yellow-100" };
      case "promotion":
        return { name: "Tag", color: "text-green-600", bgColor: "bg-green-100" };
      case "update":
        return { name: "Info", color: "text-purple-600", bgColor: "bg-purple-100" };
      default:
        return { name: "Bell", color: "text-gray-600", bgColor: "bg-gray-100" };
    }
  };

  const filteredNotifications = notifications?.filter((notification) => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0;

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Только что";
    if (diffInHours < 24) return `${diffInHours} ч. назад`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} дн. назад`;

    return date.toLocaleDateString("ru-RU", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="font-playfair text-lg font-semibold text-foreground">
            Уведомления
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "unread" | "read")}
            className="px-3 py-1 border border-border rounded-md text-sm bg-background text-foreground"
          >
            <option value="all">Все</option>
            <option value="unread">Непрочитанные</option>
            <option value="read">Прочитанные</option>
          </select>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCheck"
              onClick={onMarkAllAsRead}
            >
              Отметить всё как прочитанное
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Bell"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <p className="text-muted-foreground">
              {filter === "unread"
                ? "Нет непрочитанных уведомлений"
                : "Уведомления отсутствуют"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const icon = getNotificationIcon(notification.type);

            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-natural cursor-pointer
                  ${
                    notification.read
                      ? "border-border bg-background"
                      : "border-primary/20 bg-primary/5"
                  } hover:shadow-natural`}
                onClick={() =>
                  !notification.read && onMarkAsRead(notification.id)
                }
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${icon.bgColor}`}
                  >
                    <Icon name={icon.name} size={20} className={icon.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`font-medium mb-1 ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>

                    {notification.actionUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                      >
                        {notification.actionText || "Посмотреть"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
