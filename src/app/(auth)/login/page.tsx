import React from "react";
import { Container, Login } from "@/components";

const Page = () => {
  return (
    <Container
    className="w-full max-w-[1536px]  mx-auto flex justify-center items-center p-[4%] md:px-[7%] md:py-[4%]"
    >
    <Login/>
    </Container>
  );
};

export default Page;
