'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

import { loginSchema } from '@/utils/validation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { URL_ADMIN, URL_REGISTER } from '@/constants/path';

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: data.email,
    //   password: data.password,
    // });

    // if (error) {
    //   toast.error('Error!', {
    //     description: error.message,
    //   });
    // } else {
    //   toast.success('Success!', {
    //     description: 'Wow',
    //   });
    //   router.push(URL_ADMIN);
    // }

    if (data.email === 'qwe@qwe.qwe' && data.password === 'qweqwe') {
      toast.success('Success!', {
        description: 'Wow',
      });
      router.push(URL_ADMIN);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <FormInput
          label="Email"
          type="email"
          registration={register('email')}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          type="password"
          registration={register('password')}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="w-full mt-4 cursor-pointer"
          loading={isSubmitting}
        >
          Войти
        </Button>

        <div className="text-sm text-center mt-4">
          Нет аккаунта?{' '}
          <Link href={URL_REGISTER} className="text-indigo-900 underline">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
}
