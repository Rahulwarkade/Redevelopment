"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  Select,
  Popup,
  Container,
} from "@/components/common";
import { useAppDispatch } from "@/store/hooks";
import {
  addBanner,
  getCategories,
  getTrafficUnits,
} from "@/store/user/userAPI";
import { toast } from "react-toastify";
import RadioToggle from "../common/RadioToggle/RadioToggle";

interface FormValues {
  name: string;
  websiteUrl: string;
  category: string;
  isPaid: boolean;
  amount: string;
  dr: string;
  da: string;
  pa: string;
  trafficValue: string;
  trafficUnit: string;
  gp: string;
  ex: string;
  isGuestPost: boolean;
  isExchangePost: boolean;
  isPublic: boolean;
}

interface Category {
  _id: string;
  name: string;
}

interface TrafficUnit {
  _id: string;
  name: string;
}

const AddBanner: React.FC<{
  setShowAddBanner: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowAddBanner }) => {
  const dispatch = useAppDispatch();
  const cancleRef = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trafficUnits, setTrafficUnits] = useState<TrafficUnit[]>([]);
  const [urlStatus, setURLStatus] = useState<boolean>(true);
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      websiteUrl: "",
      category: "",
      isPaid: true,
      amount: "",
      dr: "",
      da: "",
      pa: "",
      trafficValue: "",
      trafficUnit: "month",
      gp: "",
      ex: "",
      isGuestPost: false,
      isExchangePost: false,
      isPublic: true,
    },
  });

  // Fetch categories and traffic units on mount
  useEffect(() => {
    const tempToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    dispatch(getCategories(tempToken || ""))
      .unwrap()
      .then((categories: Category[]) => {
        setCategories(categories);
        // Set default category to first category's _id if available
        if (categories.length > 0) {
          setValue("category", categories[0]._id);
        }
      })
      .catch((error: string) => {
        toast.error(error || "Failed to fetch categories");
      });

    dispatch(getTrafficUnits(tempToken || ""))
      .unwrap()
      .then((trafficUnits: TrafficUnit[]) => {
        setTrafficUnits(trafficUnits);
        // Set default trafficUnit to first _id if available
        if (trafficUnits.length > 0) {
          setValue("trafficUnit", trafficUnits[0]._id);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch traffic units");
      });
  }, [dispatch, setValue]);

  const isPaid = watch("isPaid");

  const onSubmit = async (data: FormValues) => {
    try {
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }
      // Map form data to backend structure
      const payload = {
        ...data,
        traffic: `${data.trafficValue}/${data.trafficUnit}`,
      };
      await dispatch(addBanner({ banner: payload, token })).unwrap();
      toast.success("Banner published successfully!");
      setShowAddBanner(false);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        toast.error(
          (error as { message?: string }).message || "Failed to publish banner."
        );
      } else {
        toast.error("Failed to publish banner.");
      }
    }
  };

  useEffect(() => {
    const currentRef = cancleRef.current;
    const handleCancle = (event: MouseEvent) => {
      setShowAddBanner(false);
      event.stopPropagation();
    };
    if (currentRef) {
      currentRef.addEventListener("click", handleCancle);
    }

    return () => {
      if (currentRef) currentRef?.removeEventListener("click", handleCancle);
    };
  });
  return (
    <Popup>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[830px] mx-auto rounded-[4px] overflow-hidden"
      >
        <Container className="w-full h-10 md:h-20 bg-gradient-to-r from-[#9181F4] to-[#5038ED] flex justify-center items-center">
          <h2 className="text-[26px] font-semibold text-white">
            Create Your Banner
          </h2>
        </Container>

        <Container className="w-full relative bg-white px-6 py-5 grid gap-5">
          {/* First row */}
          <Container className="grid md:grid-cols-3 gap-5">
            {/* Name Container */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  label="Name"
                  placeholder="AI Expert Blog"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />

            {/* Website URL */}
            <Controller
              name="websiteUrl"
              control={control}
              rules={{ required: "Website URL is required" }}
              render={({ field }) => (
                <Input
                  label="Website URL"
                  placeholder="www.chatgpt.com"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  error={errors.websiteUrl?.message}
                  {...field}
                />
              )}
            />
            {/* Category input Container */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  label="Category"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  options={categories.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                  }))}
                  {...field}
                />
              )}
            />
          </Container>

          {/* Second Row */}
          <Container className="grid md:grid-cols-2">
            {/* isPaid yes and NO */}
            <Container className="flex items-center gap-[52px] pt-4">
              <label className="text-base text-[#747B85] text-nowrap">
                Is Paid
              </label>
              <Container className="flex gap-8">
                <Controller
                  name="isPaid"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Container className="flex gap-8">
                        <label className="flex items-center gap-2">
                          <div
                            className={`min-w-[30px] min-h-[30px] rounded-full flex justify-center items-center ${
                              isPaid
                                ? "bg-[#6956E5]"
                                : "bg-white border border-[#B0B0B0]"
                            }`}
                            onClick={() => {
                              field.onChange(true);
                            }}
                          >
                            <div
                              // name="isPaid"
                              // checked={field.value === true}
                              // onChange={() => field.onChange(true)}
                              className="w-4 h-4 rounded-full bg-white outline-none"
                            />
                          </div>
                          <span className="text-base text-[#747B85]">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <div
                            className={`min-w-[30px] min-h-[30px] rounded-full flex justify-center items-center ${
                              isPaid
                                ? "border border-[#B0B0B0] bg-white"
                                : " bg-[#6956E5]"
                            }`}
                            onClick={() => {
                              field.onChange(false);
                            }}
                          >
                            <div
                              // name="isPaid"
                              // checked={field.value === false}
                              // onChange={() => setPaidStatus(false)}
                              className="w-4 h-4 rounded-full bg-white outline-none"
                            />
                          </div>
                          <span className="text-base text-[#747B85]">No</span>
                        </label>
                      </Container>
                    );
                  }}
                />
              </Container>
              {errors.isPaid && (
                <span className="text-xs text-red-500">
                  {errors.isPaid.message}
                </span>
              )}
            </Container>
            {/* Amount input container */}
            {isPaid && (
              <Controller
                name="amount"
                control={control}
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <Input
                    // label="Amount"
                    type="number"
                    placeholder="Amount"
                    className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                    labelClassName="text-base text-[#747B85]"
                    error={errors.amount?.message}
                    {...field}
                  />
                )}
              />
            )}
          </Container>

          {/* Third Row */}
          <Container className="grid md:grid-cols-4 gap-2">
            {/* Matrics (DR) */}
            <Controller
              name="dr"
              control={control}
              rules={{ required: "DR is required" }}
              render={({ field }) => (
                <Input
                  label="Metrics (DR)"
                  placeholder="80"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  error={errors.dr?.message}
                  {...field}
                />
              )}
            />
            {/* Matrics (DA) */}
            <Controller
              name="da"
              control={control}
              rules={{ required: "DA is required" }}
              render={({ field }) => (
                <Input
                  label="Metrics (DA)"
                  placeholder="40"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  error={errors.da?.message}
                  {...field}
                />
              )}
            />
            {/* Matrics (PA) */}
            <Controller
              name="pa"
              control={control}
              rules={{ required: "PA is required" }}
              render={({ field }) => (
                <Input
                  label="Metrics (PA)"
                  placeholder="40"
                  className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                  labelClassName="text-base text-[#747B85]"
                  error={errors.pa?.message}
                  {...field}
                />
              )}
            />
            {/* Trafic input Container */}
            <Container className="flex gap-1">
              {/* Traffic Value input */}
              <Controller
                name="trafficValue"
                control={control}
                rules={{ required: "Traffic value is required" }}
                render={({ field }) => (
                  <Input
                    label="Traffic Value"
                    placeholder="10K"
                    className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                    labelClassName="text-base text-[#747B85] text-nowrap"
                    error={errors.trafficValue?.message}
                    {...field}
                  />
                )}
              />
              {/* Traffic Unit */}
              <Controller
                name="trafficUnit"
                control={control}
                rules={{ required: "Traffic unit is required" }}
                render={({ field }) => (
                  <Select
                    label="Traffic Unit"
                    className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                    labelClassName="text-base text-[#747B85] text-nowrap"
                    options={trafficUnits.map((unit) => ({
                      label: unit.name,
                      value: unit._id,
                    }))}
                    // error={errors.trafficUnit?.message}
                    {...field}
                  />
                )}
              />
            </Container>
          </Container>

          {/* <Controller
            name="gp"
            control={control}
            render={({ field }) => (
              <Input
                label="GP"
                placeholder="GP"
                error={errors.gp?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="ex"
            control={control}
            render={({ field }) => (
              <Input
                label="EX"
                placeholder="EX"
                error={errors.ex?.message}
                {...field}
              />
            )}
          /> */}
          {/* Fourth Row */}
          {/* Radios Container */}
          <Container className="grid md:grid-cols-4">
            {/* Guest Post */}
            <Controller
              name="isGuestPost"
              control={control}
              render={({ field }) => (
                <RadioToggle
                  label="Guest Post"
                  checked={!!field.value}
                  onChange={(val) => field.onChange(val)}
                  labelClassName="text-base text-[#747B85] text-nowrap"
                />
              )}
            />
            <Controller
              name="isExchangePost"
              control={control}
              render={({ field }) => (
                <RadioToggle
                  label="Exchange Post"
                  checked={!!field.value}
                  onChange={(val) => field.onChange(val)}
                  labelClassName="text-base text-[#747B85] text-nowrap"
                />
              )}
            />
            {/* isPublic radio */}
            <Container className="flex gap-8 col-span-2">
              <label className="text-base text-[#747B85] text-nowrap">
                Website URL
              </label>
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Container className="flex gap-8">
                    <label className="flex items-center gap-2">
                      <div
                        className={`min-w-[30px] min-h-[30px] rounded-full flex justify-center items-center ${
                          urlStatus
                            ? "bg-[#6956E5]"
                            : "bg-white border border-[#B0B0B0]"
                        }`}
                        onClick={() => {
                          field.onChange(true);
                          setURLStatus(true);
                        }}
                      >
                        <div className="w-4 h-4 rounded-full bg-white outline-none" />
                      </div>
                      <span className="text-base text-[#747B85]">Public</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <div
                        className={`min-w-[30px] min-h-[30px] rounded-full flex justify-center items-center ${
                          urlStatus
                            ? "border border-[#B0B0B0] bg-white"
                            : " bg-[#6956E5]"
                        }`}
                        onClick={() => {
                          field.onChange(false);
                          setURLStatus(false);
                        }}
                      >
                        <div className="w-4 h-4 rounded-full bg-white outline-none" />
                      </div>
                      <span className="text-base text-[#747B85]">Private</span>
                    </label>
                  </Container>
                )}
              />
            </Container>
          </Container>
        </Container>

        <Container className="flex justify-end items-center gap-4 w-full bg-[#F3F3F3] h-[35px] md:h-[72px] p-5 backdrop-blur-2xl">
          <Button type="button" variant="outline">
            <span ref={cancleRef}>Cancel</span>
          </Button>
          <Button type="submit" className="bg-[#515DEF] text-white">
            Publish Banner
          </Button>
        </Container>
      </form>
    </Popup>
  );
};

export default AddBanner;
