import axios from "axios";

const API_URL = "http://localhost:8080/ebook/authorization"

type AuthenticationResponse={
    id: string;
    token : string;
    role : string;
}
type AuthenticationRequest={
    email:string;
    password:string;
}


export const authenticateUser = async(authenticationRequest: AuthenticationRequest): Promise<AuthenticationResponse>=>{
    try {
        const response = await axios.post<AuthenticationResponse>(`${API_URL}/login`,authenticationRequest);
        console.log("User authenticated successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("User is not authenticated. Invalid credentails");
        console.error("Error:", error);
        throw error;
    }
}

export const ValidateUser = async()=>{
    const token = localStorage.getItem("authToken")
    if (!token) {
        console.error("No token found. User is not logged in.");
        throw new Error("No token found.");
    }
    try {
        const response = await axios.post(`${API_URL}/validate`,{},{headers:{"Authorization": `Bearer ${token}`}});
        console.log("User validation successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("User is not valid. Invalid token");
        console.error("Error:", error);
        throw error;
    }
}
