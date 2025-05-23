import axios from "axios"
import apiClient from "../apiClient";

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

    getItemById = async (id: string|undefined): Promise<T>=>{
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
            console.log(`${this.API_URL} -> Failed to add new item: ${Entiydata}. Error: `, error);
            throw error;
        }
    };
    updateItem = async(id:string|undefined,Entiydata:T):Promise<T>=>{
        try {
        
            const response = await apiClient.patch<T>(`${this.API_URL}/${id}`,Entiydata);
            console.log(`${this.API_URL} -> Item is upadted successfully for id:${id}`)
            return response.data
        } catch (error) {
            console.log(`${this.API_URL} -> Error in updating Item for id:${id}. Error:`,error);
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

    getRelatedEntityItemsForThisEntityWithId = async <R>  (id: String | undefined, relatedEntityName: string):Promise<R[]>=>{

        try {
            const response = await apiClient.get<R[]>(`${this.API_URL}/${id}/${relatedEntityName}`);
            console.log(`${this.API_URL} -> Related ${relatedEntityName} items are fetched for id: ${id}`);
            //console.log(`${relatedEntityName}: ${response.data}`);
            return response.data;
        } catch (error) {
            console.log(`${this.API_URL} ->Error in fetching related ${relatedEntityName} items for id: ${id}`);
            console.log("error: ",error);
            throw error;
        }
    }

    addRelatedEntityItemForThisEntityWithId = async <R>  (id: String | undefined, relatedEntityName: string):Promise<R[]>=>{

        try {
            const response = await apiClient.post<R[]>(`${this.API_URL}/${id}/${relatedEntityName}`);
            console.log(`${this.API_URL} -> Related ${relatedEntityName} item is added for id: ${id}`);
            console.log(`${relatedEntityName}: ${response.data}`);
            return response.data;
        } catch (error) {
            console.log(`${this.API_URL} ->Error in adding related ${relatedEntityName} item for id: ${id}`);
            console.log("error: ",error);
            throw error;
        }
    }

    actionMethod = async (Entitydata:T, actionPath: string):Promise<T>=>{
        try {
        
            const response = await apiClient.post<T>(`${this.API_URL}/${actionPath}`,Entitydata);
            console.log(`${this.API_URL}/${actionPath}-> is successfully`)
            return response.data
        } catch (error) {
            console.log(`${this.API_URL}/${actionPath} -> Error in method. Error:`,error);
                throw error;
        }
    }
    actionMethodByid = async (id:string | number, actionPath: string):Promise<T>=>{
        try {
        
            const response = await apiClient.post<T>(`${this.API_URL}/${actionPath}`,id,{
                headers: {
                  "Content-Type": "application/json",
                },
              });
            console.log(`${this.API_URL}/${actionPath}-> is successfully`)
            return response.data
        } catch (error) {
            console.log(`${this.API_URL}/${actionPath} -> Error in method. Error:`,error);
                throw error;
        }
    }

      uploadImage =async(formdata : FormData, id : string, uploadPath: string):Promise<T>=>{

        try{
            const response =  await apiClient.post(`${this.API_URL}/${id}/${uploadPath}`, formdata);
          console.log('Image uploaded successfully');
          return response.data
        } catch (error) {
          console.error('Failed to upload image:', error);
          throw error;
        }
      
      }
}