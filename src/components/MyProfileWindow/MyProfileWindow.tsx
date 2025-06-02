"use client";
import React, { useState, useEffect } from "react";
import { Container, Text, Button, Input, Image, PlanFeed } from "@/components";
import { Icons } from "@/assets/icons";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  updateProfile,
  updatePassword,
  getAllPlans,
  uploadProfileImage,
  createCheckoutSession,
} from "@/store/user/userAPI";
import { toast } from "react-toastify";
import { Country, ProfileType } from "@/types/custom";
import CountrySelect from "../CountrySelect/CountrySelect";
import axiosInstance from "@/utils/axios"; // Make sure this is your axios setup
import { useForm } from "react-hook-form";

const MyProfileWindow = () => {
  const user: ProfileType | undefined = useAppSelector(
    (state) => state.user?.profile?.data
  );
  const [profile, setProfile] = useState<ProfileType>();
  const dispatch = useAppDispatch();
  const [openTab, setOpenTab] = useState("information");

  const GeneralInformation = () => {
    const countries = useAppSelector((state) => state.country.countries);
    const [isEditing, setIsEditing] = useState(false);
    const [genders, setGenders] = useState<
      { _id: string; code: string; name: string }[]
    >([]);
    const [selectedGenderId, setSelectedGenderId] = useState<string>("");

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
      null
    );
    const [uploading, setUploading] = useState(false);

    // React Hook Form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<{
      fullName: string;
      phoneNumber: string;
      address: string;
    }>({
      defaultValues: {
        fullName: profile?.fullName || "",
        phoneNumber: profile?.phoneNumber || "",
        address: profile?.address || "",
      },
    });

    // Fetch genders on mount
    useEffect(() => {
      if (user) setProfile(user);
      axiosInstance.get("/static/genders").then((res) => {
        setGenders(res.data.data || []);
        if (profile?.gender) {
          if (typeof profile.gender === "string") {
            setSelectedGenderId(profile.gender);
          } else if (typeof profile.gender === "object" && "_id" in profile.gender) {
            setSelectedGenderId((profile.gender as any)._id);
          }
        }
      });
    }, []);

    // Set selected country from profile
    useEffect(() => {
      if (profile?.countryPhoneCode?._id && countries && countries.length > 0) {
        const found = countries.find(
          (c) => c._id === profile?.countryPhoneCode?._id
        );
        if (found) setSelectedCountry(found);
      }
    }, [countries]);

    // Reset form values when profile changes or cancel is clicked
    useEffect(() => {
      reset({
        fullName: profile?.fullName || "",
        phoneNumber: profile?.phoneNumber || "",
        address: profile?.address || "",
      });
      if (profile?.gender) {
        if (typeof profile.gender === "object" && "_id" in profile.gender) {
          setSelectedGenderId((profile.gender as any)._id);
        } else if (typeof profile.gender === "string") {
          setSelectedGenderId(profile.gender);
        }
      }
      if (profile?.countryPhoneCode?._id && countries.length > 0) {
        const found = countries.find(
          (c) => c._id === profile?.countryPhoneCode?._id
        );
        if (found) setSelectedCountry(found);
      }
    }, [isEditing,  countries, reset]);

    const handleProfileUpdate = async (data: {
      fullName: string;
      phoneNumber: string;
      address: string;
    }) => {
      const payload = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        countryPhoneCode: selectedCountry?._id,
        gender: selectedGenderId,
        address: data.address,
      };
      try {
        const res = await dispatch(updateProfile(payload)).unwrap();
        if (res.success) {
          toast.success("Profile updated successfully!");
          setIsEditing(false);
          setProfile(res?.data);
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to update profile");
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      reset();
      if (profile?.gender) {
        if (typeof profile.gender === "object" && "_id" in profile.gender) {
          setSelectedGenderId((profile.gender as any)._id);
        } else if (typeof profile.gender === "string") {
          setSelectedGenderId(profile.gender);
        }
      }
      if (profile?.countryPhoneCode?._id && countries.length > 0) {
        const found = countries.find(
          (c) => c._id === profile?.countryPhoneCode?._id
        );
        if (found) setSelectedCountry(found);
      }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const res = await dispatch(uploadProfileImage(file)).unwrap();
        console.log("Profile image upload response:", res);
        toast.success("Profile image updated!");
        // Optionally update profile image in UI
        setProfile((prev) => prev ? { ...prev, profileImage: res.data.profileImage } : prev);
      } catch (err: any) {
        toast.error(err?.message || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };

    return (
      <Container className="w-full h-full relative p-[30px] flex flex-col gap-[30px] overflow-auto">
        <Container className="w-full relative">
          <Text className="text-base md:text-2xl font-medium text-black">
            General Information
          </Text>
          <Text className="text-sm md:text-xl text-[#787774]">
            Update your account settings.
          </Text>
        </Container>

        <Container className="w-full relative">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleProfileUpdate)}
          >
            <Container className="w-full flex flex-col md:flex-row md:items-end gap-6">
              <Container className="w-full flex flex-col gap-4">
                <Input
                  label="Full Name"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="Enter your name..."
                  containerClassName="w-full"
                  className="w-full h-[60px] rounded-[6px] border border-[#DEDEDE]"
                  readOnly={!isEditing}
                  {...register("fullName", {
                    required: "Full name is required.",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters.",
                    },
                  })}
                  error={errors.fullName?.message}
                  errorClassName="text-red-500 text-sm pl-6"
                />

                <Input
                  label="Email"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="john.doe@email.com"
                  containerClassName="w-full"
                  className="w-full h-[60px] rounded-[6px] border border-[#DEDEDE]"
                  value={profile?.email}
                  readOnly
                />

                <Container className="w-full flex gap-6">
                  <CountrySelect
                    value={selectedCountry}
                    onChange={(country) =>
                      isEditing && setSelectedCountry(country)
                    }
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone Number"
                    labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                    placeholder="123456789"
                    containerClassName="w-full"
                    className="w-full h-[60px] rounded-[6px] border border-[#DEDEDE]"
                    readOnly={true}
                    {...register("phoneNumber", {
                      required: "Phone number is required.",
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: "Enter a valid phone number.",
                      },
                    })}
                    error={errors.phoneNumber?.message}
                    errorClassName="text-red-500 text-sm pl-6"
                  />
                </Container>
              </Container>

              <Container className="w-fit rounded-[4px] px-[70px] py-[40px] flex flex-col gap-1 items-center justify-center border border-[#DEDEDE]">
                <label className="cursor-pointer flex flex-col items-center">
                  <span className="size-[38px] relative flex">
                    <Image
                      src={profile?.profileImage || Icons.Upload}
                      alt="upload"
                      fill
                      className="object-cover rounded-full"
                    />
                    {uploading && (
                      <span className="absolute inset-0 flex items-center justify-center bg-white/60">
                        <span className="loader" /> {/* Replace with your loader if needed */}
                      </span>
                    )}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  <Text className="text-xs md:text-sm text-[#191D23] text-nowrap">
                    {uploading ? "Uploading..." : "Upload Photo"}
                  </Text>
                </label>
              </Container>
            </Container>

            {/* Gender */}
            <Container className="w-full">
              <Text className="text-[#747B85] text-sm md:text-base font-normal text-nowrap">
                Gender
              </Text>
              <Container className="flex gap-4">
                {genders.map((g) => (
                  <button
                    key={g._id}
                    type="button"
                    className={`px-2 py-[10px] rounded-[6px] border flex items-center justify-center gap-1 ${
                      selectedGenderId === g._id
                        ? "border-[#515DEF] bg-[#F2F5FF]"
                        : "border-[#DEDEDE] bg-white"
                    }`}
                    onClick={() => isEditing && setSelectedGenderId(g._id)}
                  >
                    <Text className="text-xs md:text-sm text-[#575757]">
                      {g.name}
                    </Text>
                  </button>
                ))}
              </Container>
            </Container>

            {/* Address */}
            <Container className="w-full">
              <Input
                label="Address"
                labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                placeholder="Address line"
                containerClassName="w-full"
                className="w-full px-[18px] pt-[21px] pb-[70px] rounded-[6px] border border-[#DEDEDE]"
                readOnly={!isEditing}
                {...register("address", {
                  required: "Address is required.",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters.",
                  },
                })}
                error={errors.address?.message}
                errorClassName="text-red-500 text-sm pl-6"
              />
            </Container>

            {/* Actions */}
            <Container className="w-full flex gap-3 justify-end px-6">
              {!isEditing ? (
                <Button
                  type="button"
                  className="px-6 py-[10px] border border-[#515DEF] text-[#515DEF]"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    className="px-6 py-[10px] border border-[#515DEF] text-[#515DEF]"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-6 py-[10px] border border-[#515DEF] text-white bg-[#515DEF]"
                  >
                    Update
                  </Button>
                </>
              )}
            </Container>
          </form>
        </Container>
      </Container>
    );
  };

  const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);

    // React Hook Form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      reset,
    } = useForm<{
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }>();

    // Password validation logic (same as SignUp)
    function validatePassword(password: string) {
      if (!/.{8,}/.test(password)) {
        return "Password must be at least 8 characters long.";
      }
      if (!/\d/.test(password)) {
        return "Password must contain at least one digit.";
      }
      if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      }
      return true;
    }

    const onSubmit = async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      if (data.newPassword !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match.",
        });
        return;
      }
      const passwordValidation = validatePassword(data.newPassword);
      if (passwordValidation !== true) {
        setError("newPassword", {
          type: "manual",
          message: String(passwordValidation),
        });
        return;
      }
      try {
        const res = await dispatch(updatePassword(data)).unwrap();
        if (res.success) {
          toast.success("Password updated successfully!");
          setIsEditing(false);
          reset();
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to update password");
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
      reset();
    };

    return (
      <Container className="w-full h-full relative p-[30px] flex flex-col gap-[30px]">
        <Container className="w-full relative">
          <Text className="text-base md:text-2xl font-medium text-black">
            Password Reset
          </Text>
          <Text className="text-sm md:text-xl text-[#787774]">
            Update your password here. Enter your current and new password.
          </Text>
        </Container>

        <Container className="w-full relative">
          <form
            className="w-full relative flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Container className="w-full relative flex flex-col gap-6">
              <Container className="w-full relative flex flex-col md:flex-row gap-4">
                <Input
                  label="Current Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="password"
                  containerClassName="w-full flex flex-col relative overflow-hidden"
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  type="password"
                  readOnly={!isEditing}
                  {...register("currentPassword", {
                    required: "Current password is required.",
                  })}
                  error={errors.currentPassword?.message}
                  errorClassName="text-red-500 text-sm pl-6"
                />
                <Input
                  label="New Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="password"
                  containerClassName="w-full flex flex-col relative overflow-hidden"
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  type="password"
                  readOnly={!isEditing}
                  {...register("newPassword", {
                    required: "New password is required.",
                    minLength: 8,
                  })}
                  error={errors.newPassword?.message}
                  errorClassName="text-red-500 text-sm pl-6"
                />
                <Input
                  label="Confirm Password"
                  labelClassName="text-[#747B85] text-sm md:text-base font-normal text-nowrap pl-[6px]"
                  placeholder="Confirm password"
                  containerClassName="w-full flex flex-col relative overflow-hidden"
                  className="w-full h-[60px] relative rounded-[6px] border border-[#DEDEDE] outline-none"
                  type="password"
                  readOnly={!isEditing}
                  {...register("confirmPassword", {
                    required: "Confirm password is required.",
                    minLength: 8,
                  })}
                  error={errors.confirmPassword?.message}
                  errorClassName="text-red-500 text-sm pl-6"
                />
              </Container>

              <Container className="w-full relative flex gap-3 items-center justify-center md:justify-end px-6">
                {!isEditing ? (
                  <Button
                    type="button"
                    className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-[#515DEF]"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-[#515DEF]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-[10px] rounded-[4px] border border-[#515DEF] text-white bg-[#515DEF]"
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Container>
            </Container>
          </form>
        </Container>
      </Container>
    );
  };

  const BillingAndPayments = () => {
    const [plans, setPlans] = useState<any[]>([]);

    useEffect(() => {
      dispatch(getAllPlans())
        .unwrap()
        .then((res) => {
          // If your API returns { data: [...] }
          setPlans(res?.data || []);
        })
        .catch((err) => {
          console.error("Plans error:", err);
        });
    }, []);

    // Map planId or name to icon
    const getPlanIcon = (planId: string) => {
      if (planId === "free") return false;
      if (planId === "pro") return Icons.EnterpriseIcon;
      if (planId === "enterprise") return Icons.ProIcon;
      return false;
    };

    const handleGetStarted = async (planId: string, billingPeriod: string) => {
      try {
        const res = await dispatch(
          createCheckoutSession({ planId, billingPeriod })
        ).unwrap();
        console.log("Checkout session response:", res);
        // If your backend returns a URL for Stripe checkout, redirect:
        if(res.success)
          {
            const paymentUrl = res?.data?.url;
            window.location.href = paymentUrl;
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to start checkout session");
      }
    };

    return (
      <Container className="w-full h-full p-4 md:p-[30px] flex flex-col gap-[30px]">
        <Text className="text-base md:text-2xl font-medium text-black">
          Billing & Payments
        </Text>
        <Text className="text-sm md:text-xl text-[#787774]">
          Billing & Payments Manage Your Billing and Payments from here. You can
          also manage your payment methods from here.{" "}
        </Text>
        <Container className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PlanFeed
              key={plan._id}
              planDetails={{
                planIcon: getPlanIcon(plan.planId),
                planName: plan.name,
                Subscription: plan.price === 0 ? "Free" : `$${plan.price}`,
                SubscriptionDuration: plan.billingPeriod,
                planType: plan.name,
                features: plan.features,
                description: plan.description,
              }}
              isPro={plan.planId === "pro"}
              onGetStarted={() =>
                handleGetStarted(plan.planId, plan.billingPeriod)
              }
            />
          ))}
        </Container>
      </Container>
    );
  };

  return (
    <section className="w-full  bg-white_fdfdff rounded-[20px] border border-grey_e1e2ff ">
      <Container className="border-b border-[#E1E2FF] px-[30px] py-4">
        <Text className="text-base md:text-2xl font-semibold text-black">
          Settings
        </Text>
      </Container>

      <Container className="flex h-[70px] border-b border-[#E1E2FF]">
        {[
          { key: "information", label: "General Information" },
          { key: "password", label: "Change Password" },
          { key: "payment", label: "Billing & Payments" },
        ].map((tab) => (
          <Container
            key={tab.key}
            className={`w-full flex justify-center items-center cursor-pointer ${
              openTab === tab.key
                ? "bg-[#515DEF] text-white"
                : "border border-[#E1E2FF]"
            }`}
            onClick={() => setOpenTab(tab.key)}
          >
            <Text className="text-sm md:text-base lg:text-lg font-medium text-center">
              {tab.label}
            </Text>
          </Container>
        ))}
      </Container>

      {openTab === "information" && <GeneralInformation />}
      {openTab === "password" && <ChangePassword />}
      {openTab === "payment" && <BillingAndPayments />}
    </section>
  );
};

export default MyProfileWindow;
