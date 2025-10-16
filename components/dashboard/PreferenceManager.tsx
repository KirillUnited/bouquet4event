import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import Button from "@/components/dashboard/ui/Button";
import Input from "@/components/dashboard/ui/Input";
import Select from "@/components/dashboard/ui/Select";
import { Checkbox } from "@/components/dashboard/ui/Checkbox";

const PreferenceManager = ({ preferences, onUpdatePreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isEditing, setIsEditing] = useState(false);

  const colorOptions = [
    {
      id: "warm",
      name: "Теплые тона",
      colors: ["#FF6B35", "#D4A574", "#C4A484"],
    },
    {
      id: "cool",
      name: "Холодные тона",
      colors: ["#7A8471", "#6B8CAE", "#8B7FB8"],
    },
    {
      id: "neutral",
      name: "Нейтральные тона",
      colors: ["#E8DDD4", "#F5F2EE", "#C8C3BE"],
    },
    {
      id: "vibrant",
      name: "Яркие цвета",
      colors: ["#FF6B35", "#D4AF37", "#B85C57"],
    },
  ];

  const flowerTypes = [
    "Розы",
    "Пионы",
    "Тюльпаны",
    "Лилии",
    "Подсолнухи",
    "Гортензии",
    "Эвкалипт",
    "Гипсофила",
    "Хризантемы",
    "Нарциссы",
  ];

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

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPreferences(preferences);
    setIsEditing(false);
  };

  const updatePreference = (key, value) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFlowerType = (flowerType) => {
    const currentTypes = localPreferences?.favoriteFlowers || [];
    const updatedTypes = currentTypes?.includes(flowerType)
      ? currentTypes?.filter((type) => type !== flowerType)
      : [...currentTypes, flowerType];

    updatePreference("favoriteFlowers", updatedTypes);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Настройки цветов
        </h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Редактировать настройки
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Отмена
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Check"
              onClick={handleSave}
            >
              Сохранить изменения
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Color Preferences */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            Предпочитаемая цветовая палитра
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {colorOptions?.map((option) => (
              <div
                key={option?.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-natural
                  ${
                    localPreferences?.colorPalette === option?.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }
                  ${!isEditing ? "cursor-default" : ""}
                `}
                onClick={() =>
                  isEditing && updatePreference("colorPalette", option?.id)
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {option?.name}
                  </span>
                  {localPreferences?.colorPalette === option?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                <div className="flex space-x-2">
                  {option?.colors?.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flower Types */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            Любимые типы цветов
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flowerTypes?.map((flower) => (
              <Checkbox
                key={flower}
                label={flower}
                checked={(localPreferences?.favoriteFlowers || [])?.includes(
                  flower,
                )}
                onChange={() => isEditing && toggleFlowerType(flower)}
                disabled={!isEditing}
              />
            ))}
          </div>
        </div>

        {/* Bouquet Information */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            Информация о букете
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Категория букета"
              options={bouquetCategoryOptions}
              value={localPreferences?.bouquetCategory || ""}
              onChange={(value) => updatePreference("bouquetCategory", value)}
              placeholder="Выберите категорию"
              disabled={!isEditing}
            />

            <Select
              label="Интервал доставки"
              options={deliveryIntervalOptions}
              value={localPreferences?.deliveryInterval || ""}
              onChange={(value) => updatePreference("deliveryInterval", value)}
              placeholder="Выберите интервал"
              disabled={!isEditing}
            />

            <Input
              label="Дата доставки"
              type="date"
              value={localPreferences?.deliveryDate || ""}
              onChange={(e) =>
                updatePreference("deliveryDate", e?.target?.value)
              }
              disabled={!isEditing}
            />

            <Select
              label="Статус аккаунта"
              options={accountStatusOptions}
              value={localPreferences?.accountStatus || ""}
              onChange={(value) => updatePreference("accountStatus", value)}
              placeholder="Выберите статус"
              disabled={!isEditing}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={localPreferences?.email || ""}
              onChange={(e) => updatePreference("email", e?.target?.value)}
              disabled={!isEditing}
            />

            <Input
              label="Реферальная ссылка"
              type="text"
              placeholder="https://bouquet4event.ru/ref/..."
              value={localPreferences?.referralLink || ""}
              onChange={(e) =>
                updatePreference("referralLink", e?.target?.value)
              }
              disabled={!isEditing}
            />
          </div>

          <div className="mt-4">
            <Input
              label="Адрес доставки"
              type="text"
              placeholder="Улица, дом, квартира, город, индекс"
              value={localPreferences?.deliveryAddress || ""}
              onChange={(e) =>
                updatePreference("deliveryAddress", e?.target?.value)
              }
              disabled={!isEditing}
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Пожелания к букету
            </label>
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Опишите ваши пожелания к букету (цвета, размер, особые требования и т.д.)"
              value={localPreferences?.bouquetWishes || ""}
              onChange={(e) =>
                updatePreference("bouquetWishes", e?.target?.value)
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Delivery Preferences */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            Настройки доставки
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Предпочитаемое время доставки"
                type="time"
                value={localPreferences?.deliveryTime || ""}
                onChange={(e) =>
                  updatePreference("deliveryTime", e?.target?.value)
                }
                disabled={!isEditing}
              />
              <Input
                label="Особые инструкции"
                type="text"
                placeholder="например, Оставить у двери"
                value={localPreferences?.specialInstructions || ""}
                onChange={(e) =>
                  updatePreference("specialInstructions", e?.target?.value)
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Отправлять уведомления о доставке по SMS"
                checked={localPreferences?.smsNotifications || false}
                onChange={(e) =>
                  updatePreference("smsNotifications", e?.target?.checked)
                }
                disabled={!isEditing}
              />
              <Checkbox
                label="Включать инструкции по уходу с каждой доставкой"
                checked={localPreferences?.includeCareInstructions || false}
                onChange={(e) =>
                  updatePreference(
                    "includeCareInstructions",
                    e?.target?.checked,
                  )
                }
                disabled={!isEditing}
              />
              <Checkbox
                label="Удивлять меня сезонными сортами"
                checked={localPreferences?.seasonalSurprises || false}
                onChange={(e) =>
                  updatePreference("seasonalSurprises", e?.target?.checked)
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Allergies & Restrictions */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            Аллергии и ограничения
          </h4>
          <Input
            label="Аллергия на цветы"
            type="text"
            placeholder="Перечислите цветы, которых следует избегать"
            description="Помогите нам убедиться, что ваши композиции безопасны и приятны"
            value={localPreferences?.allergies || ""}
            onChange={(e) => updatePreference("allergies", e?.target?.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferenceManager;
