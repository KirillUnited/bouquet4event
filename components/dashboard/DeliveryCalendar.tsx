"use client";

import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

type DeliveryStatus = "scheduled" | "delivered" | "skipped" | "cancelled";

type Delivery = {
  id: string;
  date: string; // ISO формат: YYYY-MM-DD
  bouquetName: string;
  status: DeliveryStatus;
};

interface DeliveryCalendarProps {
  deliveries: Delivery[];
  onSkipDelivery: (id: string) => void;
  onReschedule: (id: string) => void;
}

/**
 * Компонент календаря доставок.
 * Отображает календарь с отмеченными доставками и список ближайших.
 */
const DeliveryCalendar: React.FC<DeliveryCalendarProps> = ({
  deliveries,
  onSkipDelivery,
  onReschedule,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ] as const;

  /** Возвращает массив дней месяца с пустыми ячейками для выравнивания сетки */
  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Добавляем пустые ячейки перед первым днём месяца
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Добавляем все дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  /** Возвращает доставку, если она существует для указанного дня */
  const getDeliveryForDate = (day: number | null): Delivery | null => {
    if (!day) return null;
    const dateString = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return (
      deliveries.find((delivery) => delivery.date.startsWith(dateString)) ??
      null
    );
  };

  /** Переключение месяца вперёд или назад */
  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  /** Проверяет, является ли день сегодняшним */
  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] as const;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Календарь доставок
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span className="font-medium text-foreground min-w-[140px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Дни месяца */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const delivery = getDeliveryForDate(day);
          const today = isToday(day);

          return (
            <div
              key={index}
              className={`relative p-2 h-12 flex items-center justify-center text-sm
                ${day ? "hover:bg-muted cursor-pointer" : ""}
                ${today ? "bg-primary text-primary-foreground rounded-md" : ""}
                ${delivery ? "bg-accent/20 border border-accent rounded-md" : ""}
              `}
            >
              {day && (
                <>
                  <span className={today ? "font-semibold" : ""}>{day}</span>
                  {delivery && (
                    <div className="absolute -top-1 -right-1">
                      <div
                        className={`w-3 h-3 rounded-full
                          ${delivery.status === "scheduled" ? "bg-blue-500" : ""}
                          ${delivery.status === "delivered" ? "bg-green-500" : ""}
                          ${delivery.status === "skipped" ? "bg-yellow-500" : ""}
                          ${delivery.status === "cancelled" ? "bg-red-500" : ""}
                        `}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Список ближайших доставок */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-foreground text-base">Ближайшие доставки</h4>
        {deliveries
          .filter((delivery) => new Date(delivery.date) >= new Date())
          .slice(0, 3)
          .map((delivery) => (
            <div
              key={delivery.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full
                    ${delivery.status === "scheduled" ? "bg-blue-500" : ""}
                    ${delivery.status === "delivered" ? "bg-green-500" : ""}
                    ${delivery.status === "skipped" ? "bg-yellow-500" : ""}
                  `}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {delivery.bouquetName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(delivery.date).toLocaleDateString("ru-RU", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReschedule(delivery.id)}
                >
                  <CalendarIcon size={16} />
                  Перенести
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSkipDelivery(delivery.id)}
                >
                  <XIcon size={16} />
                  Пропустить
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryCalendar;
