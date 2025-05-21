"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  Select,
  Toggle,
  Radio,
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

  useEffect(()=>{
    const currentRef = cancleRef.current;
    const handleCancle = (event : MouseEvent)=>{
      setShowAddBanner(false);
      event.stopPropagation();
    }
    if(currentRef){
      currentRef.addEventListener('click',handleCancle);
    }

    return ()=>{
      if(currentRef) currentRef?.removeEventListener('click',handleCancle);
    }
  })
  return (
    <Popup setShowAddBanner={setShowAddBanner}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg border"
      >
        <h2 className="text-2xl font-semibold text-center text-[#4B0082] mb-6">
          Create Your Banner
        </h2>

        <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                label="Name"
                placeholder="AI Expert Blog"
                error={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="websiteUrl"
            control={control}
            rules={{ required: "Website URL is required" }}
            render={({ field }) => (
              <Input
                label="Website URL"
                placeholder="www.chatgpt.com"
                error={errors.websiteUrl?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                label="Category"
                options={categories.map((cat) => ({
                  label: cat.name,
                  value: cat._id,
                }))}
                {...field}
              />
            )}
          />
          <Container className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Is Paid</label>
            <Container className="flex gap-4 mt-2">
              <Controller
                name="isPaid"
                control={control}
                rules={{ required: "Is Paid is required" }}
                render={({ field }) => (
                  <>
                    <Radio
                      label="Yes"
                      checked={field.value}
                      onChange={() => field.onChange(true)}
                    />
                    <Radio
                      label="No"
                      checked={!field.value}
                      onChange={() => field.onChange(false)}
                    />
                  </>
                )}
              />
            </Container>
            {errors.isPaid && (
              <span className="text-xs text-red-500">
                {errors.isPaid.message}
              </span>
            )}
          </Container>

          {isPaid && (
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <Input
                  label="Amount"
                  type="number"
                  placeholder="$100"
                  error={errors.amount?.message}
                  {...field}
                />
              )}
            />
          )}

          <Controller
            name="dr"
            control={control}
            rules={{ required: "DR is required" }}
            render={({ field }) => (
              <Input
                label="Metrics (DR)"
                placeholder="80"
                error={errors.dr?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="da"
            control={control}
            rules={{ required: "DA is required" }}
            render={({ field }) => (
              <Input
                label="Metrics (DA)"
                placeholder="40"
                error={errors.da?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="pa"
            control={control}
            rules={{ required: "PA is required" }}
            render={({ field }) => (
              <Input
                label="Metrics (PA)"
                placeholder="40"
                error={errors.pa?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="trafficValue"
            control={control}
            rules={{ required: "Traffic value is required" }}
            render={({ field }) => (
              <Input
                label="Traffic Value"
                placeholder="10K"
                error={errors.trafficValue?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="trafficUnit"
            control={control}
            rules={{ required: "Traffic unit is required" }}
            render={({ field }) => (
              <Select
                label="Traffic Unit"
                options={trafficUnits.map((unit) => ({
                  label: unit.name,
                  value: unit._id,
                }))}
                // error={errors.trafficUnit?.message}
                {...field}
              />
            )}
          />
          <Controller
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
          />
        </Container>

        <Container className="flex items-center gap-6 mt-6 flex-wrap">
          <Controller
            name="isGuestPost"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Guest Post"
                checked={field.value}
                onChange={field.onChange}
                // error={errors.isGuestPost?.message}
              />
            )}
          />
          <Controller
            name="isExchangePost"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Exchange Post"
                checked={field.value}
                onChange={field.onChange}
                // error={errors.isExchangePost?.message}
              />
            )}
          />
          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Public"
                checked={field.value}
                onChange={field.onChange}
                // error={errors.isPublic?.message}
              />
            )}
          />
        </Container>

        <Container className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="outline">
            <span ref={cancleRef}>Cancel</span>
          </Button>
          <Button type="submit">Publish Banner</Button>
        </Container>
      </form>
    </Popup>
  );
};

export default AddBanner;
