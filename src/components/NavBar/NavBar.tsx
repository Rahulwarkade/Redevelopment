"use client"
import React, {useState, useEffect} from "react";
import { Container, Image, Text, SideBar } from "@/components";
import {
  DownArrow,
  MessageIcon,
  NotificationsIcon,
} from "@/assets/icons/svgIcons";
import { Pic, Logo } from "@/assets/Images";
import { Icons } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavBar: React.FC = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isNavOpen,setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const parts = pathname?.split("/");
  const url = `${parts[1]}`;
  const [activeNav, setActiveNav] = useState("dashboard");
  useEffect(() => {
    if (url != "") {
      if (
        url == "connection" ||
        url == "chat" ||
        url == "notification" ||
        url == "profile" ||
        url == "settings" ||
        url == "lougout" ||
        url == "notification"||
        url == "signup"||
        url == "login"||
        url == "forgot-password" || 
        url == "set-password" 
      ) {
        setActiveNav(url);
      } else {
        setActiveNav("/");
      }
    }
  }, [activeNav, setActiveNav, url]);
  return <>
    <SideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} isNavBar={true} />
    <Container className="max-md:p-[4%]">
      <Container className="w-full relative  flex justify-between pb-2 md:pb-4 border-b border-black_c0c0c0 rounded-[4px] max-md:items-center">
        {/* Greetings Container */}
        <Container className="hidden md:inline-block w-fit">
          <Text className="text-black_23262f text-lg md:text-[26px] font-semibold">
            Good Morning JohnDoe
          </Text>
          <Text className="text-black_828282 text-sm md:text-base">
            Hope you have a good day
          </Text>
        </Container>

        {/* Menu Bar */}
        <Container
              onClick={() => setIsSidebar((prev) => !prev)}
              className="w-[32px] h-[40px] md:hidden "
            >
              <Image
                src={Icons.Menu}
                width={100}
                height={100}
                alt="homebargar"
              />
            </Container>
            {/* Logo Container */}
            <Image src={Logo.src} alt="Logo" width={180} height={53} className="md:hidden"/>

        {/* Controler Container Messages, Notifications, and Profile Icon */}
        <Container className="w-fit flex gap-10 items-center">
          {/* Messages */}
          <MessageIcon className="w-[30px] h-[30px] hidden md:flex" strokeColor="black" />
          {/* Notification */}
          <NotificationsIcon className="w-[30px] h-[30px] hidden md:flex" strokeColor="black" />
          {/* Profile Pic and Down Arrow */}
          <Container className="flex gap-4 items-center group relative" onClick={()=>setIsNavOpen(prev=>!prev)}>
            <Container className={`absolute w-fit right-0 bg-gray_f9f9f9  hidden group-hover:flex flex-col gap-2 z-10 drop-shadow-sm hover:drop-shadow-lg top-full rounded-md p-6 before:content-[''] before:absolute before:bottom-full before:border-solid before:border-[10px] before:border-t-transparent before:border-l-transparent before:border-r-transparent before:border-b-[#BDBDBD] before:right-[1.5rem] ${isNavOpen ? "flex":"hidden"}`}>
                    <Link
                      href={"/signup"}
                      onClick={() => setActiveNav("signup")}
                    >
                      <h3 className={`${activeNav == "signup" ? "text-[#878787] font-semibold " : ""} hover:text-[#6956E5] hover:font-semibold text-nowrap transition duration-300 ease-out`}>
                        Sign Up
                      </h3>
                    </Link>
                    <Link
                      href={"/login"}
                      onClick={() => setActiveNav("login")}
                    >
                      <h3 className={`${activeNav == "login" ? "text-[#878787] font-semibold " : ""} hover:text-[#6956E5] hover:font-semibold text-nowrap transition duration-300 ease-out`}>
                        Login
                      </h3>
                    </Link>
                    <Link
                      href={"/forgot-password"}
                      onClick={() => setActiveNav("forgot-password")}
                    >
                      <h3 className={`${activeNav == "forgot-password" ? "text-[#878787] font-semibold " : ""} hover:text-[#6956E5] hover:font-semibold text-nowrap transition duration-300 ease-out`}>
                        Forgot Password
                      </h3>
                    </Link>
                    <Link
                      href={"/set-password"}
                      onClick={() => setActiveNav("reset-password")}
                    >
                      <h3 className={`${activeNav == "reset-password" ? "text-[#878787] font-semibold " : ""}hover:text-[#6956E5] hover:font-semibold text-nowrap transition duration-300 ease-out`}>
                        Set Password
                      </h3>
                    </Link>
            </Container>
            <Container className="size-[40px] md:size-[50px] relative rounded-full overflow-hidden">
              <Image src={Pic.src} fill alt="pic" />
            </Container>
            <DownArrow className="relative" strokeColor="#23262F" />
          </Container>
        </Container>
      </Container>
    </Container>
  </>;
};

export default NavBar;
