"use client";
import React, { useState } from "react";
import { Button, Container, Image, Input, Text } from "@/components";
import { signupIndicator, Logo } from "@/assets/Images";
import { useForm } from "react-hook-form";
import { Icons } from "@/assets/icons";
import Link from "next/link";
interface FormData {
  name: string;
  number: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[\d]/.test(e.key)) {
      e.preventDefault();
    }
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
      <section className="w-full relative md:grid grid-cols-5 gap-x-[100px]">
        {/* Image Container */}
        <Container className="hidden max-md:h-[300px] md:grid w-full relative col-span-2">
          <Image src={signupIndicator.src} fill alt="signup" className="object-contain"/>
        </Container>

        {/* Sign Up Container and Logo*/}

        <Container className="w-full relative col-span-3 flex flex-col">
          {/* Logo */}
          <Container className="w-full relative flex justify-center md:justify-end item-center">
            <Image src={Logo.src} alt="logo" width={214} height={53}/>
          </Container>

          {/* Signup Form Container */}
          <Container className="w-full h-full relative  flex flex-col justify-center items-center ">
            {/* Sign Up Container */}
            <Container className="w-full relative">
              <Text
                variant="h1"
                className="text-xl md:text-4xl 2xl:text-[40px] font-semibold text-black_313131 text-center md:text-start"
              >
                Sign up
              </Text>
              <Text className="text-sm md:text-base  text-black_313131 text-center md:text-start">
                Let{"'"}s get you all st up so you can access your personal
                account.
              </Text>
            </Container>
            <form className="w-full " onSubmit={handleSubmit(handleFormSubmit)}>
              <Container className="w-full  flex flex-col gap-[40px]">
                <Container className="w-full relative flex flex-col gap-6">
                {/* Name Input Container */}
                  <Input
                    placeholder="e.g. johndoe"
                    containerClassName="w-full relative flex flex-col h-[56px] before:content-['Username'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                    className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base ${
                      errors.name ? "outline-red-500" : "outline-blue_515def"
                    }`}
                    {...register("name", {
                      required: true,
                      maxLength: 20,
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message: "*Name must contain only letters",
                      },
                    })}
                    error={
                      errors?.name?.message ? String(errors?.name?.message) : ""
                    }
                    errorClassName="text-red-500 text-sm pl-6"
                  />

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
                {/* Number Input */}
                  <Input
                    placeholder="e.g. +91 98765 43210"
                    containerClassName="w-full relative flex flex-col h-[56px] before:content-['Phone_Number'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                    className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def ${
                      errors.number ? "outline-red-500" : "outline-blue_515def"
                    }`}
                    {...register("number", {
                      required: true,
                      maxLength: 10,
                      pattern:
                        /^(?!.*(\d)\1{5,})[6-9](?:(?!(\d)\2{5,}).)*\d{9}$/,
                    })}
                    maxLength={10}
                    onKeyPress={handleKeyPress}
                    error={
                      errors?.number?.message
                        ? String(errors?.number?.message)
                        : ""
                    }
                    errorClassName="text-red-500 text-sm pl-6"
                  />
                  {/* Password and Confirm Password Input */}
                  <Container className="w-full relative flex gap-6">
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
                    <Input
                      placeholder="e.g. +91 98765 43210"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Password'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def 
                        placeholder:text-xs md:placeholder:text-base ${
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
                  </Container>
                  {/* Terms and Privacy Policy Container */}
                  <Container className="w-full relative flex gap-2 mt-3 md:mt-6">
                    <span className="w-[18px] h-[18px] rounded-sm border border-black_313131"></span>
                    <Text className="text-sm text-black_313131 font-medium">
                      I agree to all the
                      <Link href={"/"} className="text-red_ff8682">
                        {" "}Terms{" "}
                      </Link>
                      and
                      <Link href={"/"} className="text-red_ff8682">
                        {" "}Privacy Policies.
                      </Link>
                    </Text>
                  </Container>

                </Container>

                {/* Account Button */}
                <Container
                  className="w-full flex flex-col gap-4"
                >
                  <Button
                    type="submit"
                    className="w-full h-full rounded-sm bg-[#515DEF] text-white text-sm font-semibold outline-none  cursor-pointer"
                  >
                    Create account
                  </Button>
                  <Text className="w-full relative text-center text-sm text-black_313131 font-medium">
                      Already have an account?
                      <Link href={"/"} className="text-red_ff8682">
                        {" "}Login
                      </Link>
                    </Text>
                </Container>

              </Container>
            </form>
          </Container>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
