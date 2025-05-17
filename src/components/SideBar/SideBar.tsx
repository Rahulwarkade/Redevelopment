"use client";
import React, { useEffect, useState } from "react";
import { Container, Image, Text } from "@/components";
import { Logo } from "@/assets/Images";
import { Icons } from "@/assets/icons";
import {
  DashboardIcon,
  ConnectionIcon,
  ChatIcon,
  BellIcon,
  ProfileIcon,
  SettingsIcon,
  LougoutIcon,
} from "@/assets/icons/svgIcons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavBarType {
  isSidebar? : boolean;
  setIsSidebar? : React.Dispatch<React.SetStateAction<boolean>>;
  isNavBar? : boolean
}
const SideBar: React.FC<NavBarType> = ({isSidebar, setIsSidebar, isNavBar}) => {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname?.split("/");
  const url = `${parts[1]}`;
  const [activeNav, setActiveNav] = useState("dashboard");
  useEffect(() => {
    if (url != "dashboard") {
      if (
        url == "connection" ||
        url == "chat" ||
        url == "job" ||
        url == "profile" ||
        url == "setting" ||
        url == "lougout" ||
        url == "notification"
      ) {
        setActiveNav(url);
      } else {
        setActiveNav("/");
      }
    }
  }, [activeNav, setActiveNav, url]);


  return (
    <>
      <Container className={`w-full max-md:max-w-[430px] h-full fixed md:relative  max-md:z-50 rounded-[10px] lg:rounded-[20px] bg-gray_f9f9f9 p-5 transition-transform duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isNavBar &&"md:hidden"} ${isSidebar ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}>
        
        {/* Logo Container */}
        <Container className="w-full relative flex items-center justify-between md:justify-center">
          <Link href={"/"}>
            <Image src={Logo.src} alt="Logo" width={214} height={53} />
          </Link>
          <div
            className="w-[44px] h-[44px] relative rounded-full bg-[#FFFFFF] flex justify-center items-center drop-shadow-md
            md:hidden"
            onClick={() => {
              if(isNavBar && setIsSidebar)
              {
                setIsSidebar(false);
              }
            }}
          >
            <Image
              src={Icons.CloseIcon}
              width={16}
              height={16}
              alt="Cancle Icon"
            />
          </div>
        </Container>

        {/* Navigations  */}
        <Container className="w-full relative flex flex-col gap-5 mt-[40px]">
          {[
            {
              routeIcon: (
                <DashboardIcon
                  strokeColor={`${
                    "/" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "Dashbaord",
              routeSlug: "/",
            },
            {
              routeIcon: (
                <ConnectionIcon
                  strokeColor={`${
                    "connection" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "My Connection",
              routeSlug: "/connection",
            },
            {
              routeIcon: (
                <ChatIcon
                  strokeColor={`${"chat" == activeNav ? "#6956E5" : "#878787"}`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "My Chat",
              routeSlug: "/chat",
            },
            {
              routeIcon: (
                <BellIcon
                  strokeColor={`${
                    "notification" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "My Notification",
              routeSlug: "/notification",
            },
            {
              routeIcon: (
                <ProfileIcon
                  strokeColor={`${
                    "profile" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "My Profile",
              routeSlug: "/profile",
            },
            {
              routeIcon: (
                <SettingsIcon
                  strokeColor={`${
                    "setting" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "Settings",
              routeSlug: "/setting",
            },
            {
              routeIcon: (
                <LougoutIcon
                  strokeColor={`${
                    "logout" == activeNav ? "#6956E5" : "#878787"
                  }`}
                  className="size-3 md:size-6"
                />
              ),
              routeName: "Logout",
              routeSlug: "/login",
            },
          ].map((route, index) => {
            return (
              <Link
                href={route.routeSlug}
                key={`${index}`}
                className="flex gap-4 items-center"
                onClick={async (e) => {
                  if(setIsSidebar) {
                    setIsSidebar(false)
                  }
                    if(route.routeName == "Logout") {
                    e.preventDefault();
                    // Clear authToken from cookies
                    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1 hour from now
                    document.cookie = `authToken=; expires=${expires}; path=/;`;
                    router.replace("/login");
                    }
                }}
              >
                {route.routeIcon}
                <Text
                  className={`text-base md:text-[18px] hover:text-[#6956E5] hover:font-semibold text-nowrap transition duration-300 ease-out ${
                    (activeNav == route.routeSlug.slice(1) || (activeNav == "/" && route.routeSlug=="/"))
                      ? "text-[#6956E5] font-semibold"
                      : "text-gray_878787"
                  }  capitalize`}
                >
                  {route.routeName}
                </Text>
              </Link>
            );
          })}
        </Container>
      </Container>
    </>
  );
};

export default SideBar;
