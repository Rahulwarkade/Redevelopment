'use client';
import { Container, NavBar, SideBar } from "@/components";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getProfile } from "@/store/user/userAPI";
import { socket } from "../socket";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);
  // Connect socket and chat though 
  useEffect(()=>{
    if(!socket.connected)
    {
      socket.connect();
    }

    // Cleanup on unmount
    return () => {
      socket.disconnect(); // optional: if you want to disconnect on unmount
    };
  },[])
  return (
    <>
      <section className="min-w-screen md:min-h-screen max-w-[1920px] relative md:px-[7%] md:py-[20px] flex lg:grid grid-cols-4 gap-[30px] justify-center items-center mx-auto overflow-hidden">
        {/* Side Nav Bar */}
        <Container className="w-fit lg:w-full h-full  max-md:p-[4%] relative hidden md:inline-block">
          <SideBar />
        </Container>
        {/* Nav Bar and Dashboard Main Content */}
        <Container className="w-full h-full flex  flex-col  md:gap-5 col-span-3 relative overflow-hidden">
          {/* Nav Bar */}
          <Container className="w-full h-fit">
            <NavBar />
          </Container>
          {/* Dashboard Content */}
          <Container className="w-full h-full overflow-auto max-md:px-[4%] ">
            {children}
          </Container>
        </Container>
      </section>
    </>
  );
};

export default DashboardLayout;
