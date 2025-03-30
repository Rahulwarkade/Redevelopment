import React from "react";
import { Button, Container, Image, Text } from "@/components";
import { Icons } from "@/assets/icons";
import Link from "next/link";
const JobPost = () => {
  return (
    <Container
      className="w-full h-full relative rounded-[10px] border border-gray_dedede
    drop-shadow-sm backdrop-blur-sm overflow-hidden"
    >
      <Link href={"/job"} className="w-full relative ">
      {/* Main Containet */}
      <Container className="w-full relative p-4">
        {/* Designation Heading */}
        <Container className="w-full relative flex gap-2 items-center">
          <Text
            variant="h3"
            className="text-base md:text-xl text-black_27272e font-semibold capitalize"
          >
            AI Expert Blog
          </Text>
          <span className="px-[10px] py-[2px] rounded-[3px] bg-[#66eb9f] text-white">
            {" "}
            Free{" "}
          </span>
        </Container> 
        
        {/* Description */}
        <Container className="w-full relative flex justify-between mt-2 flex-wrap">
          {/* DR, DA, and PA */}
          <Container className="w-fit relative flex items-center gap-1">
            <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
              DR: {80}
            </Text>
            |
            <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
              DA: {80}
            </Text>{" "}
            |
            <Text className="text-black_425466 text-xs xl:text-sm text-nowrap">
              PA: {80}
            </Text>
          </Container>
          {/* Gp and Ex */}
          <Container className="w-fit relative flex items-center gap-[10px]">
            {/* GP */}
            <Container className="flex gap-1 items-center">
              <Text className="text-black_425466 text-xs md:text-sm">GP:</Text>
              <span className="size-[18px] bg-[#6956E5] rounded-full overflow-hidden relative flex items-center justify-center">
                <Image src={Icons.Done} alt="done" width={10} height={10} />
              </span>
            </Container>
            {/* EX */}
            <Container className="flex gap-1 items-center">
              <Text className="text-black_425466 text-xs md:text-sm">EX:</Text>
              <span className="size-[18px] bg-[#C4C4C4] rounded-full overflow-hidden relative flex items-center justify-center">
                <Image src={Icons.Close} alt="done" width={10} height={10} />
              </span>
            </Container>
          </Container>
        </Container>
        {/* IsPaid and Amount */}
        <Container className="w-full relative flex justify-between mt-2">
          {/* IsPaid */}
          <Container className="w-fit flex gap-1 items-center">
            <Text className="text-black_425466 text-xs md:text-sm">
              IsPaid:
            </Text>
            <span className="size-[18px] bg-[#66CB9F] rounded-full overflow-hidden relative flex items-center justify-center">
              <Image src={Icons.Done} alt="done" width={10} height={10} />
            </span>
            <Text className="text-black_425466 text-xs md:text-sm">Yes</Text>
          </Container>
          {/* Amount */}
          <Container className="w-fit flex gap-1 items-center">
            <Text className="text-black_425466 text-xs md:text-sm">
              Amount:{" "}
            </Text>
            <span className="px-[6px] rounded-[4px] bg-orange_fbb03b overflow-hidden relative flex items-center justify-center text-white">
              {`10,000`}
            </span>
          </Container>
        </Container>

        {/* Interested and Decline Container */}
        <Container className="w-full relative flex items-center justify-center gap-3 mt-4">
          <Button className="px-4 py-2 rounded-[4px] bg-[#515DEF] text-white text-sm md:text-base font-medium">
            Interested
          </Button>
          <Button className="px-4 py-2 rounded-[4px] border border-[#515DEF] text-[#515DEF] text-sm md:text-base font-medium">
            Decline
          </Button>
        </Container>
      </Container>

      {/* Traffic and Category Container */}
      <Container className="w-full relative flex justify-between items-center px-4 py-[7px] bg-gray_eef2fd border-t border-[#b9c1c1]">
        {/* Traffic */}
        <Container className="w-fit">
          <Text className="text-xs md:text-sm  text-black_425466">
            Traffic: <span className="font-medium">{10}K/month</span>
          </Text>
        </Container>

        {/* Category AI */}
        <Container className="w-fit">
          <Text className="text-xs md:text-sm  text-black_425466">
            Category: <span className="font-medium">AI</span>
          </Text>
        </Container>
      </Container>
      </Link>
    </Container>
  )
}

export default JobPost;