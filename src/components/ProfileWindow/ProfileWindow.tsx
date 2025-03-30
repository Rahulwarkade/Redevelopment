import React from "react";
import { Button, Container, Image, Text } from "@/components";
import { ProfileImage } from "@/assets/Images";
import { Icons } from "@/assets/icons";

const ProfileWindow = () => {
  return (
    <Container className="w-full h-full relative flex flex-col gap-[30px]">
      {/* Profile Header Section */}
      <Container className="w-full relative rounded-[10px] bg-[#FFFFFF] drop-shadow-md backdrop-blur-md overflow-hidden">
        {/* Make Connection button */}
        <Container className="w-full h-[80px] bg-gradient-to-r from-[#9181F4] to-[#5038ED] flex items-center justify-end px-4 
        md:px-[30px] absolute">
          <Button
            className="px-1 md:px-4 py-1 md:py-[10px] rounded-[4px] bg-[#FFFFFF] text-[#515DEF] text-xs md:text-base font-medium"
            leftIcon={
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99935 8.33329C9.8403 8.33329 11.3327 6.84091 11.3327 4.99996C11.3327 3.15901 9.8403 1.66663 7.99935 1.66663C6.1584 1.66663 4.66602 3.15901 4.66602 4.99996C4.66602 6.84091 6.1584 8.33329 7.99935 8.33329Z"
                  stroke="#515DEF"
                  strokeWidth="2"
                />
                <path
                  d="M14.6663 14.5833C14.6663 16.6541 14.6663 18.3333 7.99967 18.3333C1.33301 18.3333 1.33301 16.6541 1.33301 14.5833C1.33301 12.5124 4.31801 10.8333 7.99967 10.8333C11.6813 10.8333 14.6663 12.5124 14.6663 14.5833Z"
                  stroke="#515DEF"
                  strokeWidth="2"
                />
              </svg>
            }
          >
            Make Connection
          </Button>
        </Container>

        {/* Profile short Description */}
        <Container className="w-full  relative p-4 md:p-[30px] flex flex-col gap-5">
          {/* Image Container , Name and Designation*/}
          <Container className="w-full relative flex gap-5 items-end">
            <Container className="w-[120px] h-[146px] rounded-[10px] overflow-hidden relative">
              <Image src={ProfileImage.src} alt="Profile" fill />
            </Container>

            {/* Name and Designation */}
            <Container className="w-fit mb-4">
              <span className="flex items-center gap-3">
                <Text className="text-base md:text-[30px] text-[#343434] font-semibold">
                  John Doe
                </Text>
                <Image
                  src={Icons.Varified}
                  width={26}
                  height={26}
                  alt="varified"
                />
              </span>
              <Text className="text-sm md:text-base text-[#787774]">
                UI/UX Designer
              </Text>
            </Container>
          </Container>

          {/* About Description */}
          <Container className="w-full relative flex flex-col gap-1">
            <Text
              variant="h3"
              className="text-base md:text-2xl font-semibold text-[#292929]"
            >
              About
            </Text>
            <Text className="text-sm md:text-base text-[#787774]">
              As a product designer, my role is to create and develop innovative
              and user-centered products. I work closely with cross-functional
              teams, including engineers, marketers, and project managers, to
              understand user needs, define product design solutions that meet
              those requirements.
            </Text>
          </Container>
        </Container>
      </Container>

      {/* Personal Information Container and Collaboration Guidelines */}
      <Container className="w-full relative flex gap-6 flex-col md:flex-row">
        {/* Personal Information Container */}
        <Container className="w-full relative rounded-[10px] overflow-hidden bg-[#FFFFFF] border border-[#E1E2FF] drop-shadow-xs">
          {/* Text Heading */}
          <Container className="w-full px-[30px] py-3 border-b border-[#EBF0FB] bg-[#EBF0FB] flex justify-between ">
            <Text className="text-base 2xl:text-2xl text-[#455A64] font-semibold">
              Personal Information
            </Text>
            <Image src={Icons.EditInfo} alt="edit" width={30} height={30} />
          </Container>

          {/* Personal Information  */}
          <Container className="w-full relative px-4 md:px-[30px] py-3 flex flex-col gap-4 md:pr-[140px]">
            {[
              { infoKey: "Full Name", infoValue: "John Doe Ham" },
              { infoKey: "Mobile No", infoValue: "+91 12345 67890" },
              { infoKey: "Email ID", infoValue: "john.doe@email.com" },
              { infoKey: "Gender", infoValue: "Male" },
              {
                infoKey: "Address",
                infoValue: "xxxxxx, xxxxxxxxxx, xxxxx, xxxxxxxxxxxx 444488",
              },
            ].map(
              (info: { infoKey: string; infoValue: string }, index: number) => {
                return (
                  <span key={`info-${index}`} className="flex gap-1 md:gap-[80px] flex-col md:flex-row">
                    <Text className="text-sm md:text-base text-[#292929]">
                      {info.infoKey}
                    </Text>
                    <Text className="text-sm md:text-base text-[#292929]">
                      {info.infoValue}
                    </Text>
                  </span>
                );
              }
            )}
          </Container>
        </Container>

        {/* Collaboration Guidelines Container */}
        <Container className="w-full relative rounded-[10px] overflow-hidden bg-[#FFFFFF] border border-[#E1E2FF] drop-shadow-xs">
          {/* Text Heading */}
          <Container className="w-full px-4 md:px-[30px] py-3 border-b border-[#EBF0FB] bg-[#EBF0FB] flex justify-between">
            <Text className="text-base 2xl:text-2xl text-[#455A64] font-semibold">
              Collaboration Guidelines
            </Text>
          </Container>

          {/* Personal Information  */}
          <Container className="w-full relative px-4 md:px-[30px] py-3 flex flex-col gap-4">
            <span className="flex  flex-col gap-1">
              <Text className="text-sm md:text-base text-[#292929] font-semibold">
                What i{"'"}m looking for:
              </Text>
              <ul className="text-sm md:text-base text-[#292929] list-disc list-inside pl-3">
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
              </ul>
            </span>

            <span className="flex  flex-col gap-1">
              <Text className="text-sm md:text-base text-[#292929] font-semibold">
                What i{"'"}m looking for:
              </Text>
              <ul className="text-sm md:text-base text-[#292929] list-disc list-inside pl-3">
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
              </ul>
            </span>
          </Container>
      </Container>
      </Container>

      {/* My Websites Container */}
      <Container className="w-full relative border border-[#E1E2FF] rounded-[20px] overflow-hidden bg-[#FDFDFF]">
        {/* Heading */}
        <Container className="w-full relative px-4 md:px-[30px] py-4 border-b border-[#E1E2FF]">
          <Text className="text-base 2xl:text-2xl text-[#292929] font-semibold">
            My Websites
          </Text>
        </Container>
          
        <Container className="w-full relative flex p-4 items-center gap-4">
            {/* Move Left Arrow */}
            <Image src={Icons.MoveLeft} alt="left" width={34} height={34} className="hidden md:inline-block mx-auto"/>
          {/* Websites Card Links */}
          <Container className="w-full relative  items-center gap-4 grid md:grid-cols-2 xl:grid-cols-3 ">
            {/* Website Container */}
            {[1, 2, 3].map((_, index: number) => {
              return (
                <Container
                  key={`website-${index}`}
                  className="w-full relative border rounded-[10px]  border-[#E1E2FF]"
                >
                  {/* Website Link */}
                  <Container className="w-full relative flex p-4 items-center gap-10">
                    <span className="w-full flex gap-6 items-center">
                      <span className="relative flex">
                        <span className="size-[48px] bg-[#4C6FFF] rounded-full flex justify-center items-center">
                          <Text className="text-[#FFFFFF] text-sm md:text-xl font-bold">
                            CH
                          </Text>
                        </span>
                        {/* Star Icon */}
                        <span className="absolute bottom-0 right-0 translate-x-2 ">
                          <Image
                            src={Icons.StarIcon}
                            width={24}
                            height={24}
                            alt="star"
                          />
                        </span>
                      </span>
                      <span>
                        <Text className="text-sm md:text-base font-semibold text-[#27272E]">
                          Chatgpt.com
                        </Text>
                        <Text className="text-xs md:text-sm text-[#425466]">
                          DR: 80 | DA: 40
                        </Text>
                      </span>
                    </span>
                    {/* Square Right Arrow */}
                    <Image
                      src={Icons.SquareRight}
                      width={24}
                      height={24}
                      alt="right"
                    />
                  </Container>

                  {/* Traffic and Category */}
                  <Container className="w-full relative bg-[#EEF2FD] px-4 py-1 flex justify-between">
                    <Text className="text-xs md:text-sm text-[#425466]">
                      Traffic: <span className="font-semibold">10K/month</span>
                    </Text>
                    <Text className="text-xs md:text-sm text-[#425466]">
                      Category: <span className="font-semibold">AI</span>
                    </Text>
                  </Container>
                </Container>
              );
            })}
          </Container>
            {/* Move Right Arrow */}
            <Image src={Icons.MoveRight} alt="left" width={34} height={34} className="hidden md:inline-block"/>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfileWindow;
