
import apiClient from "./apiClient";
import { Category, Book } from "./types";

const API_URL = "/ebook/categories";

export const getCategories = async ():Promise<Category[]>=>{

    try {
        const response = await apiClient.get<Category[]>(API_URL);
        console.log("Categories is fecthed successfully");
        return response.data;
    } catch (error) {
        console.log("Error in fetching categories. Error: ",error);
        throw error;
    }
}

export const getCategoryById = async (id:string|undefined):Promise<Category>=>{

    try {
        const response = await apiClient.get<Category>(`${API_URL}/${id}`);
        console.log(`Category with id:${id} is fecthed successfully`);
        return response.data;
    } catch (error) {
        console.log(`Error in fetching categoriy with id:${id}  `,error);
        throw error;
    }
}

export const getBooksForCategoryWithId = async (id: String | undefined):Promise<Book[]>=>{

    try {
        const response = await apiClient.get<Book[]>(`${API_URL}/${id}/books`);
        console.log("Books are fecthed successfully for category id:",id);
        return response.data;
    } catch (error) {
        console.log(`Error in fetching books for category id(${id}). Error: `,error);
        throw error;
    }
}

export const addCategory = async (category: Category):Promise<Category>=>{

    try {
        const response = await apiClient.post<Category>(API_URL,category);
        console.log(`New category '${category.categoryName}' is added successfully`);
        return response.data;
    } catch (error) {
        console.log(`Error in adding category '${category.categoryName}'. Error: `,error);
        throw error;
    }
}

export const updateCategoryById = async (id: String | undefined, category: Category):Promise<Category>=>{

    try {
        const response = await apiClient.patch<Category>(`${API_URL}/${id}`,category);
        console.log("Category is updated with id:",id);
        return response.data;
    } catch (error) {
        console.log(`Error in category with id(${id}). Error: `,error);
        throw error;
    }
}