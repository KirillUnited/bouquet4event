"use client";

import AccountOverview from "@/components/dashboard/AccountOverview";
import { useState, useEffect } from "react";
import Button from "@/components/dashboard/ui/Button";
import Icon from "@/components/ui/AppIcon";
import SubscriptionCard from "@/components/dashboard/SubscriptionCard";
import QuickActions from "@/components/dashboard/QuickActions";
import DeliveryCalendar from "@/components/dashboard/DeliveryCalendar";
import PreferenceManager from "@/components/dashboard/PreferenceManager";
import DeliveryHistory from "@/components/dashboard/DeliveryHistory";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import {
  deliveryData,
  deliveryHistory,
  subscriptionData,
  tabs,
  userStats,
} from "@/components/dashboard/mock-data";

export default function AccountDashboard({ userData }: { userData: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([]);

  // Mock preferences data - Russian translations
  const [preferences, setPreferences] = useState({
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
    referralLink: "https://bloombox.ru/ref/anna_ivanova",
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

  const handleSubscriptionManage = (subscriptionId) => {
    console.log("Managing subscription:", subscriptionId);
  };

  const handleSubscriptionPause = (subscriptionId) => {
    console.log("Pausing subscription:", subscriptionId);
  };

  const handleSubscriptionUpgrade = (subscriptionId) => {
    console.log("Upgrading subscription:", subscriptionId);
  };

  const handleSkipDelivery = (deliveryId) => {
    console.log("Skipping delivery:", deliveryId);
  };

  const handleRescheduleDelivery = (deliveryId) => {
    console.log("Rescheduling delivery:", deliveryId);
  };

  const handleUpdatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    console.log("Preferences updated:", newPreferences);
  };

  const handleReorder = (delivery) => {
    console.log("Reordering:", delivery);
  };

  const handleRateDelivery = (deliveryId) => {
    console.log("Rating delivery:", deliveryId);
  };

  const handleSharePhoto = (deliveryId) => {
    console.log("Sharing photo for delivery:", deliveryId);
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action:", actionId);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev?.map((notification) =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev?.map((notification) => ({ ...notification, read: true })),
    );
  };

  const unreadNotifications = notifications?.filter((n) => !n?.read)?.length;
  return (
    <div className="">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-semibold text-foreground mb-2">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">
              Управляйте подпиской, настройками и историей доставок
            </p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            className="bg-conversion text-conversion-foreground hover:bg-conversion/90"
          >
            Добавить подарочную подписку
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${
                        activeTab === tab?.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                      }
                    `}
              >
                <Icon name={tab?.icon} size={16} />
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
            <AccountOverview user={userData} stats={userStats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SubscriptionCard
                subscription={subscriptionData}
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
            deliveries={deliveryData}
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
            deliveries={deliveryHistory}
            onReorder={handleReorder}
            onRate={handleRateDelivery}
            onSharePhoto={handleSharePhoto}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )}
      </div>
    </div>
  );
}
