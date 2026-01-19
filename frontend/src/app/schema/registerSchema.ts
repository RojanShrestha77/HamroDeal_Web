import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.email({message: 'Enter a valid email'}).min(1, {message: 'email is required'}),
    password: z.string().min(8, {message: 'Password must be greater then 8'}),
    confirmPassword: z.string().min(8, {message: 'Password must be greater then 8'}),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type RegisterData = z.infer<typeof registerSchema>;