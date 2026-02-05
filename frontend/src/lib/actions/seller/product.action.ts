'use server';

import { createProduct } from "@/lib/api/seller/product";
import { revalidatePath } from "next/cache";

export async function handleCreateProduct(formData: FormData) {
    try {
        const result = await createProduct(formData);

        if(result.success) {
            revalidatePath("/seller/products");
            return {success: true, message:"product created successfully"};
        }
        return { success: false, message :result.message || 'Failed to create product'}

    }catch(error: Error | any){
    return { success: false, message: error.message };
  }

}