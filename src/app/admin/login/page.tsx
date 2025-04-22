'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';

import { loginSchema } from '@/utils/validation';
import { URL_ADMIN } from '@/constants/path';

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
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error('Error!', {
        description: error.message,
      });
    } else {
      toast.success('Success!', {
        description: 'Wow',
      });
      router.push(URL_ADMIN);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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

        <Button type="submit" className="w-full mt-4" loading={isSubmitting}>
          Войти
        </Button>
      </form>
    </div>
  );
}
