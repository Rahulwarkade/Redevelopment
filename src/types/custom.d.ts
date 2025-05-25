declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
// Types
export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignUpPayload {
  username: string;
  email: string;
  phoneNumber: string;
  countryPhoneCode : string;
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
interface UserProfile {
  success: boolean;
  data: {
    id: string;
    _id: string;
    username: string;
    email: string;
    phoneNumber?: string;
    role?: {
      _id: string;
      code: string;
      name: string;
    };
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    collaborationGuidelines?: any[];
    banners?: any[];
  };
}
export interface UpdateProfilePayload {
  fullName: string;
  designation?: string;
  gender?: string;
  countryPhoneCode?: string;
  phoneNumber?: string;
  address?: string;
  profileDescription?: string;
}
export interface UpdateProfileThunkArg {
  profile: UpdateProfilePayload;
  token: string;
}
interface UserState {
  profile: UserProfile | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: {
    _id: string;
    code: string;
    name: string;
  };
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  collaborationGuidelines?: any[]; // optional if may not exist
  __v?: number;
  id: string;
  banners?: IBanner[];
}
interface IBanner {
  _id: string;
  name: string;
  websiteUrl: string;
  imageUrl: string;
  category?: {
    _id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
    createdBy?: string;
  };
  isPaid: boolean;
  amount: number;
  dr: number;
  da: number;
  pa: number;
  trafficValue: number;
  trafficUnit: string;
  gp: number;
  ex: number;
  isGuestPost: boolean;
  isExchangePost: boolean;
  isPublic: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  _id: string;
  name: string;
  websiteUrl: string;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
  isPaid: boolean;
  amount: number;
  dr: number;
  da: number;
  pa: number;
  trafficValue: number;
  trafficUnit: {
    _id: string;
    name: string;
  };
  gp: number;
  ex: number;
  isGuestPost: boolean;
  isExchangePost: boolean;
  isPublic: boolean;
  user: {
    _id: string;
    username: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  userStatus: "pending" | "accepted" | "rejected" | "none"; // assuming these are the only values
}

export interface Chat {
  connectionId: string;
  user: {
    _id: string;
    username: string;
    id: string;
  };
  latestMessage: string | null;
  unreadCount: number;
  updatedAt: string;
}

export interface Country {
  _id: string;
  code: string;
  name: string;
  phoneCode: string;
  flagEmoji?: string;
  isActive: boolean;
}