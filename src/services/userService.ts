import axios from "axios"

const API_URL = "http://localhost:8080/users"
type User=  {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role:string;

  };
  
export const getUsers = async (): Promise<User[]>=>{
    try {
        const response = await axios.get<User[]>(API_URL);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the users: ", error);
       throw error
    }
};

export const addUser = async(user:Omit<User,"id">):Promise<User>=>{
    try {
        const response = await axios.post<User>(API_URL,user);
        console.log(`New User '${user.name}' is added successfully`)
        return response.data;
        
    } catch (error) {
        console.log(`Failed to add user '${user.title}'. Error `, error);
        throw error;
    }
};

export const updateUser = async(user:User,id:string|undefined):Promise<User>=>{
try {

    const updateData={
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
    }
    const response = await axios.patch<User>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log(`Failed to update user. Error in updating the user: `,user);
        throw error;
}
}
export const deleteUserById = async(id:string)=>{

    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        console.log(`User with id '${id}' deleted successfully`);
        return response.data
    } catch (error) {
        console.log("Failed to Delete user. Error in deleting the user with id: ",id);
        console.log("Error: ", error)
        throw error;
    }

}

export const getUserById = async (id: string|number)=>{
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the user with id: ", id);
        console.log("Error:", error);
        return [];
    }
};

