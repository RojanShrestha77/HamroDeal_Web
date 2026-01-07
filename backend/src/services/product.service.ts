import { ProductRepository } from "../repositories/product.repositories";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { IUser } from "../models/user.model";
import { HttpError } from "../errors/http-error";

const productRepository = new ProductRepository();

export class ProductUserService{
    async createProduct(user:IUser, productData: CreateProductDto){
        // if(user.role!=="seller"){
        //     throw new HttpError(403, "Only Sellers can Create products");
        // }
        // if(!user.isApproved){
        //     throw new HttpError(403, "Your seller account is pending approval");
        // }
        const newProductData = {
            ...productData,
            sellerId: user._id,
        }
        
        const newProduct = await productRepository.createProduct(newProductData);
        return newProduct;
    }

    async getMyProducts(sellerId: string) {
        if(!sellerId || sellerId.trim() === ""){
            throw new HttpError(400, 'Invalid Seller Id');
        }
        const product = await productRepository.getProductsBySellerId(sellerId);
        return product;
    }

    async getAllProducts(){
        const products = await productRepository.getAllProducts();
        return products;
    }

    async getOneProduct(productId: string){
        const product = await productRepository.getProductById(productId);
        if(!product){
            throw new HttpError(404, 'Product not found');
        }
        return product;
    }

    async updateProduct(productId: string, updateData: UpdateProductDto, user: IUser){
        const product = await productRepository.getProductById(productId);

        // if(user.role!== "seller"){
        //     throw new HttpError(404, 'Only Seller Can update the Products');
        // }
        // if(!user.isApproved){
        //     throw new HttpError(404, 'Seller Approval Pending');
        // }
        if(product?.sellerId.toString() !== user._id.toString()){
            throw new HttpError(403, 'You can only update your own products')
        }
        if(!product){
            throw new HttpError(404, 'Product doesnot Exist')
        }
        const updatedProduct = await productRepository.updateProduct(productId, updateData);
        if(!updatedProduct){
            throw new HttpError(500, 'Failed to update the Product')
        }
        return updatedProduct;

    }

    async deleteProduct(productId: string, user: IUser){
        const product = await productRepository.getProductById(productId);
        // if(user.role!== "seller"){
        //     throw new HttpError(404, 'Only Seller Can update the Products');
        // }
        // if(!user.isApproved){
        //     throw new HttpError(404, 'Seller Approval Pending');
        // }
        if(product?.sellerId.toString() !== user._id.toString()){
            throw new HttpError(403, 'You can only update your own products')
        }
        if(!product){
            throw new HttpError(404, 'Product doesnot Exist')
        }
        const result = await productRepository.deleteProduct(productId);
        if(!result){
            throw new HttpError(404, 'Failed to delete the product')
        }
        return result;
    }

    async searchProducts(query: string) {
        return await productRepository.searchProducts(query);
    } 
    

}