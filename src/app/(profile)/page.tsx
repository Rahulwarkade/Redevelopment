'use client'
import React, { useEffect } from "react";
import { Container} from "@/components/common";
import { DeashboardLayout } from "@/components";
import { getProfile } from "@/store/user/userAPI";
import { useAppDispatch } from "@/store/hooks";

const Profile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async()=>{
      await dispatch(getProfile());
    }
    getUser();
  }, [dispatch]);
  
  return (
    <Container
      className="w-full max-w-[1536px] mx-auto h-full"
    >
      <DeashboardLayout/>
    </Container>
  );
};

export default Profile;
