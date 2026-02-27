import { getAllProduct, getNewestProducts, getOneProduct, getTrendingProducts } from "../api/product";

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

export async function getAllProductsAction() {
    try {
        const result = await getAllProduct();

        if(result.success) {
            return { success: true, data: result.data};

        }
        return { success: false, message: result.message|| 'Failed to fetch products'};

    }catch (error: Error | any) {
        return { success: false, message: error.message};
    }
}

export async function getNewestProductsAction(limit: number = 8) {
    try {
        const result = await getNewestProducts(limit);

        if(result.success) {
            return { success: true, data: result.data};
        } 
        return { success: false, message: result.message || 'Failed to fetch newest products'};

    } catch (error: Error | any) {
        return { success: false, message: error.message};
    }
}

export async function getTrendingProductsAction(limit: number = 8, days: number = 30) {
    try {
        const result = await getTrendingProducts(limit, days);

        if(result.success) {
            return { success: true, data: result.data};
        } 
        return { success: false, message: result.message || 'Failed to fetch trending products'};

    } catch (error: Error | any) {
        return { success: false, message: error.message};
    }
}
