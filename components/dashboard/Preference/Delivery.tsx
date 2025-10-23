import React, { ChangeEvent } from "react";
import { usePreferenceManager } from "./Manager";
import StudioSelect from "../ui/StudioSelect";
import InputLabel from "../ui/Input";
import CheckboxLabel from "../ui/Checkbox";
import { deliveryIntervalOptions } from "@/components/dashboard/mock-data";
import { PreferenceBlockProps } from "@/types/dashboard";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface DeliveryProps extends PreferenceBlockProps {}

const Delivery: React.FC<DeliveryProps> = ({ title }: DeliveryProps) => {
  const { localPreferences, isEditing, updatePreference } =
    usePreferenceManager();
  return (
    <Card className="flex flex-col gap-3 p-4 md:p-6 shadow-natural">
      {title && <h4 className="font-medium text-foreground mb-3">{title}</h4>}
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
        <InputLabel
          label="Предпочитаемое время доставки"
          type="time"
          value={localPreferences?.deliveryTime || ""}
          onChange={(e) => updatePreference("deliveryTime", e?.target?.value)}
          disabled={!isEditing}
        />
        <InputLabel
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
    </Card>
  );
};

export default Delivery;
