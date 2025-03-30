import type { Metadata } from "next";
import { Container, NavBar, SideBar } from "@/components";

export const metadata: Metadata = {
  title: "Toneop Eats CRM",
  description: "Toneop Eats CRM",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <section className="w-full min-h-screen relative md:px-[7%] md:py-[20px] flex lg:grid grid-cols-4 gap-[30px]
      ">
        {/* Side Nav Bar */}
        <Container className="w-fit lg:w-full h-full max-md:p-[4%] relative pb-5 hidden md:inline-block">
          <SideBar />
        </Container>
        {/* Nav Bar and Dashboard Main Content */}
        <Container className="w-full h-full flex flex-col gap-2 md:gap-5 col-span-3">
          {/* Nav Bar */}
          <Container className="w-full h-fit">
            <NavBar />
          </Container>
          {/* Dashboard Content */}
          <Container className="w-full h-full max-md:p-[4%]">
            {children}
          </Container>
        </Container>
      </section>
    </>
  );
};

export default DashboardLayout;
