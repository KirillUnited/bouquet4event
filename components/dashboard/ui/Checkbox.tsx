import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckboxProps, CheckedState } from "@radix-ui/react-checkbox";

type CheckboxOnChange = (checked: CheckedState) => void; 

export interface CheckboxLabelProps {
  id?: string;
  label?: string;
  onChange: CheckboxOnChange;
}

const CheckboxLabel = ({
  id,
  label,
  disabled = false,
  checked = false,
  onChange,
  ...props
}: CheckboxLabelProps & CheckboxProps) => {
  const checkBoxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={checkBoxId}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onChange}
        {...props}
      />
      {label && <Label htmlFor={checkBoxId}>{label}</Label>}
    </div>
  );
};

export default CheckboxLabel;
