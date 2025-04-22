import Label from '@/components/ui/common/Label';
import Textarea from '@/components/ui/common/Textarea';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function FormTextarea({
  label,
  registration,
  error,
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      <Label className="block mb-1">{label}</Label>
      <Textarea
        {...registration}
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
