"use client";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Input, Text } from "@/components";
import {
  SetPasswordImg,
  Logo,
  BoyIlustration,
  PlantIlustration,
  TreeIlustration,
} from "@/assets/Images";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { forgotPassword, resetPassword } from "@/store/user/userAPI";
import { useRouter } from "next/navigation";
interface FormData {
  otp: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordProps {
  email: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ email }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otpExpired, setOtpExpired] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue
  } = useForm<FormData>();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, canResend]);


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
  
  const confirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (data: FormData) => {
    const isPasswordValid = validatePassword(data.password);
    if (!isPasswordValid) return;
    const isConfirm = confirmPassword(data.password, data.confirmPassword);
    if (!isConfirm) return;
    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters.",
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords must match.",
      });
      return;
    }

    try {
      const res = await dispatch(
        resetPassword({
          email,
          otp : data.otp,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      ).unwrap();

      if(res.success)
      {
        toast.success("Password reset successful! Please login.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password.");
    }
  };
  const handleResendOtp = async () => {
    try {
      // Resend login OTP
      await dispatch(forgotPassword(email)).unwrap();
      toast.success("OTP resent to your email address");
      setResendTimer(30);
      setCanResend(false);
      setOtpExpired(false);
      setValue("otp", "");
    } catch (error: unknown) {
      const errorMsg =
        (error as any)?.message || "Failed to resend verification code.";
      toast.error(errorMsg);
    }
  };
  return (
    <>
      <section className="w-full relative flex flex-col gap-4">
        {/* Logo */}
        <Container className="w-full relative flex justify-center md:justify-start item-center">
          <span className="relative md:-translate-x-[45px]">
            <Image src={Logo.src} alt="logo" width={214} height={53} />
          </span>
        </Container>
        <section className="w-full relative flex gap-5">
          {/* Reset Password Container */}
          <Container className="w-full relative flex flex-col">
            <Container className="w-full max-w-[512px] h-full relative flex flex-col justify-center items-center ">
              <Container className="w-full relative flex flex-col gap-4">
                <Text
                  variant="h1"
                  className="text-xl md:text-4xl 2xl:text-[40px] font-semibold text-black_313131 text-start"
                >
                  Set a password
                </Text>
                <Text className="text-sm md:text-base text-black_313131 text-start">
                  Your previous password has been reset. Please set a new
                  password for your account.
                </Text>
              </Container>
              <form
                className="w-full"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <Container className="w-full flex flex-col gap-[40px]">
                  <Container className="w-full relative flex flex-col gap-6">
                    <Input
                      placeholder="Enter Verification Code"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Code'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base`}
                      type="text"
                      maxLength={6}
                      {...register("otp", { required: true })}
                      error={
                        errors?.otp?.message ? String(errors?.otp?.message) : ""
                      }
                      errorClassName="text-red-500 text-sm pl-6"
                      disabled={otpExpired}
                    />
                    {/* New Password Input */}
                    <Input
                      placeholder="New Password"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Password'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base ${
                        errors.password
                          ? "outline-red-500"
                          : "outline-blue_515def"
                      }`}
                      maxLength={20}
                      type={"password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: 8,
                      })}
                      error={
                        errors?.password?.message
                          ? String(errors?.password?.message)
                          : ""
                      }
                      errorClassName="text-red-500 text-sm pl-6"
                    />
                    {/* Confirm Password Input */}
                    <Input
                      placeholder="Re-enter Password"
                      containerClassName="w-full relative flex flex-col h-[56px] before:content-['Confirm_Password'] before:w-fit before:bg-white before:z-10 before:translate-y-[60%] before:translate-x-4 before:text-sm before:text-black_1C1B1F "
                      className={`w-full h-full border border-gray_79747E rounded-[4px] p-4 before:bg-white outline-blue_515def placeholder:text-xs md:placeholder:text-base ${
                        errors.confirmPassword
                          ? "outline-red-500"
                          : "outline-blue_515def"
                      }`}
                      maxLength={20}
                      type={"password"}
                      {...register("confirmPassword", {
                        required: "Please re-enter your password",
                      })}
                      error={
                        errors?.confirmPassword?.message
                          ? String(errors?.confirmPassword?.message)
                          : ""
                      }
                      errorClassName="text-red-500 text-sm pl-6"
                    />
                  </Container>
                  {/* Account Button */}
                  <Container className="w-full flex ">
                    <Button
                      type="submit"
                      className="w-full h-full rounded-sm bg-[#515DEF] text-white text-sm font-semibold outline-none cursor-pointer"
                    >
                      Set password
                    </Button>
                  </Container>
                  {!otpExpired && (
                    <div className="flex flex-col items-center gap-2 mt-2">
                      {!canResend ? (
                        <Text className="text-center text-sm text-black_313131">
                          Resend otp in{" "}
                          <span className="font-semibold">
                            00:{String(resendTimer).padStart(2, "0")}
                          </span>
                        </Text>
                      ) : (
                        <Button
                          type="button"
                          className="text-blue-600 disabled:text-gray-400 cursor-pointer"
                          onClick={handleResendOtp}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </div>
                  )}
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
          <Container className="hidden md:flex w-full h-fit relative rounded-[30px] items-center justify-center">
            <Image
              src={SetPasswordImg.src}
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

export default ResetPassword;
