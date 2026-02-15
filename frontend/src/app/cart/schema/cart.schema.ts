import { z } from 'zod';

//  Populated product schema
export const populatedProductSchema = z.object({
  _id: z.string(),
  title: z.string(),
  images: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  sellerId: z.string().optional(),
});

// Cart item schema
export const cartItemSchema = z.object({
  productId: z.union([
    z.string(),                    // Not populated
    populatedProductSchema         // Populated
  ]),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  name: z.string().optional(),
  image: z.string().optional(),
  sellerId: z.string().optional(),
  title: z.string().optional(),
});

//  Full cart schema
export const cartSchema = z.object({
  _id: z.string(),
  userId: z.string().optional(),
  items: z.array(cartItemSchema),
  total: z.number().nonnegative(),
  itemCount: z.number().int().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  Add to cart input schema
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be at least 1').default(1),
});

// Update cart item input schema
export const updateCartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

//  Remove from cart input schema
export const removeFromCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

//  Export inferred types
export type PopulatedProduct = z.infer<typeof populatedProductSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;

//  Type alias for ProductRef
export type ProductRef = string | PopulatedProduct;

//  Helper functions
export const getProductId = (productId: ProductRef): string =>
  typeof productId === "string" ? productId : productId._id;

export const isProductPopulated = (productId: ProductRef): productId is PopulatedProduct =>
  typeof productId === "object";
