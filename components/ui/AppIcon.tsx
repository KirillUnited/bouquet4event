import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle, LucideProps } from "lucide-react";

export interface AppIconProps extends Omit<LucideProps, 'name'> {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

type LucideIconsType = {
  [K in keyof typeof LucideIcons]: LucideIcons.LucideProps;
};

function Icon({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}: AppIconProps) {
  const IconComponent = LucideIcons?.[name] as React.ComponentType<any>;

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
export default Icon;
