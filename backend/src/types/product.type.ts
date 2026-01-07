import z from 'zod';

export const ProductSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be atleast 10 characters'),
    price: z.number().positive("Price must be greater than 0"),
    stock: z.number().int().min(0, 'Stock cannot be negative'),
    images: z.array(z.string().url("Invallid IMage URL")).min(1, "At least one image required"),
    category: z.enum([
            "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Sports & Outdoors",
        "Books",
        "Toys & Games",
        "Health",
        "Automotive",
        "Other"
    ]).default("Other"),
    
})

export type ProductType = z.infer<typeof ProductSchema>;