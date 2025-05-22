import React from "react";
import { Container, SetPassword} from "@/components";

const Page = () => {
  return (
    <Container
    className="w-full max-w-[1536px] h-screen max-h-[1024px]   mx-auto flex justify-center items-center p-[4%] md:px-[7%] md:py-[4%]"
    >
    <SetPassword/>
    </Container>
  );
};

export default Page;
