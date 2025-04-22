import Label from '@/components/ui/common/Label';
import Select from '@/components/ui/common/Select';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormSelectProps {
  label: string;
  options: { label: string; value: string }[];
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function FormSelect({
  label,
  options,
  registration,
  error,
}: FormSelectProps) {
  return (
    <div className="mb-4">
      <Label className="block mb-1">{label}</Label>
      <Select
        {...registration}
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      >
        <option value="">Выбери значение</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
