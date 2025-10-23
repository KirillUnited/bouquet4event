import React, { useState, useCallback, ChangeEvent } from "react";
import Icon from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/button";
import Input from "@/components/dashboard/ui/Input";
import CheckboxLabel from "@/components/dashboard/ui/Checkbox";
import type {
  PreferenceManagerProps,
  UserPreferences,
} from "@/types/dashboard";
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
import { Card } from "../ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PreferenceManager: React.FC<PreferenceManagerProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const [localPreferences, setLocalPreferences] =
    useState<UserPreferences>(preferences);
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
      value: UserPreferences[K],
    ): void => {
      setLocalPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const toggleFlowerType = useCallback(
    (flowerType: string): void => {
      const currentTypes = localPreferences?.favoriteFlowers || [];
      const updatedTypes = currentTypes?.includes(flowerType)
        ? currentTypes.filter((type) => type !== flowerType)
        : [...currentTypes, flowerType];

      updatePreference("favoriteFlowers", updatedTypes);
    },
    [localPreferences.favoriteFlowers, updatePreference],
  );

  console.log(localPreferences);

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap justify-between mb-6">
        <h3 className="font-semibold text-foreground">
          Настройки предпочтений
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
            <Button variant="default" size="sm" onClick={handleSave}>
              <div className="flex items-center gap-2">
                <EditIcon size={16} />
                Редактировать настройки
              </div>
            </Button>
          </div>
        )}
      </div>

      {/* Color Preferences */}
      <Card className="flex flex-col gap-3 p-4 md:p-6 shadow-natural">
        <div className="md:space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">
              Цветовая палитра
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {colorOptions?.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "p-3 rounded-lg border transition-natural",
                    localPreferences.colorPalette === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                    !isEditing
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer",
                  )}
                  onClick={() =>
                    isEditing && updatePreference("colorPalette", option.id)
                  }
                  role="button"
                  tabIndex={isEditing ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isEditing) {
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

          <Separator className="my-4" />

          {/* Flower Types */}
          <div>
            <h4 className="font-medium text-foreground mb-3">
              Любимые типы цветов
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {flowerTypes?.map((flower: string) => {
                const id = `flower-${flower.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <CheckboxLabel
                    id={id}
                    key={flower}
                    label={flower as any}
                    checked={localPreferences.favoriteFlowers.includes(flower)}
                    onChange={() => {
                      isEditing && toggleFlowerType(flower);
                    }}
                    disabled={!isEditing}
                  />
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />

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
                onValueChange={(value) =>
                  updatePreference("bouquetCategory", value)
                }
                placeholder="Выберите категорию"
                disabled={!isEditing}
              />

              <InputLabel
                label="Пожелания к букету"
                type="text"
                placeholder="Опишите ваши пожелания к букету (цвета, размер, особые требования и т.д.)"
                value={localPreferences?.bouquetWishes || ""}
                onChange={(e) =>
                  updatePreference("bouquetWishes", e?.target?.value)
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          <Separator className="my-4" />

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
      </Card>

      {/* Delivery Preferences */}
      <Card className="flex flex-col gap-3 p-4 md:p-6 shadow-natural">
        <h4 className="font-medium text-foreground mb-3">Настройки доставки</h4>
        <div className="md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <StudioSelect
              label="Интервал доставки"
              options={deliveryIntervalOptions}
              value={localPreferences?.deliveryInterval || ""}
              onValueChange={(value) =>
                updatePreference("deliveryInterval", value)
              }
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

          <Separator className="my-4" />

          <div className="space-y-3">
            <CheckboxLabel
              label="Отправлять уведомления о доставке по SMS"
              checked={localPreferences?.smsNotifications || false}
              onChange={(checked) =>
                updatePreference("smsNotifications", checked as boolean)
              }
              disabled={!isEditing}
            />
            <CheckboxLabel
              label="Включать инструкции по уходу с каждой доставкой"
              checked={localPreferences?.includeCareInstructions || false}
              onChange={(checked) =>
                updatePreference("includeCareInstructions", checked as boolean)
              }
              disabled={!isEditing}
            />
            <CheckboxLabel
              label="Удивлять меня сезонными сортами"
              checked={localPreferences?.seasonalSurprises || false}
              onChange={(checked) =>
                updatePreference("seasonalSurprises", checked as boolean)
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>

      {/* Account settings */}
      <Card className="flex flex-col gap-3 p-4 md:p-6 shadow-natural">
        <h4 className="font-medium text-foreground">Настройки аккаунта</h4>
        <p className="text-sm text-muted-foreground">
          Вы вошли как {localPreferences?.email || "неизвестный пользователь"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputLabel
            label="Имя пользователя"
            type="text"
            placeholder="Ваше имя"
            value={localPreferences?.username || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updatePreference("username", e?.target?.value)
            }
            disabled={!isEditing}
          />

          <InputLabel
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={localPreferences?.email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updatePreference("email", e?.target?.value)
            }
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

          <StudioSelect
            label="Статус аккаунта"
            options={accountStatusOptions}
            value={localPreferences?.accountStatus || ""}
            onValueChange={(value) => updatePreference("accountStatus", value)}
            placeholder="Выберите статус"
            disabled={!isEditing}
          />

          {/*<InputLabel*/}
          {/*  label={"Текущий пароль"}*/}
          {/*  type="password"*/}
          {/*  value={}*/}
          {/*  onChange={() => console.log("Текущий пароль:")}*/}
          {/*  disabled={!isEditing}*/}
          {/*/>*/}

          {/*<InputLabel*/}
          {/*  label={"Новый пароль"}*/}
          {/*  type="password"*/}
          {/*  value={}*/}
          {/*  onChange={() => console.log("Новый пароль изменен")}*/}
          {/*  disabled={!isEditing}*/}
          {/*/>*/}
        </div>
      </Card>
    </>
  );
};

export default PreferenceManager;
