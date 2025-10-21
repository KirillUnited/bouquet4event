"use client";

import { useState, useEffect, useCallback } from "react";
import AccountOverview from "@/components/dashboard/AccountOverview";
import { Button } from "@/components/ui/button";
import Icon, { AppIconProps } from "@/components/ui/AppIcon";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import QuickActions from "@/components/dashboard/QuickActions";
import DeliveryCalendar from "@/components/dashboard/DeliveryCalendar";
import PreferenceManager from "@/components/dashboard/PreferenceManager";
import DeliveryHistory from "@/components/dashboard/DeliveryHistory";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import type {
  UserData,
  UserPreferences,
  Notification,
  SubscriptionData,
  DeliveryData,
  UserStats,
  TabItem,
} from "@/types/dashboard";
import {
  deliveryData,
  deliveryHistory,
  subscriptionData,
  tabs,
  userStats,
} from "@/components/dashboard/mock-data";
import { AccountDataProps } from "@/lib/api/account";

interface AccountDashboardProps {
  userData: AccountDataProps;
}

export default function AccountDashboard({ userData }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock preferences data - Russian translations
  const [preferences, setPreferences] = useState<UserPreferences>({
    colorPalette: "warm",
    favoriteFlowers: ["Розы", "Пионы", "Подсолнухи"],
    deliveryTime: "10:00",
    specialInstructions: "Оставить у двери, если никого нет дома",
    smsNotifications: true,
    includeCareInstructions: true,
    seasonalSurprises: true,
    allergies: "",
    bouquetCategory: "Romantic",
    deliveryAddress: "ул. Тверская, 15, кв. 42, Москва, 125009",
    deliveryDate: "2024-10-15",
    deliveryInterval: "Weekly",
    bouquetWishes: "Розовые и белые цветы, без сильного запаха",
    email: "anna.ivanova@email.com",
    referralLink: "https://bouquet4event.ru/ref/anna_ivanova",
    accountStatus: "Active",
  });

  // Mock notifications - Russian translations
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "delivery",
        title: "Доставка подтверждена",
        message:
          'Ваш букет "Осенняя гармония" будет доставлен завтра между 10-12 часами.',
        createdAt: "2024-10-09T10:30:00Z",
        read: false,
        actionUrl: "/track-delivery",
        actionText: "Отследить доставку",
      },
      {
        id: 2,
        type: "promotion",
        title: "Специальное предложение",
        message:
          "Получите скидку 20% на следующую покупку дополнений с кодом ОСЕНЬ20.",
        createdAt: "2024-10-08T14:15:00Z",
        read: false,
        actionUrl: "/shop-addons",
        actionText: "Купить сейчас",
      },
      {
        id: 3,
        type: "reminder",
        title: "Оцените последнюю доставку",
        message:
          'Как вам понравился букет "Осенний урожай"? Ваш отзыв помогает нам улучшаться.',
        createdAt: "2024-10-08T09:00:00Z",
        read: true,
        actionUrl: "/rate-delivery",
        actionText: "Оставить отзыв",
      },
      {
        id: 4,
        type: "update",
        title: "Новая сезонная коллекция",
        message:
          'Откройте для себя нашу новую коллекцию "Зимняя сказка", доступную для декабрьских доставок.',
        createdAt: "2024-10-07T16:45:00Z",
        read: true,
        actionUrl: "/collections/winter",
        actionText: "Изучить коллекцию",
      },
    ]);
  }, []);

  const handleSubscriptionManage = useCallback(
    (subscriptionId: string): void => {
      console.log("Managing subscription:", subscriptionId);
    },
    [],
  );

  const handleSubscriptionPause = useCallback(
    (subscriptionId: string): void => {
      console.log("Pausing subscription:", subscriptionId);
    },
    [],
  );

  const handleSubscriptionUpgrade = useCallback(
    (subscriptionId: string): void => {
      console.log("Upgrading subscription:", subscriptionId);
    },
    [],
  );

  const handleSkipDelivery = useCallback((deliveryId: string): void => {
    console.log("Skipping delivery:", deliveryId);
  }, []);

  const handleRescheduleDelivery = useCallback((deliveryId: string): void => {
    console.log("Rescheduling delivery:", deliveryId);
  }, []);

  const handleUpdatePreferences = useCallback(
    (newPreferences: UserPreferences): void => {
      setPreferences(newPreferences);
      console.log("Preferences updated:", newPreferences);
    },
    [],
  );

  const handleReorder = useCallback((delivery: DeliveryData): void => {
    console.log("Reordering:", delivery);
  }, []);

  const handleRateDelivery = useCallback((deliveryId: string): void => {
    console.log("Rating delivery:", deliveryId);
  }, []);

  const handleSharePhoto = useCallback((deliveryId: string): void => {
    console.log("Sharing photo for delivery:", deliveryId);
  }, []);

  const handleQuickAction = useCallback((actionId: string): void => {
    console.log("Quick action:", actionId);
  }, []);

  const handleMarkAsRead = useCallback((notificationId: number): void => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const handleMarkAllAsRead = useCallback((): void => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  return (
    <div className="">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-semibold text-foreground mb-2">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">
              Управляйте подпиской, настройками и историей доставок
            </p>
          </div>
          <Button variant="default" size="sm">
            <div className="flex items-center gap-2">
              <Icon name="Plus" size={16} />
              Добавить подарочную подписку
            </div>
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab: TabItem) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap hover:cursor-pointer
                      ${
                        activeTab === tab?.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                      }
                    `}
              >
                <Icon name={tab?.icon as AppIconProps["name"]} size={16} />
                <span>{tab?.name}</span>
                {tab?.id === "notifications" && unreadNotifications > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === "overview" && (
          <>
            <AccountOverview user={userData} stats={userStats as any} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <SubscriptionCard
                subscription={subscriptionData as any}
                onManage={handleSubscriptionManage}
                onPause={handleSubscriptionPause}
                onUpgrade={handleSubscriptionUpgrade}
              />
              <QuickActions onAction={handleQuickAction} />
            </div>
          </>
        )}

        {activeTab === "calendar" && (
          <DeliveryCalendar
            deliveries={deliveryData as any}
            onSkipDelivery={handleSkipDelivery}
            onReschedule={handleRescheduleDelivery}
          />
        )}

        {activeTab === "preferences" && (
          <PreferenceManager
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        )}

        {activeTab === "history" && (
          <DeliveryHistory
            deliveries={deliveryHistory as any}
            onReorder={handleReorder as any}
            onRate={handleRateDelivery}
            onSharePhoto={handleSharePhoto}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationCenter
            notifications={notifications as any}
            onMarkAsRead={handleMarkAsRead as any}
            onMarkAllAsRead={handleMarkAllAsRead as any}
          />
        )}
      </div>
    </div>
  );
}
