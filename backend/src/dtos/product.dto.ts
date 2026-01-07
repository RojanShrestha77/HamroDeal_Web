import z from  'zod';
import { ProductSchema } from '../types/product.type'; 

export const CreateProductDto = ProductSchema;

export type CreateProductDto = z.infer<typeof CreateProductDto>;

export const UpdateProductDto = ProductSchema.partial();

export type UpdateProductDto = z.infer<typeof UpdateProductDto>;
