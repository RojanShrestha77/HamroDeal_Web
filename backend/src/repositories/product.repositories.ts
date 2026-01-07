import { IProduct, ProductModel } from "../models/product.model";

export interface IProductRepository{
    createProduct(productData: Partial<IProduct>): Promise<IProduct>
    getProductsBySellerId(sellerId: string): Promise<IProduct[]>
    getProductById(productId: string): Promise<IProduct | null>
    updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct|null> 
    deleteProduct(productId: string): Promise<boolean | null>
    getAllProducts(): Promise<IProduct[]>
    getProductsByCategory(category: string): Promise<IProduct[]>
    searchProducts(query: string): Promise<IProduct[]>
    getAllProductsPaginated(page: number, limit: number): Promise<IProduct[]>
}

export class ProductRepository implements IProductRepository {
    async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
        const product = new ProductModel(productData);
        await product.save();
        return product;

    }

    async getProductsBySellerId(sellerId: string): Promise<IProduct[]> {
        const product = await ProductModel.find({seller: sellerId});
        return product;
        
    }

    async getProductById(productId: string): Promise<IProduct | null> {
        const product = await ProductModel.findById(productId);
        return product;
    }

    async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        const product = await ProductModel.findByIdAndUpdate(productId, updateData, {new: true});
        return product;
    }

    async deleteProduct(productId: string): Promise<boolean | null> {
        const product = await ProductModel.findByIdAndDelete(productId);
        return product? true: false;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const products = await ProductModel.find();
        return products;
    }

    async getProductsByCategory(category: string): Promise<IProduct[]> {
        const products = await ProductModel.find({category})
        return products
    }

    async searchProducts(query: string): Promise<IProduct[]> {
        if(!query?.trim()) return await ProductModel.find();

        const regex = new RegExp(query.trim(), "i");

        return await ProductModel.find({
            $or:[
                {title: regex},
                {description: regex}
            ]

        });        
    }

    async getAllProductsPaginated(page: number, limit: number): Promise<IProduct[]> {
        const skip = (page-1) * limit;

        const products = await ProductModel.find()
        .skip(skip)
        .limit(limit)

        return products;

    }




}