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
      <section className="w-full max-w-[1536px] mx-auto h-full p-[1.302%]  relative  flex lg:grid grid-cols-4 gap-[30px] justify-center items-center">
        {/* Side Nav Bar */}
        <Container className="w-fit md:w-full h-full  p-[1.302%] relative hidden md:inline-block">
          <SideBar />
        </Container>
        {/* Nav Bar and Dashboard Main Content */}
        <Container className="w-full h-full flex  flex-col  md:gap-5 col-span-3 relative ">
          {/* Nav Bar */}
          <Container className="w-full h-fit">
            <NavBar />
          </Container>
          {/* Dashboard Content */}
          <Container className="w-full h-full overflow-auto max-md:p-[4%] ">
            {children}
          </Container>
        </Container>
      </section>
    </>
  );
};

export default DashboardLayout;
