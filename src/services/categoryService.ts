import axios from "axios"

type Category={
    id: string;
    categoryName : string;
    description: string;
}

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