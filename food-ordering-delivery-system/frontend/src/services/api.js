import axios from "axios";

// Setup Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000", // API Gateway URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token to each request (if available)
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      // Attach token to request headers
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle response errors globally
api.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error (e.g., token expired)
      alert("Session expired. Please log in again.");
      localStorage.removeItem("x-auth-token"); // Remove invalid token
      // Redirect to login page or perform any other necessary actions
    }
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

export default api;
