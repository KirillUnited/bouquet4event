import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type {
  PreferenceManagerProps,
  UserPreferences,
} from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon } from "lucide-react";

interface PreferenceManagerContextValue {
  localPreferences: UserPreferences;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => void;
  toggleFlowerType: (flowerType: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const PreferenceManagerContext = createContext<
  PreferenceManagerContextValue | undefined
>(undefined);

export const usePreferenceManager = () => {
  const ctx = useContext(PreferenceManagerContext);
  if (!ctx)
    throw new Error(
      "usePreferenceManager must be used within <PreferenceManager>",
    );
  return ctx;
};

export const PrefManager: React.FC<PreferenceManagerProps> = ({
  preferences,
  onUpdatePreferences,
  children,
}) => {
  const [localPreferences, setLocalPreferences] =
    useState<UserPreferences>(preferences);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    onUpdatePreferences(localPreferences);
    setIsEditing(false);
  }, [localPreferences, onUpdatePreferences]);

  const handleCancel = useCallback(() => {
    setLocalPreferences(preferences);
    setIsEditing(false);
  }, [preferences]);

  const updatePreference = useCallback(
    <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      setLocalPreferences((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleFlowerType = useCallback(
    (flowerType: string) => {
      const currentTypes = localPreferences?.favoriteFlowers || [];
      const updatedTypes = currentTypes.includes(flowerType)
        ? currentTypes.filter((type) => type !== flowerType)
        : [...currentTypes, flowerType];
      updatePreference("favoriteFlowers", updatedTypes);
    },
    [localPreferences.favoriteFlowers, updatePreference],
  );

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap justify-between mb-6">
        <h3 className="font-semibold text-foreground">Настройки профиля</h3>
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
                <CheckIcon size={16} />
                Сохранить изменения
              </div>
            </Button>
          </div>
        )}
      </div>
      <PreferenceManagerContext.Provider
        value={{
          localPreferences,
          isEditing,
          setIsEditing,
          updatePreference,
          toggleFlowerType,
          handleSave,
          handleCancel,
        }}
      >
        {children}
      </PreferenceManagerContext.Provider>
    </>
  );
};
