import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ProductFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  images: z
    .array(z.any())
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
    .refine((files) => files.every((file) => file instanceof File), {
      message: "All items must be valid files",
    })
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Each file must be less than 5MB",
    })
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: "Only .jpg, .jpeg, .png, and .webp formats are supported" },
    ),
});

export type ProductData = z.infer<typeof ProductFormSchema>;
