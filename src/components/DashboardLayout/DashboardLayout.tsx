import React from "react";
import { Container, NavBar, DashboardContent, SideBar } from "@/components";

const DashboardLayout: React.FC = () => {
  return (
    <>
      <section className="min-w-screen max-w-[1920px] relative md:px-[7%] md:py-[20px] flex lg:grid grid-cols-4 gap-[30px] justify-center items-center mx-auto overflow-hidden">
        {/* Side Nav Bar */}
        <Container className="w-fit md:w-full h-full max-md:p-[4%] relative hidden md:inline-block">
          <SideBar />
        </Container>
        {/* Nav Bar and Dashboard Main Content */}
        <Container className="w-full h-full flex flex-col gap-2 md:gap-5 col-span-3">
          {/* Nav Bar */}
          <Container className="w-full h-fit">
            <NavBar />
          </Container>
          {/* Dashboard Content */}
          <Container className="w-full h-full overflow-auto max-md:p-[4%]">
            <DashboardContent />
          </Container>
        </Container>
      </section>
    </>
  );
};

export default DashboardLayout;
