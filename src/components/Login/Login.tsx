"use client";
import React, { useState, useEffect } from "react";
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
import { useAppDispatch, } from "@/store/hooks";
import { forgotPassword, signIn, verifyOtp } from "@/store/user/userAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAuth } from "@/store/user/authSlice"; // <-- import setAuth
import ResetPassword from "@/components/SetPassword/SetPassword"; // <-- Import your ResetPassword component

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState<string>("");
  const [otpExpired, setOtpExpired] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showComponent, setShowcomponent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<FormData & { otp: string }>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  function validatePassword(password: string) {
    if (!/.{3,}/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 3 characters long.",
      });
      return false;
    }
    if (!/\d/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one digit.",
      });
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one lowercase letter.",
      });
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError("password", {
        type: "manual",
        message: "Password must contain at least one uppercase letter.",
      });
      return false;
    }
    return true;
  }

  // OTP verification handler
  const handleOtpSubmit = async (data: { otp: string }) => {
    try {
      const result = await dispatch(
        verifyOtp({ email: emailForOtp, otp: data.otp })
      ).unwrap();

      if (result?.token) {
        dispatch(setAuth({ token: result.token }));
        document.cookie = `authToken=${result.token}; path=/; secure; samesite=strict`;
        if (rememberMe) {
          localStorage.setItem("authToken", result.token);
        } else {
          localStorage.removeItem("authToken");
        }
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: unknown) {
      // Show backend error message
      const errorMsg =
        (error as any)?.message ||
        (error as any)?.toString() ||
        "OTP verification failed. Please try again.";

      toast.error(errorMsg);

      // If OTP expired, disable OTP input
      if (
        errorMsg.toLowerCase().includes("expired") ||
        errorMsg.toLowerCase().includes("otp has expired")
      ) {
        setOtpExpired(true);
      }
    }
  };
  const handleForgotPassword = async () => {
    const email = getValues("email");
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
        setIsForgotPassword(true); // <-- Set forgot password state
        setValue("otp", "");
      }
    } catch (error: unknown) {
      toast.error((error as any)?.message || "Failed to send reset link.");
    }
  };
  // Password/OTP form submit
  const handleFormSubmit = async (data: FormData & { otp: string }) => {
    if (showOtp) {
      // If showing OTP, handle OTP submit
      await handleOtpSubmit(data);
      return;
    }
    if (isForgotPassword) {
      // Handle verification code for forgot password
      try {
        const result = await dispatch(
          verifyOtp({ email: getValues("email"), otp: data.otp })
        ).unwrap();
        if (result?.success) {
          toast.success("Verification successful! Please reset your password.");
          setResetEmail(getValues("email"));
          setResetOtp(data.otp);
          setShowcomponent(true);
          setIsForgotPassword(false);
          setShowOtp(false);
        }
      } catch (error: unknown) {
        toast.error((error as any)?.message || "Verification failed.");
      }
      return;
    }
    const isPasswordValid = validatePassword(data.password);
    if (!isPasswordValid) return;

    try {
      const resultAction = await dispatch(
        signIn({
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      if (resultAction?.success && resultAction?.email) {
        toast.success(resultAction.message || "OTP sent to your email address");
        setShowOtp(true);
        setEmailForOtp(data.email);
        setValue("otp", "");
        setResendTimer(30);
        setCanResend(false);
      }
    } catch (error: unknown) {
      toast.error(
        (error as any)?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleResendOtp = async () => {
    try {
      if (isForgotPassword) {
        // Resend forgot password verification code
        const email = getValues("email");
        await dispatch(forgotPassword(email)).unwrap();
        toast.success("Verification code resent to your email.");
      } else if (showOtp) {
        // Resend login OTP
        await dispatch(signIn({ email: emailForOtp, password: "" })).unwrap();
        toast.success("OTP resent to your email address");
      }
      setResendTimer(30);
      setCanResend(false);
      setOtpExpired(false);
      setValue("otp", "");
    } catch (error: unknown) {
      const errorMsg = (error as any)?.message || "Failed to resend verification code.";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((showOtp || isForgotPassword) && !canResend && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if ((showOtp || isForgotPassword) && resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [showOtp, isForgotPassword, resendTimer, canResend]);

  if (showComponent) {
    return <ResetPassword email={resetEmail} otp={resetOtp} setShowcomponent={setShowcomponent} />;
  }

  return (
    <>
      {<section className="w-full relative flex flex-col gap-4">
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
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def ${errors.email ? "outline-red-500" : "outline-blue_515def"
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
                      disabled={showOtp || isForgotPassword}
                    />
                    {/* Password or OTP Input */}
                    {!showOtp && !isForgotPassword ? (
                      <Input
                        placeholder="Password"
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
                        type={isPasswordVisible ? "text" : "password"}
                        {...register("password", { required: true })}
                        error={
                          errors?.password?.message
                            ? String(errors?.password?.message)
                            : ""
                        }
                        errorClassName="text-red-500 text-sm pl-6"
                      />
                    ) : (
                      <Input
                        placeholder="Enter Verification Code"
                        containerClassName="w-full relative flex flex-col h-[56px] before:content-['Code'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                        className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base`}
                        type="text"
                        maxLength={6}
                        {...register("otp", { required: true })}
                        error={
                          errors?.otp?.message
                            ? String(errors?.otp?.message)
                            : ""
                        }
                        errorClassName="text-red-500 text-sm pl-6"
                        disabled={otpExpired}
                      />
                    )}
                    {/* Terms and Privacy Policy Container */}
                    {!isForgotPassword && (
                      <Container className="w-full relative flex justify-between items-center">
                        <Container className="w-full relative flex gap-2 mt-3 md:mt-6">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe((prev) => !prev)}
                            className="w-[18px] h-[18px] rounded-sm border border-black_313131"
                            id="rememberMe"
                          />
                          <label
                            htmlFor="rememberMe"
                            className="text-sm text-black_313131 font-medium cursor-pointer"
                          >
                            Remember me
                          </label>
                        </Container>
                        <Link
                          href="#"
                          className="text-sm text-[#FF8682] font-medium text-nowrap"
                          onClick={(e) => {
                            e.preventDefault();
                            handleForgotPassword();
                          }}
                        >
                          Forgot Password
                        </Link>
                      </Container>
                    )}
                  </Container>

                  <Container className="w-full flex flex-col gap-4">
                    <Button
                      type="submit"
                      className="w-full h-full rounded-sm bg-[#515DEF] text-white text-sm font-semibold outline-none  cursor-pointer"
                    >
                      {isForgotPassword
                        ? "Verify Code"
                        : showOtp
                          ? "Verify OTP"
                          : "Login"}
                    </Button>
                    <Text className="w-full relative text-center text-sm text-black_313131 font-medium">
                      Don&apos;t have an account?
                      <Link href={"/signup"} className="text-red_ff8682">
                        {" "}
                        Sign up
                      </Link>
                    </Text>
                    {(showOtp || isForgotPassword) && !otpExpired && (
                      <div className="flex flex-col items-center gap-2 mt-2">
                        {!canResend ? (
                          <Text className="text-center text-sm text-black_313131">
                            Resend {isForgotPassword ? "Verification Code" : "OTP"} in{" "}
                            <span className="font-semibold">
                              00:{String(resendTimer).padStart(2, "0")}
                            </span>
                          </Text>
                        ) : (
                          <Button
                            type="button"
                            className="text-blue-600 disabled:text-gray-400"
                            onClick={handleResendOtp}
                          >
                            Resend {isForgotPassword ? "Verification Code" : "OTP"}
                          </Button>
                        )}
                      </div>
                    )}
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
      </section>}
    </>
  );
};

export default Login;
