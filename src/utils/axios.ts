import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or wherever you store it
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error: AxiosError) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    const statusCode = error.response?.status;

    // Handle different error statuses
    switch (statusCode) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Redirect to login page
          window.location.href = "/login";
        }
        break;
      case 403:
        // Forbidden
        console.error("Access forbidden");
        break;
      case 404:
        // Not found
        console.error("Resource not found");
        break;
      case 500:
        // Server error
        console.error("Server error");
        break;
      default:
        console.error("API request failed");
    }

    return Promise.reject(error);
  }
);

// Generic fetch function with error handling
export const fetchWithErrorHandling = async <T, D = Record<string, unknown>>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    let response;

    switch (method) {
      case "GET":
        response = await axiosInstance.get<T>(url, config);
        break;
      case "POST":
        response = await axiosInstance.post<T>(url, data, config);
        break;
      case "PUT":
        response = await axiosInstance.put<T>(url, data, config);
        break;
      case "DELETE":
        response = await axiosInstance.delete<T>(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data;
  } catch (error) {
    // Error is already handled by the response interceptor
    // But we can add additional handling here if needed
    if (error instanceof AxiosError) {
      console.error(`API ${method} request to ${url} failed:`, error.message);
    } else {
      console.error(`Unknown error during ${method} request to ${url}:`, error);
    }
    throw error;
  }
};

export default axiosInstance;
