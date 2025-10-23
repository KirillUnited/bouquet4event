import React from "react";
import { usePreferenceManager } from "./Manager";
import { colorOptions } from "@/components/dashboard/mock-data";
import Icon from "@/components/ui/AppIcon";
import { cn } from "@/lib/utils";
import { PreferenceBlockProps } from "@/types/dashboard";

interface ColorPaletteProps extends PreferenceBlockProps {}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  title = "Цветовая палитра",
}: ColorPaletteProps) => {
  const { localPreferences, isEditing, updatePreference } =
    usePreferenceManager();
  return (
    <div className="flex flex-col gap-3">
      {title && <h4 className="font-medium text-foreground mb-3">{title}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {colorOptions?.map((option) => (
          <div
            key={option.id}
            className={cn(
              "p-3 rounded-lg border transition",
              localPreferences.colorPalette === option.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50",
              !isEditing ? "cursor-not-allowed opacity-50" : "cursor-pointer",
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
              <span className="font-medium text-foreground">{option.name}</span>
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
  );
};

export default ColorPalette;
