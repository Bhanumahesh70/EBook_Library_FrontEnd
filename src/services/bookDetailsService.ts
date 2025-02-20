import axios from "axios"

const API_URL = "http://localhost:8080/books"

export const getBooksById = async (id: string|number)=>{
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the books with id: ", id);
        console.log("Error:", error);
        return [];
    }
};