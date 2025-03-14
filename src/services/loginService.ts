import axios from "axios";

const API_URL = "http://localhost:8080/login"

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
        const response = await axios.post<AuthenticationResponse>(API_URL,authenticationRequest);
        console.log("User authenticated successfully", response.data);
        return response.data;
    } catch (error) {
        console.log("User is not authenticated. Invalid credentails");
        console.log("Error:", error);
        throw error;
    }
}