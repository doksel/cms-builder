import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export const registerSchemaStrong = z
  .object({
    email: z.string().email({ message: 'Введите корректный email' }),
    password: z
      .string()
      .min(6, 'Минимум 6 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .regex(
        /[^A-Za-z0-9]/,
        'Пароль должен содержать хотя бы один специальный символ'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });
