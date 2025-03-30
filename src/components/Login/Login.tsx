"use client";
import React, { useState } from "react";
import { Button, Container, Image, Input, Text } from "@/components";
import {
  LoginImg,
  Logo,
  BoyIlustration,
  PlantIlustration,
  TreeIlustration,
} from "@/assets/Images";
import { useForm } from "react-hook-form";
import { Icons } from "@/assets/icons";
import Link from "next/link";
interface FormData {
  name: string;
  number: string;
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  function validatePassword(password: string) {
    // // Check for length of at least 8 characters
    if (!/.{3,}/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 3 characters long.",
      });
      return false;
    }

    // Check for at least one digit

    if (!/\d/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one digit.",
      });
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one lowercase letter.",
      });
      return false;
    }

    // // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one uppercase letter.",
      });
      return false;
    }

    return true;
  }
  const handleFormSubmit = (data: FormData) => {
    const errors = validatePassword(data?.password);

    if (!errors) return;

    try {
      // Example Usage
      //   setShowOtp(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full relative flex flex-col gap-4">
        {/* Logo */}
        <Container className="w-full relative flex justify-center md:justify-start item-center ">
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
                <Text
                  variant="h1"
                  className="text-xl md:text-4xl 2xl:text-[40px] font-semibold text-black_313131 text-start"
                >
                  Login
                </Text>
                <Text className="text-sm md:text-base  text-black_313131 text-start">
                  Login to access your travelwise account
                </Text>
              </Container>
              <form
                className="w-full "
                onSubmit={handleSubmit(handleFormSubmit)}
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
                    {/* Password Input Container */}
                    <Input
                      placeholder="e.g. +91 98765 43210"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Password'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base ${
                        errors.password
                          ? "outline-red-500"
                          : "outline-blue_515def"
                      }`}
                      rightIcon={
                        <span
                          onClick={togglePasswordVisibility}
                          className="flex max-md:size-[12px]"
                        >
                          <Image
                            src={Icons.View}
                            width={20}
                            height={20}
                            alt="View"
                          />
                          {isPasswordVisible && (
                            <span className="transition-all duration-300 ease-in-out w-full h-[1px] bg-black rounded-full absolute rotate-45 top-1/2 -translate-y-1/2"></span>
                          )}
                        </span>
                      }
                      maxLength={20}
                      {...register("password", { required: true })}
                      error={
                        errors?.password?.message
                          ? String(errors?.password?.message)
                          : ""
                      }
                      errorClassName="text-red-500 text-sm pl-6"
                    />

                    {/* Terms and Privacy Policy Container */}
                    <Container className="w-full relative flex justify-between items-center">
                      <Container className="w-full relative flex gap-2 mt-3 md:mt-6">
                        <span className="w-[18px] h-[18px] rounded-sm border border-black_313131"></span>
                        <Text className="text-sm text-black_313131 font-medium">
                          Remember me
                          {/* <Link href={"/"} className="text-red_ff8682">
                          {" "}
                          Terms{" "}
                        </Link>
                        and
                        <Link href={"/"} className="text-red_ff8682">
                          {" "}
                          Privacy Policies.
                        </Link> */}
                        </Text>
                      </Container>

                      {/* Forgot Password Text */}
                      <Link
                        href={"#"}
                        className="text-sm text-[#FF8682] font-medium text-nowrap"
                      >
                        Forgot Password
                      </Link>
                    </Container>
                  </Container>

                  {/* Account Button */}
                  <Container className="w-full flex flex-col gap-4">
                    <Button
                      type="submit"
                      className="w-full h-full rounded-sm bg-[#515DEF] text-white text-sm font-semibold outline-none  cursor-pointer"
                    >
                      Create account
                    </Button>
                    <Text className="w-full relative text-center text-sm text-black_313131 font-medium">
                      Dono&apos;t have an account?
                      <Link href={"/"} className="text-red_ff8682">
                        {" "} Sign up
                      </Link>
                    </Text>
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
              src={LoginImg.src}
              width={616}
              height={800}
              alt="login"
              className="object-contain"
            />
          </Container>
        </section>
      </section>
    </>
  );
};

export default Login;
