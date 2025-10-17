"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CameraIcon, EyeIcon, RotateCwIcon, Share2Icon, StarIcon, XIcon } from "lucide-react";

type DeliveryStatus = "delivered" | "skipped" | "cancelled" | "scheduled";

interface Delivery {
  id: string;
  date: string;
  bouquetName: string;
  bouquetImage: string;
  description?: string;
  status: DeliveryStatus;
  rating: number;
  rated?: boolean;
  feedback?: string;
  flowersIncluded?: string[];
  careInstructions?: boolean;
}

interface DeliveryHistoryProps {
  deliveries: Delivery[];
  onReorder: (delivery: Delivery) => void;
  onRate: (id: string) => void;
  onSharePhoto: (id: string) => void;
}

/**
 * Компонент "История доставок"
 * Отображает список прошлых доставок с фильтрацией, рейтингом и деталями.
 */
const DeliveryHistory: React.FC<DeliveryHistoryProps> = ({
  deliveries,
  onReorder,
  onRate,
  onSharePhoto,
}) => {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | DeliveryStatus>("all");

  /** Возвращает иконку и цвет статуса доставки */
  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case "delivered":
        return { name: "CheckCircle", color: "text-green-600" };
      case "skipped":
        return { name: "Clock", color: "text-yellow-600" };
      case "cancelled":
        return { name: "XCircle", color: "text-red-600" };
      default:
        return { name: "Package", color: "text-gray-600" };
    }
  };

  /** Фильтрация доставок по статусу */
  const filteredDeliveries = deliveries?.filter((delivery) => {
    if (filter === "all") return true;
    return delivery.status === filter;
  });

  /** Форматирование даты */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      {/* Заголовок и фильтр */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          История доставок
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 border border-border rounded-md text-sm bg-background text-foreground"
          >
            <option value="all">Все доставки</option>
            <option value="delivered">Доставлено</option>
            <option value="skipped">Пропущено</option>
            <option value="cancelled">Отменено</option>
          </select>
        </div>
      </div>

      {/* Список доставок */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredDeliveries?.map((delivery: Delivery) => {
          const statusIcon = getStatusIcon(delivery.status);

          return (
            <div
              key={delivery.id}
              className="border border-border rounded-lg p-4 hover:shadow-natural transition-natural"
            >
              <div className="flex items-start space-x-4">
                {/* Превью букета */}
                <div className="flex-shrink-0">
                  <Image
                    src={delivery.bouquetImage}
                    width={300}
                    height={300}
                    alt={delivery.bouquetName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        {delivery.bouquetName}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(delivery.date)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Icon
                          name={statusIcon.name as any}
                          size={16}
                          className={statusIcon.color}
                        />
                        <span
                          className={`text-sm font-medium ${statusIcon.color}`}
                        >
                          {delivery.status === "delivered"
                            ? "Доставлено"
                            : delivery.status === "skipped"
                              ? "Пропущено"
                              : delivery.status === "cancelled"
                                ? "Отменено"
                                : "Запланировано"}
                        </span>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex items-center space-x-2">
                      {delivery.status === "delivered" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onReorder(delivery)}
                          >
                            <div className="flex items-center gap-2">
                              <RotateCwIcon size={16} />
                              Повторить заказ
                            </div>
                          </Button>
                          {!delivery.rated && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRate(delivery.id)}
                            >
                              <div className="flex items-center gap-2">
                                <StarIcon size={16} />
                                Оценить
                              </div>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSharePhoto(delivery.id)}
                          >
                            <div className="flex items-center gap-2">
                              <Share2Icon size={16} />
                              Поделиться фото
                            </div>
                          </Button>
                        </>
                      )}
                      {delivery.status === "skipped" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSharePhoto(delivery.id)}
                          >
                            <div className="flex items-center gap-2">
                              <CameraIcon size={16} />
                              Поделиться фото
                            </div>
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDelivery(delivery)}
                      >
                        <div className="flex items-center gap-2">
                          <EyeIcon size={16} />
                          Подробнее
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Отображение рейтинга */}
                  {delivery.rating && (
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={
                            star <= delivery.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        Оценка {delivery.rating}/5
                      </span>
                    </div>
                  )}

                  {/* Отзыв */}
                  {delivery.feedback && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      «{delivery.feedback}»
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Нет доставок */}
      {filteredDeliveries?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Package"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="text-muted-foreground">
            Доставки не найдены для выбранного фильтра.
          </p>
        </div>
      )}

      {/* Модальное окно с деталями доставки */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-lg font-semibold text-foreground">
                Детали доставки
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDelivery(null)}
              >
                <XIcon size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              <Image
                src={selectedDelivery.bouquetImage}
                width={400}
                height={400}
                alt={selectedDelivery.bouquetName}
                className="w-full h-48 rounded-lg object-cover"
              />

              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {selectedDelivery.bouquetName}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedDelivery.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Дата доставки:</span>
                    <p className="font-medium text-foreground">
                      {formatDate(selectedDelivery.date)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Статус:</span>
                    <p className="font-medium text-foreground">
                      {selectedDelivery.status === "delivered"
                        ? "Доставлено"
                        : selectedDelivery.status === "skipped"
                          ? "Пропущено"
                          : selectedDelivery.status === "cancelled"
                            ? "Отменено"
                            : "Запланировано"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Цветы:</span>
                    <p className="font-medium text-foreground">
                      {selectedDelivery.flowersIncluded?.join(", ") ||
                        "Не указаны"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Инструкция по уходу:
                    </span>
                    <p className="font-medium text-foreground">
                      {selectedDelivery.careInstructions
                        ? "Есть"
                        : "Отсутствует"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;
