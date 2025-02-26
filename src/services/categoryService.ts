import axios from "axios"

type Category={
    id: string;
    categoryName : string;
    description: string;
}
type Book=  {
    id: string;
    title: string;
    author: string;
    language: string;
    publicationYear: string;
    isbn: string;
    totalCopies:string;
  };
const API_URL = "http://localhost:8080/categories";

export const getCategories = async ():Promise<Category[]>=>{

    try {
        const response = await axios.get<Category[]>(API_URL);
        console.log("Categories is fecthed successfully");
        return response.data;
    } catch (error) {
        console.log("Error in fetching categories. Error: ",error);
        throw error;
    }
}

export const getBooksForCategoryWithId = async (id: String | undefined):Promise<Book[]>=>{

    try {
        const response = await axios.get<Book[]>(`${API_URL}/${id}/books`);
        console.log("Books are fecthed successfully for category id:",id);
        return response.data;
    } catch (error) {
        console.log(`Error in fetching books for category id(${id}). Error: `,error);
        throw error;
    }
}