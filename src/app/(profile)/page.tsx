import React from "react";
import { Container} from "@/components/common";
import { DeashboardLayout } from "@/components";


const Profile = () => {
  return (
    <Container
      className="w-full max-w-[1440px] h-screen max-h-[1024px]   mx-auto flex justify-center items-center"
    >
     <DeashboardLayout/>
    </Container>
  );
};

export default Profile;
