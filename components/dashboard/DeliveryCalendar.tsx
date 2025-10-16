import React, { useState } from "react";

import Button from "@/components/dashboard/ui/Button";

const DeliveryCalendar = ({ deliveries, onSkipDelivery, onReschedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(day);
    }

    return days;
  };

  const getDeliveryForDate = (day) => {
    if (!day) return null;

    const dateString = `${currentMonth?.getFullYear()}-${String(currentMonth?.getMonth() + 1)?.padStart(2, "0")}-${String(day)?.padStart(2, "0")}`;
    return deliveries?.find((delivery) =>
      delivery?.date?.startsWith(dateString),
    );
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today?.getDate() &&
      currentMonth?.getMonth() === today?.getMonth() &&
      currentMonth?.getFullYear() === today?.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Delivery Calendar
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          />
          <span className="font-medium text-foreground min-w-[140px] text-center">
            {monthNames?.[currentMonth?.getMonth()]}{" "}
            {currentMonth?.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays?.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days?.map((day, index) => {
          const delivery = getDeliveryForDate(day);
          const today = isToday(day);

          return (
            <div
              key={index}
              className={`
                relative p-2 h-12 flex items-center justify-center text-sm
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
                        className={`
                        w-3 h-3 rounded-full
                        ${delivery?.status === "scheduled" ? "bg-blue-500" : ""}
                        ${delivery?.status === "delivered" ? "bg-green-500" : ""}
                        ${delivery?.status === "skipped" ? "bg-yellow-500" : ""}
                        ${delivery?.status === "cancelled" ? "bg-red-500" : ""}
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
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-foreground">Upcoming Deliveries</h4>
        {deliveries
          ?.filter((delivery) => new Date(delivery.date) >= new Date())
          ?.slice(0, 3)
          ?.map((delivery) => (
            <div
              key={delivery?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`
                  w-3 h-3 rounded-full
                  ${delivery?.status === "scheduled" ? "bg-blue-500" : ""}
                  ${delivery?.status === "delivered" ? "bg-green-500" : ""}
                  ${delivery?.status === "skipped" ? "bg-yellow-500" : ""}
                `}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {delivery?.bouquetName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(delivery.date)?.toLocaleDateString("en-US", {
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
                  iconName="Calendar"
                  onClick={() => onReschedule(delivery?.id)}
                >
                  Reschedule
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => onSkipDelivery(delivery?.id)}
                >
                  Skip
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryCalendar;
