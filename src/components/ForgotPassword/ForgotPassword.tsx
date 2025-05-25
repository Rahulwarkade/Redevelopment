"use client";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Input, Text } from "@/components";
import {
  ForgotPasswordImg,
  Logo,
  BoyIlustration,
  PlantIlustration,
  TreeIlustration,
} from "@/assets/Images";
import { useForm } from "react-hook-form";
import { Icons } from "@/assets/icons";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { forgotPassword} from "@/store/user/userAPI";
import Link from "next/link";
import ResetPassword from "../SetPassword/SetPassword";

interface FormData {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const [emailForOtp, setEmailForOtp] = useState<string>("");
  const [showComponent, setShowComponent] = useState(true);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const handleForgotPassword = async (data: FormData) => {

    const email = data?.email;
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const resultAction = await dispatch(forgotPassword(email)).unwrap();
      if (resultAction.success) {
        toast.success(
          resultAction.message || "Password reset link has been sent"
        );
        setEmailForOtp(email);
        setShowComponent(false);
      }
    } catch (error: unknown) {
      toast.error((error as any)?.message || "Failed to send reset link.");
    }
  };


  return (
    <>
      {showComponent ? <section className="w-full relative flex flex-col gap-4">
        {/* Logo */}
        <Container className="w-full relative flex justify-center md:justify-start item-center">
          <span className="relative md:-translate-x-[45px]">
            <Image src={Logo.src} alt="logo" width={214} height={53} />
          </span>
        </Container>
        <section className="w-full relative flex  gap-5">
          {/* Login Container and Logo*/}
          <Container className="w-full relative flex flex-col">
            {/* Login Form Container */}
            <Container className="w-full max-w-[512px] h-full relative  flex flex-col justify-center items-center ">
              {/* Login Container */}
              <Container className="w-full relative flex flex-col gap-4">
                <Link href="/login">
                  <Text className="text-xs md:text-sm text-black_313131 text-start flex gap-1 items-center">
                    <span>
                      <Image
                        src={Icons.ArrowLeft}
                        width={8}
                        height={13}
                        alt="left"
                      />
                    </span>
                    Back to login
                  </Text>
                </Link>
                <Text
                  variant="h1"
                  className="text-xl md:text-4xl 2xl:text-[40px] font-semibold text-black_313131 text-start"
                >
                  Forgot your password?
                </Text>
                <Text className="text-sm md:text-base  text-black_313131 text-start">
                  Don{"'"}t worry, happens to all of us. Enter your email below
                  to recover your password
                </Text>
              </Container>
              <form
                className="w-full "
                onSubmit={handleSubmit(handleForgotPassword)}
              >
                <Container className="w-full  flex flex-col gap-[40px]">
                  <Container className="w-full relative flex flex-col gap-6">
                    {/* Email Input */}
                    <Input
                      placeholder="e.g. john.doe@gmail.com"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Email'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def ${
                        errors.email ? "outline-red-500" : "outline-blue_515def"
                      }`}
                      type="email"
                      {...register("email", {
                        required: true,
                        minLength: 2,
                        pattern: {
                          value:
                            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                          message: "*Enter a valid email",
                        },
                      })}
                      error={
                        errors?.email?.message
                          ? String(errors?.email?.message)
                          : ""
                      }
                      errorClassName="text-red-500 text-sm pl-6"
                    />
                  </Container>

                  {/* Account Button */}
                  <Container className="w-full flex ">
                    <Button
                      type="submit"
                      className="w-full h-full rounded-sm bg-[#515DEF] text-white text-sm font-semibold outline-none  cursor-pointer"
                    >
                      {"Submit"}{" "}
                    </Button>
                  </Container>
                </Container>
              </form>
            </Container>

            {/* Illustration Images Container */}
            <Container className="w-full max-md:max-w-[512px] min-h-[275px] relative flex justify-between items-end mt-10 md:translate-y-[40px]">
              {/* boy and Tree */}
              <Container className="w-full relative flex items-end">
                <Container className="absolute">
                  <Image
                    src={TreeIlustration.src}
                    width={95}
                    height={275}
                    alt="tree"
                  />
                </Container>
                <Container className="relative translate-x-[60px]">
                  <Image
                    src={BoyIlustration.src}
                    width={207}
                    height={211}
                    alt="boy"
                  />
                </Container>
              </Container>

              <Image
                src={PlantIlustration.src}
                width={113}
                height={162}
                alt="plant"
              />
            </Container>
          </Container>

          {/* Image Container */}
          <Container className="hidden  md:flex w-full h-fit relative  bg-[#F0F0F0] rounded-[30px]  items-center justify-center">
            <Image
              src={ForgotPasswordImg.src}
              width={616}
              height={800}
              alt="login"
              className="object-contain"
            />
          </Container>
        </section>
      </section> : <ResetPassword email={emailForOtp}/>}
    </>
  );
};

export default ForgotPassword;
