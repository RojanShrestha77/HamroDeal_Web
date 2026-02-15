import {z} from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jepg", "image/jpg", "image/png", "image/webp"];

export const updateUserSchema = z.object({
    firstName: z.string().min(2, {message: "Minimum 2 characters"}),
    lastName: z.string().min(2, {message: "Minimum 2 character"}),

    email: z.email("Invalid email address"),
    username: z.string().min(3, {message: "Minimum 3 characters"}),

    image: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Max File size is 5MB",
    })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .jpeg, .ong  and .webp formats are supported",


        }),
        phoneNumber: z.string().max(10).optional(),
        location: z.string().optional(),
        DOB: z.string().optional(),
        gender: z.string().optional(),

})
export type UpdateUserData = z.infer<typeof updateUserSchema>;