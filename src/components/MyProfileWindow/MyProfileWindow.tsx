"use client"
import React, {useState} from "react";
import { Container, Text, Button, Input, Image, PlanFeed } from "@/components";
import { Icons } from "@/assets/icons";
const MyProfileWindow = () => {

  const [openTab,setOpenTab] = useState("information");

  {
    /* General Information Window */
  }
  const GeneralInformation = () => {
    return (
      <Container className="w-full h-full relative p-[30px] flex flex-col gap-[30px]">
        {/* General Inform Heading */}
        <Container className="w-full relative">
          <Text className="text-base md:text-2xl font-medium text-black">
            General Information
          </Text>
          <Text className="text-sm md:text-xl text-[#787774]">
            Update your account settings.
          </Text>
        </Container>

        {/* Information Form Container */}
        <Container className="w-full relative">
          <form className="w-full relative flex flex-col  gap-4">
            {/* Name, Number and Email Input */}
            <Container className="w-full relative flex flex-col md:flex-row md:items-end gap-6">
              {/* Name, Number and Email Input */}
              <Container className="w-full relative flex flex-col gap-4">
                <Input
                  label="Full Name"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="John Doe"
                  containerClassName="w-full  flex flex-col relative overflow-hidden "
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                />

                <Container className="w-full relative flex gap-6">
                  <Input
                    label="Mobile No"
                    labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                    placeholder="+91 123456789"
                    containerClassName="w-full  flex flex-col relative overflow-hidden "
                    className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  />
                  <Input
                    label="Email"
                    labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                    placeholder="john.doe@email.com"
                    containerClassName="w-full  flex flex-col relative overflow-hidden "
                    className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  />
                </Container>
              </Container>

              {/* Upload Photo */}
              <Container className="w-fit rounded-[4px] px-[70px] py-[40px] relative flex flex-col gap-1 itemx-center justify-center border border-[#DEDEDE]">
                <span className="size-[38px] relative flex">
                  <Image src={Icons.Upload} alt="upload" fill />
                </span>
                <Text className="text-xs md:text-sm text-[#191D23]">
                  Upload Photo
                </Text>
              </Container>
            </Container>

            {/* Gender */}
            <Container className="w-full relative">
              <Text className="text-[#747B85] text-sm md:text-base font-normal text-nowrap">
                Gender
              </Text>

              <Container className="flex gap-4">
                {/* Male */}
                <span className="px-2 py-[10px] rounded-[6px] border border-[#DEDEDE] bg-[#F2F5FF] flex items-center justify-center gap-1">
                  <Image src={Icons.Boy} alt="male" width={38} height={38} />
                  <Text className="text-xs md:text-sm text-[#575757]">
                    Male
                  </Text>
                </span>

                {/* Female */}
                <span className="px-2 py-[10px] rounded-[6px] border border-[#DEDEDE] flex items-center justify-center gap-1">
                  <Image src={Icons.Woman} alt="male" width={38} height={38} />
                  <Text className="text-xs md:text-sm text-[#575757]">
                    Female
                  </Text>
                </span>
              </Container>
            </Container>

            {/* Address */}
            <Container className="w-full relative">
              {/* Address Input */}
              <Input
                label="Address"
                labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                placeholder="xxxxxx, xxxxxxxxxx, xxxxx, xxxxxxxxxxxx 444488"
                containerClassName="w-full  flex flex-col relative overflow-hidden "
                className="w-full px-[18px] pt-[21px] pb-[70px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
              />
            </Container>
            {/* Cancle and Update Button */}
            <Container className="w-full relative flex gap-3 items-center justify-end px-6">
              {/* Cancle */}
              <Button className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-[#515DEF] text-sm md:text-base font-medium">
                {" "}
                Cancle{" "}
              </Button>

              {/* Update */}
              <Button className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-white bg-[#515DEF] text-sm md:text-base font-medium">
                {" "}
                Cancle{" "}
              </Button>
            </Container>
          </form>
        </Container>
      </Container>
    );
  };

  {
    /* Change Password Window */
  }
  const ChangePassword = () => {
    return (
      <Container className="w-full h-full relative p-[30px] flex flex-col gap-[30px]">
        {/* Change Password Heading */}
        <Container className="w-full relative">
          <Text className="text-base md:text-2xl font-medium text-black">
            Password Reset
          </Text>
          <Text className="text-sm md:text-xl text-[#787774]">
            Update your password here. Enter your current and new password.
          </Text>
        </Container>

        {/* Information Form Container */}
        <Container className="w-full relative">
          <form className="w-full relative flex flex-col  gap-4">
            {/* Name, Number and Email Input */}
            <Container className="w-full relative flex flex-col gap-6">
              {/* Name, Number and Email Input */}
              <Container className="w-full relative flex flex-col md:flex-row  gap-4">
                <Input
                  label="Current Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="password"
                  containerClassName="w-full  flex flex-col relative overflow-hidden "
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  type="password"
                />
                <Input
                  label="New Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="password"
                  containerClassName="w-full  flex flex-col relative overflow-hidden "
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  type="password"
                />
                <Input
                  label="Confirm Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="John Doe"
                  containerClassName="w-full  flex flex-col relative overflow-hidden "
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                />
              </Container>

              {/* Update Button */}
              <Container className="w-full relative flex gap-3 items-center justify-center md:justify-end px-6">
                {/* Update */}
                <Button className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-white bg-[#515DEF] text-sm md:text-base font-medium">
                  {" "}
                  Update Password{" "}
                </Button>
              </Container>
            </Container>
          </form>
        </Container>
      </Container>
    );
  };

  {
    /* Billing and Payment Window */
  }
  const BillingAndPayments = () => {
    return (
      <Container className="w-full h-full relative p-4 md:p-[30px] flex flex-col gap-[30px]">
        {/* Billing and Payment Heading */}
        <Container className="w-full relative">
          <Text className="text-base md:text-2xl font-medium text-black">
            Billing & Payments
          </Text>
          <Text className="text-sm md:text-xl text-[#787774]">
            Manage Your Billing and Payments from here. You can also manage your
            payment methods from here.
          </Text>
        </Container>

        {/* Billing Plans Cards */}
        <Container className="w-full relative grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            {
              planIcon: false,
              planName: "For individuals",
              Subscription: "Free",
              SubscriptionDuration: "3 Months",
              planType: "Basic",
            },
            {
              planIcon: Icons.EnterpriseIcon,
              planName: "For Startups",
              Subscription: "$199",
              SubscriptionDuration: "6 Months",
              planType: "Pro",
            },
            {
              planIcon: Icons.ProIcon,
              planName: "For big companies",
              Subscription: "$399",
              SubscriptionDuration: "12 Months",
              planType: "Enterprise",
            },
          ].map((planDetails, index: number) => {
            return (
              <PlanFeed
                key={`planfeed-${index}`}
                planDetails={planDetails}
                isPro={index == 1}
              />
            );
          })}
        </Container>
      </Container>
    );
  };

  return (
    <section className="w-full h-full relative bg-white_fdfdff rounded-[20px] border border-grey_e1e2ff overflow-hidden">
      {/* Settings Heading */}
      <Container className="w-full relative border-b border-[#E1E2FF]  px-[30px] py-4">
        <Text className="text-base md:text-2xl font-semibold text-black">
          Settings
        </Text>
      </Container>

      {/* General Information, Password and Billing */}
      <Container className="w-full relative flex h-[70px] border-b border-[#E1E2FF] ">
        {/* General Info */}
        <Container className={`w-full h-full relative  flex justify-center items-center border border-[#E1E2FF] cursor-pointer ${openTab=="information" ? "bg-[#515DEF] text-white" : ""}`} onClick={()=>setOpenTab("information")}>
          <Text className="text-sm md:text-base lg:text-lg font-medium text-center">
            General Information
          </Text>
        </Container>
        {/* General Info */}
        <Container className={`w-full h-full relative flex justify-center items-center border border-[#E1E2FF] cursor-pointer ${openTab=="password" ? "bg-[#515DEF] text-white" : ""}`} onClick={()=>setOpenTab("password")}>
          <Text className="text-sm md:text-base lg:text-lg font-medium text-center">
            Change Password
          </Text>
        </Container>
        {/* General Info */}
        <Container className={`w-full h-full relative flex justify-center items-center border border-[#E1E2FF] cursor-pointer ${openTab=="payment" ? "bg-[#515DEF] text-white" : ""}`} onClick={()=>setOpenTab("payment")}>
          <Text className="text-sm md:text-base lg:text-lg font-medium text-center">
            Billing & Payments
          </Text>
        </Container>
      </Container>

      {openTab=="information" && <GeneralInformation />}
      {openTab=="password" && <ChangePassword />}
      {openTab=="payment" && <BillingAndPayments />}
    </section>
  );
};

export default MyProfileWindow;
