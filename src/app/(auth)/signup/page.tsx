import React from "react";
import { SignUp } from "@/components";
import { Container } from "@/components/common";

const Page = () => {
  return (
    <Container className="w-full max-w-[1536px] mx-auto flex justify-center items-center p-[4%] md:px-[7%] md:py-[4%]">
      <SignUp />
    </Container>
  );
};

export default Page;
