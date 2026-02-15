import { z } from 'zod';

export const loginSchema = z.object({
    email:z.email({message: 'Invalid email address'}).min(1, {message:'Email is required'}),



  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
    // Optional: Add stronger password rules
    // .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
    //   message: 'Password must contain uppercase, lowercase, and number',
    // }),
});
