import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Введите корректный email' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
