import { useId } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export interface CheckboxLabelProps {
  id?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxLabel = ({ id: customId, label, disabled, checked, onChange }: CheckboxLabelProps) => {
  const id = customId || useId()

  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} disabled={disabled} checked={checked} onChange={(e) => onChange?.(e as any)} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  )
}

export default CheckboxLabel
