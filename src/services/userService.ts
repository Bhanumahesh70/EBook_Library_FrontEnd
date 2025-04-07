import axios from "axios"
import apiClient from "./apiClient";
import { User } from "./types";
const API_URL = "/ebook/users"

  
export const getUsers = async (): Promise<User[]>=>{
    try {
        const response = await apiClient.get<User[]>(API_URL);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the users: ", error);
       throw error
    }
};

export const addUser = async(user:Omit<User,"id">):Promise<User>=>{
    try {
        const response = await apiClient.post<User>(API_URL,user);
        console.log(`New User '${user.name}' is added successfully`)
        return response.data;
        
    } catch (error) {
        console.log(`Failed to add user '${user.name}'. Error `, error);
        throw error;
    }
};

export const updateUserById = async(id:string|undefined,user:User):Promise<User>=>{
try {

    const updateData={
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
    }
    const response = await apiClient.patch<User>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log(`Failed to update user. Error in updating the user: `,user);
        throw error;
}
}
export const deleteUserById = async(id:string)=>{

    try {
        const response = await apiClient.delete(`${API_URL}/${id}`)
        console.log(`User with id '${id}' deleted successfully`);
        return response.data
    } catch (error) {
        console.log("Failed to Delete user. Error in deleting the user with id: ",id);
        console.log("Error: ", error)
        throw error;
    }

}

export const getUserById = async (id: string|undefined)=>{
    try {
        const response = await apiClient.get(`${API_URL}/${id}`);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the user with id: ", id);
        console.log("Error:", error);
        return [];
    }
};

