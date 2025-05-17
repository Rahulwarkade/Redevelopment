"use client";
import React, { useState } from "react";
import {
  Button,
  Container,
  FeedContent,
  Image,
  Text,
  AddBanner,
} from "@/components";
import { NewYearParty, PetalBg } from "@/assets/Images";
import { FilterIcon, StarIcon } from "@/assets/icons/svgIcons";
const DashboardContent: React.FC = () => {
  const [showAddBanner, setShowAddBanner] = useState(false);

  return (
    <Container className="w-full relative flex flex-col gap-5 pb-5 md:pb-[100px]">
      {/* Header Container */}
      <Container className="w-full h-[200px] md:h-[278px] relative bg-[#515DEF] rounded-3xl overflow-hidden">
        {/* Background Image Container */}
        <Container className="w-full h-full absolute flex items-center">
          <Image
            src={PetalBg.src}
            alt="backgroundImage"
            width={914}
            height={248}
          />
        </Container>

        <Container className="w-full h-full absolute flex justify-between items-center px-5 md:px-[56px]">
          {/* Heading Container */}
          <Container>
            <Text className="text-white text-base md:text-[30px] font-semibold uppercase">
              Ternding Post This Month
            </Text>
            <Text className="text-sm md:text-lg text-white font-medium capitalize">
              Watching to trending posts in this months
            </Text>
          </Container>
          {/* Svg Image Container */}
          <Image src={NewYearParty.src} alt="svg" width={216} height={252} />
        </Container>
      </Container>

      {/* Filter Container */}
      <Container className="w-full relative flex justify-between items-center py-2.5 px-3 md:px-5 bg-gray_ebf0fb rounded-[5px]">
        <Container className="w-fit flex gap-2.5 items-center">
          <Text
            variant="h3"
            className="text-xs md:text-2xl font-semibold capitalize"
          >
            Filter
          </Text>
          <span className="rounded-full p-[6px] bg-white">
            <StarIcon strokeColor="#838A91" className="relative" />
          </span>
        </Container>

        <Container className="w-fit flex gap-4">
          <Button
            leftIcon={<FilterIcon strokeColor="#515DEF" className="relative" />}
            className="py-[3px] md:py-[6px] px-3 md:px-6 border rounded-[5px] border-[#515def] text-xs md:text-2xl"
          >
            Filter
          </Button>
          <Button
            className="py-[3px] md:py-[6px] px-3 md:px-6 rounded-[5px] bg-[#515def] text-white text-xs md:text-base font-semibold"
            onClick={() => setShowAddBanner(true)}
          >
            Add New Banner
          </Button>
        </Container>
      </Container>

      {/* Feed Section Job Posts */}
      <Container className="w-full relative">
        <FeedContent />
      </Container>

      {/* AddBanner Modal */}
      {showAddBanner && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-[10px] p-6 max-w-[90%] w-[500px] relative">
            <button
              onClick={() => setShowAddBanner(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
                 <AddBanner onClose={() => setShowAddBanner(false)} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default DashboardContent;
