import React from "react";
import { usePreferenceManager } from "./Manager";
import InputLabel from "../ui/Input";

const Allergies: React.FC = () => {
  const { localPreferences, isEditing, updatePreference } =
    usePreferenceManager();
  return (
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
  );
};

export default Allergies;
