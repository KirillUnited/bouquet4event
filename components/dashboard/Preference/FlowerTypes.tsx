import React from "react";
import { usePreferenceManager } from "./Manager";
import { flowerTypes } from "@/components/dashboard/mock-data";
import CheckboxLabel from "@/components/dashboard/ui/Checkbox";
import { PreferenceBlockProps } from "@/types/dashboard";

interface FlowerTypesProps extends PreferenceBlockProps {}

const FlowerTypes: React.FC<FlowerTypesProps> = ({
  title,
}: FlowerTypesProps) => {
  const { localPreferences, isEditing, toggleFlowerType } =
    usePreferenceManager();
  return (
    <div>
      {title && <h4 className="font-medium text-foreground mb-3">{title}</h4>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {flowerTypes?.map((flower: string) => {
          const id = `flower-${flower.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <CheckboxLabel
              id={id}
              key={flower}
              label={flower}
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
  );
};

export default FlowerTypes;
