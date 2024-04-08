import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

class UserService {
    // Signup User
    static async signup(userData: any) {
        try {
            const response = await axios.post(`${API_URL}signup/`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            return response.data; // Assuming the API returns some data on successful signup
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check if the error is an AxiosError
                const serverResponse = error.response;
                if (serverResponse && serverResponse.status === 401) {
                    // Handle 401 Unauthorized error specifically
                    // You can return or throw a custom error message or object
                    throw new Error("Invalid username or password");
                } else {
                    // Handle other possible errors (network error, server error, etc.)
                    throw new Error("An error occurred while signing in");
                }
            } else {
                // If the error is not an AxiosError
                throw new Error("An unexpected error occurred");
            }
        }
    }

    // Sign in User
    static async signin(userData: any) {
        try {
            const response = await axios.post(`${API_URL}signin/`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check if the error is an AxiosError
                const serverResponse = error.response;
                if (serverResponse && serverResponse.status === 401) {
                    // Handle 401 Unauthorized error specifically
                    // You can return or throw a custom error message or object
                    throw new Error("Invalid username or password");
                } else {
                    // Handle other possible errors (network error, server error, etc.)
                    throw new Error("An error occurred while signing in");
                }
            } else {
                // If the error is not an AxiosError
                throw new Error("An unexpected error occurred");
            }
        }
    }


    // Update Profile
    static async updateProfile(username: string, userData: any, token: string) {
        try {
            const response = await axios.put(`${API_URL}update-profile/${username}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data; // Assuming the API returns updated user data
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
