"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Popup, Container } from "@/components/common";
import { useDispatch } from "react-redux";
import { markInterested } from "@/store/user/userAPI";
import type { AppDispatch } from "@/store"; // <-- Import your AppDispatch type
import { toast } from "react-toastify";

interface InterestFormProps {
  setShowInterestForm: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  bannerId: string; // <-- Add this
}

interface FormValues {
  comment: string;
}
const InterestForm: React.FC<InterestFormProps> = ({
  setShowInterestForm,
  setUpdate,
  bannerId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = async (data: FormValues) => {
    try {
      const res = await dispatch(
        markInterested({ bannerId, comment: data.comment })
      ).unwrap();
        if (res?.message) {
          toast.success(res.message);
        } else {
          toast.success("Successfully Commented.");
        }
        setUpdate(prev=>!prev);
      setShowInterestForm(false);
    } catch (error) {
      console.error("Failed to mark interested:", error);
    }
  };

  return (
    <Popup setShowAddBanner={setShowInterestForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl mx-auto bg-white border-2 border-violet-500 rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          You are Interested!
        </h2>

        <Container className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Write a comment
          </label>
          <textarea
            id="comment"
            {...register("comment", { required: "Comment is required" })}
            placeholder="Share your thoughts or feedback..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
          {errors.comment && (
            <p className="text-sm text-red-500 mt-1">
              {errors.comment.message}
            </p>
          )}
        </Container>

        <Container className="flex justify-center mt-6">
          <Button type="submit" className="bg-[#4f46e5] text-white">
            Submit
          </Button>
        </Container>
      </form>
    </Popup>
  );
};

export default InterestForm;
