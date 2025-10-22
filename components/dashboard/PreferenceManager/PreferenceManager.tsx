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

export const PreferenceManager: React.FC<PreferenceManagerProps> = ({
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
  );
};
