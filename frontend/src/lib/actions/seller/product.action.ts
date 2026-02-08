'use server';

import { createProduct, deleteProducts, getMyProducts, updateProducts } from "@/lib/api/seller/product";
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

export async function getMyProductsAction() {
    try {
        const result = await getMyProducts();
        if(result.success) {
            return {
                success: true,
                message: 'Products fetched  successfully',
                data: result.data
            };

        }
        return { success:false, message: result.message || 'Failed to fetch product data'};


    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Failed ton fetch product'}
    }
}

export async function deleteProductAction(productId: string) {
    try {
        const result = await deleteProducts(productId);

        if(result.success) {
            return {
                success: true,
                message: 'Product deleted successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to delete product'}
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Failed to delete product'}
    }
}

export async function handleUpdateProduct(productId: string, formData: FormData) {
     console.log("🟢 SERVER ACTION: handleUpdateProduct called");
    console.log("Product ID:", productId);
    
    // Log what's in FormData
    console.log("FormData contents:");
    try {
        const result = await updateProducts(productId, formData);

        if(result.success) {
            revalidatePath("/seller/products");
            return {success: true ,message: result.message || "Failed to update product"}


        } 
        return { success: false, message: result.message || 'Failed to udpate product'}
    }catch (error: Error | any) {
            return { success: false, message: error.message};
        }
}