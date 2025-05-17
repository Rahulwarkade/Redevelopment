import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Types
export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignUpPayload {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  // add other fields as needed
}
export interface AddBannerPayload {
  name: string;
  websiteUrl: string;
  category: string;
  isPaid: boolean;
  amount: string;
  dr: string;
  da: string;
  pa: string;
  traffic: string;
  trafficValue: string;
  trafficUnit: string;
  gp: string;
  ex: string;
  isGuestPost: boolean;
  isExchangePost: boolean;
  isPublic: boolean;
}
export interface Category {
  _id: string;
  name: string;
}
export interface TrafficUnit {
  _id: string;
  name: string;
}
interface BannerFilters {
  page?: number;
  limit?: number;
  category?: string;
  isPaid?: boolean;
  isGuestPost?: boolean;
  isExchangePost?: boolean;
  minDr?: number;
  minDa?: number;
  minPa?: number;
  minTraffic?: number;
  trafficUnit?: string;
  showAll?: boolean;
  status?: "interested" | "declined";
}

// Async thunks
export const signIn = createAsyncThunk(
  "user/signIn",
  async (payload: SignInPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/auth/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "Sign in failed");
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Sign in failed");
      }
      return rejectWithValue("Sign in failed");
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/auth/signup`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

    if (response.status !== 201) {
      return rejectWithValue(response.data?.message || "User could not be created. Please try again.");
    } 
    return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Sign up failed");
      }
      return rejectWithValue("Sign up failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Get profile failed");
      }
      return rejectWithValue("Get profile failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { profile, token }: { profile: Partial<UserProfile>; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/api/user/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Update profile failed");
      }
      return rejectWithValue("Update profile failed");
    }
  }
);

export const signOut = createAsyncThunk(
  "user/signOut",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/user/signout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Sign out failed");
      }
      return rejectWithValue("Sign out failed");
    }
  }
);

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (payload: VerifyOtpPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/auth/verify-otp`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "OTP verification failed");
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "OTP verification failed");
      }
      return rejectWithValue("OTP verification failed");
    }
  }
);


export const addBanner = createAsyncThunk(
  "banner/addBanner",
  async (
    { banner, token }: { banner: AddBannerPayload; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/banners/",
        banner,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 201 && response.status !== 200) {
        return rejectWithValue(response.data?.message || "Add banner failed");
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Add banner failed");
      }
      return rejectWithValue("Add banner failed");
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (token : string, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/api/categories/",        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "Failed to fetch categories");
      }
      return response.data.categories; // Adjust if your API response structure is different
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
      }
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

export const getTrafficUnits = createAsyncThunk(
  "trafficUnit/getTrafficUnits",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/api/static/traffic-units/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "Failed to fetch traffic units");
      }
      return response.data.data; // Adjust if your API response structure is different
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Failed to fetch traffic units");
      }
      return rejectWithValue("Failed to fetch traffic units");
    }
  }
);

export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (
    { token, filters = {} }: { token: string; filters?: BannerFilters },
    { rejectWithValue }
  ) => {
    try {
      // Build query string from filters
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      const url = `http://localhost:5001/api/banners/?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "Failed to fetch banners");
      }
      return response.data.banners; // Adjust if your API response structure is different
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
      }
      return rejectWithValue("Failed to fetch banners");
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/forgot-password", { email });
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Failed to send reset email");
      }
      return rejectWithValue("Failed to send reset email");
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    payload: { email: string; otp: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/reset-password",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 200) {
        return rejectWithValue(response.data?.message || "Reset password failed");
      }
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        // @ts-expect-error axios error.response is not in TS type but present at runtime
        return rejectWithValue(error.response?.data?.message || "Reset password failed");
      }
      return rejectWithValue("Reset password failed");
    }
  }
);