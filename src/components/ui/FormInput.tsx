'use client';

import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FormInputProps = {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  label,
  error,
  registration,
  ...props
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...registration}
        {...props}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
