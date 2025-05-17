'use client'
import React from "react";
import { Container} from "@/components/common";
import { DeashboardLayout } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Profile = () => {
    const { profile } = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('authToken') || '';
    if (!token) router.push("/login");
  }, [profile]);
  return (
    <Container
      className="w-full max-w-[1440px] h-screen max-h-[1024px]   mx-auto flex justify-center items-center"
    >
      <DeashboardLayout/>
    </Container>
  );
};

export default Profile;
