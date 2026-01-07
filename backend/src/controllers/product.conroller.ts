import z, { success } from "zod";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { ProductUserService } from "../services/product.service"
import { Request, Response } from "express"
import { IUser } from "../models/user.model";
import { STATUS_CODES } from "node:http";

const productUserService = new ProductUserService();

export class ProductUserController {
    async createProduct(req: Request, res: Response){
        try{
            const user = req.user as IUser;
            const parsedData = CreateProductDto.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({
                    success: false, message:z.prettifyError(parsedData.error)}
                )
            }
            const newProduct = await productUserService.createProduct(user, parsedData.data);
            return res.status(200).json({
                success: true, message:"Product created Successfully",
                data: newProduct
            });
            
        }catch(error: Error | any){
            return res.status(error.statusCode || 500).json({
                success: false, message:error.message||"Internal Server Error"

            });
        }

    }

    async getMyProducts(req: Request, res: Response){
        try{
            const user = req.user as IUser;
            const products = await productUserService.getMyProducts(user._id.toString());

            return res.json({
                success: true, message: "Product Successfully fetched", data: products
            })
        } catch(error: Error | any) {
            return res.status(error.statusCode || 500).json({
                success: false, message: error.message || 'Internal server error'
            })
        }
    }

    //getallproducts = public (for buyers browsing)
    async getAllProducts(req: Request, res: Response){
        try{
            const products = await productUserService.getAllProducts();
            return res.json({
                success: true, message: 'All Products Succesfully fetched', data:products
            })

        } catch(error: Error | any){
            return res.status(error.message || 500).json({
                success: false, message: error.message || 'Internal Server Error'
            })

        }
    }

    async getOneProduct(req: Request, res: Response){
        try{
            const productId = req.params.id;
            const product = await productUserService.getOneProduct(productId);
            return res.json({
                success: true, message: 'Product successfully fetched', data:product
            })

        }catch(error: Error | any ){
            return res.status(error.statusCode || 500).json({
                success: true, message: error.message || 'Internal Server Error'

            })
        
    }
    } 

    async updateProduct(req: Request, res: Response){
        try{
            const user = req.user as IUser;
            const {id} = req.params;
            const parsedData = UpdateProductDto.safeParse(req.body);
             if(!parsedData.success){
                return res.status(400).json({
                    success: false, message:z.prettifyError(parsedData.error)}
                )
            }

            const updatedProduct = await productUserService.updateProduct(id, parsedData.data, user);
            
            return res.json({
                success: true, message: 'Product Updated Succesfully', data: updatedProduct
            });

        } catch(error: Error | any ){
            return res.status(error.statusCode || 500).json({
                success: true, message: error.message || 'Internal Server Error'

            });
    }
    }

    async deleteProduct(req: Request, res: Response){
        try{
            const user = req.user as IUser;
            const {id} = req.params;
            
            const deletedProduct = await productUserService.deleteProduct(id, user);

            return res.json({
                success: true, message: 'Product Updated Deleted', data: deletedProduct
            });

            
        

        }catch(error: Error | any ){
            return res.status(error.statusCode || 500).json({
                success: true, message: error.message || 'Internal Server Error'

            });
    }
    }
    async searchProducts(req: Request, res: Response){
        try{
            const query = (req.query.q as string) || "";
            const products = await productUserService.searchProducts(query);

            return res.json({
                success: true, data: products
            });
        }catch(error: Error | any){
            return res.status(error.statusCode||500).json({
                success: false, message: error.message || 'Internal Server Error'
            })

        }
    }


    

  
}