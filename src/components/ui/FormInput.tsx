import { UseFormRegisterReturn } from 'react-hook-form';

import Input from '@/components/ui/common/Input';
import Label from '@/components/ui/common/Label';

interface FormInputProps {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  rightIcon?: React.ReactNode;
}

export default function FormInput({
  label,
  type = 'text',
  registration,
  error,
  rightIcon,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <Label className="block mb-1">{label}</Label>
      <Input
        type={type}
        {...registration} // тут деструктурируются name, ref, onChange и тд
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        rightIcon={rightIcon}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
