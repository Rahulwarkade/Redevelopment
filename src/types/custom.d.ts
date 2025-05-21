declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
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
