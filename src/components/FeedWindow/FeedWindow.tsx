'use client'
import React from "react";
import { Button, Container, FeedContent, Image, Text } from "@/components";
import { PetalBg, ModernWoman } from "@/assets/Images";
import { FilterIcon, StarIcon } from "@/assets/icons/svgIcons";

const FeedWindow: React.FC = () => {

  return (
    <Container className="w-full relative flex flex-col gap-5 pb-5 md:pb-[100px]">
      {/* Header Container */}
      <Container className="w-full h-[200px] md:h-[278px] relative bg-gradient-to-r from-[#DB8F82] vai-[#DB8F826B] from-40% via-60% to-[#515DEF] to-100% rounded-3xl overflow-hidden">
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
          <Container className="w-fit flex flex-col gap-4">
            <Text className="text-white text-base md:text-[30px] font-semibold uppercase">
              AI Expert Blog
            </Text>
            <span className="flex text-white gap-1">
              <Text className="text-white text-xs xl:text-sm text-nowrap">
                DR: {80}
              </Text>
              |
              <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
                DA: {80}
              </Text>{" "}
              |
              <Text className="text-white text-xs xl:text-sm text-nowrap">
                PA: {80}
              </Text>
            </span>

            <Button className="uppercase font-bold px-6 py-[10px] rounded-[6px] bg-white text-[#515DEF] flex justify-center itmes-center">View Now </Button>
          </Container>
          {/* Svg Image Container */}
          <Container className="w-fit translate-x-[50px]">
            <Image src={ModernWoman.src} alt="svg" width={440} height={293}/>
          </Container>
        </Container>
      </Container>
      {/* Filter Container */}
      <Container className="w-full relative flex justify-between items-center py-2.5 px-3 md:px-5 bg-gray_ebf0fb rounded-[5px]">
        <Container className="w-fit flex gap-2.5 items-center">
          <Text variant="h3" className="text-xs md:text-2xl font-semibold capitalize">
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
          >
            Add New Banner
          </Button>
        </Container>
      </Container>

      {/* Feed Section Job Posts */}
      <Container className="w-full relative">
        <FeedContent />
      </Container>

    </Container>
  );
};

export default FeedWindow;
