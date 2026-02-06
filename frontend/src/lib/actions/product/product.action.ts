import { getOneProduct } from "@/lib/api/product/product";

export async function getOneProductAction(productId: string) {
    try {
        const result = await getOneProduct(productId);

        if(result.success) {
            return { success: true, data: result.data};
        } 
        return { success: false, message: result.message|| 'Failed to fetch product'};

    } catch (error: Error | any) {
        return { success: false, message: error.message};
    }
}