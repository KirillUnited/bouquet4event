import React, { useState, useCallback, ChangeEvent } from "react";
import Icon from "@/components/ui/AppIcon";
import {Button} from "@/components/ui/button";
import Input from "@/components/dashboard/ui/Input";
import CheckboxLabel from "@/components/dashboard/ui/Checkbox";
import type { PreferenceManagerProps, UserPreferences } from "@/types/dashboard";
import {
  accountStatusOptions,
  bouquetCategoryOptions,
  colorOptions,
  deliveryIntervalOptions,
  flowerTypes,
} from "@/components/dashboard/mock-data";
import { CheckIcon, EditIcon } from "lucide-react";
import StudioSelect from "./ui/StudioSelect";
import InputLabel from "@/components/dashboard/ui/Input";

const PreferenceManager: React.FC<PreferenceManagerProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = useCallback((): void => {
    onUpdatePreferences(localPreferences);
    setIsEditing(false);
  }, [localPreferences, onUpdatePreferences]);

  const handleCancel = useCallback((): void => {
    setLocalPreferences(preferences);
    setIsEditing(false);
  }, [preferences]);

  const updatePreference = useCallback(
    <K extends keyof UserPreferences>(
      key: K,
      value: UserPreferences[K]
    ): void => {
      setLocalPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const toggleFlowerType = useCallback(
    (flowerType: string): void => {
      const currentTypes = localPreferences.favoriteFlowers;
      const updatedTypes = currentTypes.includes(flowerType)
        ? currentTypes.filter((type) => type !== flowerType)
        : [...currentTypes, flowerType];

      updatePreference("favoriteFlowers", updatedTypes);
    },
    [localPreferences.favoriteFlowers, updatePreference]
  );

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
            onClick={() => setIsEditing(true)}
          >
            <div className="flex items-center gap-2">
              <EditIcon size={16} />
              Редактировать настройки
            </div>
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Отмена
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
            >
              <div className="flex items-center gap-2">
                <CheckIcon size={16} />
                Сохранить изменения
              </div>
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
                key={option.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-natural
                  ${
                    localPreferences.colorPalette === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }
                  ${!isEditing ? "cursor-default" : ""}
                `}
                onClick={() =>
                  isEditing && updatePreference("colorPalette", option.id)
                }
                role="button"
                tabIndex={isEditing ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isEditing) {
                    updatePreference("colorPalette", option.id);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {option.name}
                  </span>
                  {localPreferences.colorPalette === option.id && (
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
            {flowerTypes?.map((flower: string) => (
              <CheckboxLabel
                key={flower}
                label={flower as any}
                checked={localPreferences.favoriteFlowers.includes(flower)}
                onChange={() => isEditing && toggleFlowerType(flower)}
                disabled={!isEditing}
                id={`flower-${flower.toLowerCase().replace(/\s+/g, '-')}`}
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
            <StudioSelect
              label="Категория букета"
              options={bouquetCategoryOptions}
              value={localPreferences?.bouquetCategory || ""}
              onValueChange={(value) => updatePreference("bouquetCategory", value)}
              placeholder="Выберите категорию"
              disabled={!isEditing}
            />

            <StudioSelect
              label="Интервал доставки"
              options={deliveryIntervalOptions}
              value={localPreferences?.deliveryInterval || ""}
              onValueChange={(value) => updatePreference("deliveryInterval", value)}
              placeholder="Выберите интервал"
              disabled={!isEditing}
            />

            <InputLabel
              label="Дата доставки"
              type="date"
              value={localPreferences?.deliveryDate || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePreference("deliveryDate", e?.target?.value)
              }
              disabled={!isEditing}
            />
            

            <StudioSelect
              label="Статус аккаунта"
              options={accountStatusOptions}
              value={localPreferences?.accountStatus || ""}
              onValueChange={(value) => updatePreference("accountStatus", value)}
              placeholder="Выберите статус"
              disabled={!isEditing}
            />

            <InputLabel
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={localPreferences?.email || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatePreference("email", e?.target?.value)}
              disabled={!isEditing}
            />

            <InputLabel
              label="Реферальная ссылка"
              type="text"
              placeholder="https://bouquet4event.ru/ref/..."
              value={localPreferences?.referralLink || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePreference("referralLink", e?.target?.value)
              }
              disabled={!isEditing}
            />
          </div>

          <div className="mt-4">
            <InputLabel
              label="Адрес доставки"
              type="text"
              placeholder="Улица, дом, квартира, город, индекс"
              value={localPreferences?.deliveryAddress || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
              <CheckboxLabel
                label="Отправлять уведомления о доставке по SMS"
                checked={localPreferences?.smsNotifications || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updatePreference("smsNotifications", e?.target?.checked)
                }
                disabled={!isEditing}
              />
              <CheckboxLabel
                label="Включать инструкции по уходу с каждой доставкой"
                checked={localPreferences?.includeCareInstructions || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updatePreference(
                    "includeCareInstructions",
                    e?.target?.checked,
                  )
                }
                disabled={!isEditing}
              />
              <CheckboxLabel
                label="Удивлять меня сезонными сортами"
                checked={localPreferences?.seasonalSurprises || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
          <InputLabel
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
