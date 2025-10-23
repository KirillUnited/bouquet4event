import React, { ChangeEvent } from "react";
import { usePreferenceManager } from "./Manager";
import StudioSelect from "../ui/StudioSelect";
import InputLabel from "../ui/Input";
import { accountStatusOptions } from "@/components/dashboard/mock-data";
import { PreferenceBlockProps } from "@/types/dashboard";
import { Card } from "@/components/ui/card";

interface AccountProps extends PreferenceBlockProps {}

const Account: React.FC<AccountProps> = ({ title }: AccountProps) => {
  const { localPreferences, isEditing, updatePreference } =
    usePreferenceManager();
  return (
    <Card className="flex flex-col gap-3 p-4 md:p-6 shadow-natural">
      {title && <h4 className="font-medium text-foreground">{title}</h4>}
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
      </div>
    </Card>
  );
};

export default Account;
