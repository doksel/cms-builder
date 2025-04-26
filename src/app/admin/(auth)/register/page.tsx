'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { URL_LOGIN } from '@/constants/path';
import { registerSchema } from '@/utils/validation';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error('Ошибка регистрации', {
        description: error.message,
      });
    } else {
      toast.success('Успешно!', {
        description: 'Теперь вы можете войти.',
      });
      router.push(URL_LOGIN);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md relative"
      >
        <h1 className="text-2xl font-bold mb-4">Регистрация</h1>

        <FormInput
          label="Email"
          type="email"
          registration={register('email')}
          error={errors.email?.message}
        />

        <FormInput
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          registration={register('password')}
          error={errors.password?.message}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        <FormInput
          label="Повтор пароля"
          type={showConfirmPassword ? 'text' : 'password'}
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        <Button type="submit" className="w-full mt-4" loading={isSubmitting}>
          Зарегистрироваться
        </Button>

        <div className="text-sm text-center mt-4">
          Уже есть аккаунт?{' '}
          <Link href={URL_LOGIN} className="text-indigo-900 hover:underline">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
