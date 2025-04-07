import axios from "axios"
import apiClient from "./apiClient";

export class EntityService<T>{

    constructor ( private API_URL:string){}

    getAllItems = async (): Promise<T[]>=>{
        try {
            const response = await apiClient.get<T[]>(this.API_URL);
            console.log(`${this.API_URL} -> All items fetched successfully`);
            return response.data;
            
        } catch (error) {
            console.log(`${this.API_URL}(->Error in fetching the items: `, error);
           throw error
        }
    };

    getItemById = async (id: string|number): Promise<T>=>{
        try {
            const response = await apiClient.get<T>(`${this.API_URL}/${id}`);
            return response.data;
            
        } catch (error) {
            console.log(`${this.API_URL} ->Error fetching the items with id: `, id);
            console.log("Error:", error);
            throw error;
        }
    };
    
    addItem = async(Entiydata:Omit<T,"id">):Promise<T>=>{
        try {
            const response = await apiClient.post<T>(this.API_URL,Entiydata);
            console.log(`${this.API_URL} -> New item is added successfully`)
            return response.data;
            
        } catch (error) {
            console.log(`${this.API_URL} -> Failed to add new item. Error: `, error);
            throw error;
        }
    };
    updateItem = async(id:string|undefined,Entiydata:T):Promise<T>=>{
        try {
        
            const response = await apiClient.patch<T>(`${this.API_URL}/${id}`,Entiydata);
            console.log(`${this.API_URL} -> Item is upadted successfully`)
            return response.data
        } catch (error) {
            console.log(`${this.API_URL} -> Error in updating Item. Error:`,error);
                throw error;
        }

    }

    deleteItemById = async(id:string):Promise<void>=>{

        try {
            const response = await apiClient.delete(`${this.API_URL}/${id}`)
            console.log(`${this.API_URL} -> Item deleted successfully with id: ${id}`);
            return response.data
        } catch (error) {
            console.log(`${this.API_URL} -> Error in deleting item with id: ${id}`);
            console.log("Error: ", error)
            throw error;
        }
    
    }

}