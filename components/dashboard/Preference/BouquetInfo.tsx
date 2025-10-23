import React from "react";
import { usePreferenceManager } from "./Manager";
import StudioSelect from "../ui/StudioSelect";
import InputLabel from "../ui/Input";
import { bouquetCategoryOptions } from "@/components/dashboard/mock-data";
import { PreferenceBlockProps } from "@/types/dashboard";

interface BouquetInfoProps extends PreferenceBlockProps {}

const BouquetInfo: React.FC<BouquetInfoProps> = ({
  title,
}: BouquetInfoProps) => {
  const { localPreferences, isEditing, updatePreference } =
    usePreferenceManager();
  return (
    <div>
      {title && <h4 className="font-medium text-foreground mb-3">{title}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudioSelect
          label="Категория букета"
          options={bouquetCategoryOptions}
          value={localPreferences?.bouquetCategory || ""}
          onValueChange={(value) => updatePreference("bouquetCategory", value)}
          placeholder="Выберите категорию"
          disabled={!isEditing}
        />
        <InputLabel
          label="Пожелания к букету"
          type="text"
          placeholder="Опишите ваши пожелания к букету (цвета, размер, особые требования и т.д.)"
          value={localPreferences?.bouquetWishes || ""}
          onChange={(e) => updatePreference("bouquetWishes", e?.target?.value)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default BouquetInfo;
