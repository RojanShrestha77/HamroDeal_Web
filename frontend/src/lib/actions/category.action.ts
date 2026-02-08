import { error } from "console";
import { getAllCategories } from "../api/category"

export const handleGetCAtegories = async () => {
    try {
        const response = await getAllCategories();

        if(response.success) {
            return {
                success: true,
                message: 'Category fetched successfully',
                data: response.data

            }
        }
        return {
            success: false,
            message: response.message  || 'Failed to fetch users'
        }
    } catch(error: Error | any){
    return { success: false, message: error.message };
  }
} 