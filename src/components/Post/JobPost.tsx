"use client";
import React, { useState } from "react";
import { Button, Container, Image, Text, Interested } from "@/components";
import { Icons } from "@/assets/icons";
import { Banner } from "@/types/custom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { declineBanner } from "@/store/user/userAPI";
import { AppDispatch } from "@/store";


const JobPost = ({ banner, setUpdate }: { banner: Banner, setUpdate : React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {
    name,
    category,
    isPaid,
    amount,
    dr,
    da,
    pa,
    trafficValue,
    trafficUnit,
    gp,
    ex,
    userStatus
  } = banner || {};

  const [showInterestForm, setShowInterestForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const bannerId = banner?._id;
  const handleInterested = () => {
    setShowInterestForm(true); // Show the popup
  };
  const handleDecline = async () => {
    if (bannerId) {
      try {
        const res = await dispatch(declineBanner(bannerId)).unwrap();

        if (res?.message) {
          toast.success(res.message);
        } else {
          toast.success("Banner declined successfully.");
        }

      } catch (err) {
        console.error("Decline banner error:", err);
      }
    }
  };

  return (
    <>
      {/* Show Interested popup */}
      {showInterestForm && (
        <Interested setShowInterestForm={setShowInterestForm} bannerId={bannerId} setUpdate={setUpdate} />
      )}
      <Container className="w-full h-full relative rounded-[10px] border border-gray_dedede drop-shadow-sm backdrop-blur-sm overflow-hidden">
        {/* Main Container */}
        <Container className="w-full relative p-4">
          {/* Title and Tag */}
          <Container className="w-full relative flex gap-2 items-center">
            <Text
              variant="h3"
              className="text-base md:text-xl text-black_27272e font-semibold capitalize line-clamp-2"
            >
              {name || "Untitled Job"}
            </Text>
            <span
              className={`px-[10px] py-[2px] rounded-[3px] ${
                isPaid ? "bg-orange_fbb03b" : "bg-[#66eb9f]"
              } text-white`}
            >
              {isPaid ? "Paid" : "Free"}
            </span>
          </Container>

          {/* Metrics: DR, DA, PA */}
          <Container className="w-full relative flex justify-between mt-2 flex-wrap">
            <Container className="w-fit relative flex items-center gap-1">
              <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
                DR: {dr ?? "--"}
              </Text>
              |
              <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
                DA: {da ?? "--"}
              </Text>
              |
              <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
                PA: {pa ?? "--"}
              </Text>
            </Container>

            {/* GP and EX Icons */}
            <Container className="w-fit relative flex items-center gap-[10px]">
              <Container className="flex gap-1 items-center">
                <Text className="text-black_425466 text-xs md:text-sm">
                  GP:
                </Text>
                <span className="size-[18px] bg-[#6956E5] rounded-full flex items-center justify-center">
                  <Image
                    src={gp > 0 ? Icons.Done : Icons.Close}
                    alt="GP"
                    width={10}
                    height={10}
                  />
                </span>
              </Container>
              <Container className="flex gap-1 items-center">
                <Text className="text-black_425466 text-xs md:text-sm">
                  EX:
                </Text>
                <span className="size-[18px] bg-[#C4C4C4] rounded-full flex items-center justify-center">
                  <Image
                    src={ex > 0 ? Icons.Done : Icons.Close}
                    alt="EX"
                    width={10}
                    height={10}
                  />
                </span>
              </Container>
            </Container>
          </Container>

          {/* Payment Info */}
          <Container className="w-full relative flex justify-between mt-2">
            <Container className="w-fit flex gap-1 items-center">
              <Text className="text-black_425466 text-xs md:text-sm">
                IsPaid:
              </Text>
              <span className="size-[18px] bg-[#66CB9F] rounded-full flex items-center justify-center">
                <Image
                  src={isPaid ? Icons.Done : Icons.Close}
                  alt="isPaid"
                  width={10}
                  height={10}
                />
              </span>
              <Text className="text-black_425466 text-xs md:text-sm">
                {isPaid ? "Yes" : "No"}
              </Text>
            </Container>

            <Container className="w-fit flex gap-1 items-center">
              <Text className="text-black_425466 text-xs md:text-sm">
                Amount:
              </Text>
              <span className="px-[6px] rounded-[4px] bg-orange_fbb03b text-white">
                ₹{amount?.toLocaleString() ?? "0"}
              </span>
            </Container>
          </Container>

          {/* Buttons */}
          <Container className="w-full flex justify-center gap-3 mt-4">
            <Button
              className={`px-4 py-2 rounded-[4px] bg-[#515DEF] text-white text-sm md:text-base font-medium  ${(userStatus != "none" && userStatus != 'rejected') ? " cursor-default opacity-60" : "cursor-pointer"}`}
              onClick={handleInterested}
              disabled={(userStatus != "none" && userStatus != "rejected")}
            >
              Interested
            </Button>
            <Button
              className={`px-4 py-2 rounded-[4px] border border-[#515DEF] text-[#515DEF] text-sm md:text-base font-medium ${(userStatus == "none" || userStatus == "rejected") ? " cursor-default opacity-60" : "cursor-pointer"}`}
              onClick={handleDecline}
              disabled={(userStatus == "none" || userStatus == "rejected")}
            >
              Decline
            </Button>
          </Container>
        </Container>

        {/* Footer Info */}
        <Container className="w-full flex justify-between items-center px-4 py-[7px] bg-gray_eef2fd border-t border-[#b9c1c1]">
          <Container className="w-fit">
            <Text className="text-xs md:text-sm text-black_425466">
              Traffic:{" "}
              <span className="font-medium">
                {trafficValue ?? 0}
                {trafficUnit?.name ? `/${trafficUnit.name}` : ""}
              </span>
            </Text>
          </Container>
          <Container className="w-fit">
            <Text className="text-xs md:text-sm text-black_425466">
              Category:{" "}
              <span className="font-medium">{category?.name ?? "N/A"}</span>
            </Text>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default JobPost;
