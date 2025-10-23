import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputLabelProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

const InputLabel = ({
  label,
  type,
  value,
  onChange,
  disabled,
  placeholder,
  description,
}: InputLabelProps) => {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="max-w-full"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default InputLabel;
