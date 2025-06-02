"use client";
import React from "react";
import { Button, Container, Image, Text } from "@/components";
import { ProfileImage } from "@/assets/Images";
import { Icons } from "@/assets/icons";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { ApiResponse, IBanner, IUser } from "@/types/custom";

const ProfileWindow: React.FC = () => {
  const profile = useAppSelector(
    (state: RootState) => state.user.profile
  ) as ApiResponse<IUser> | null;
  const user = profile?.data;
  const fullName = user?.username || "Unnamed User";
  const email = user?.email || "No email provided";
  const phone = user?.phoneNumber || "No phone number";
  const gender = "Not specified"; // Placeholder
  const address = "No address available"; // Placeholder
  const guidelines = user?.collaborationGuidelines || [];
  const banners: IBanner[] = user?.banners || [];
  return (
    <Container className="w-full h-full relative flex flex-col gap-[30px]">
      {/* Profile Header Section */}
      <Container className="w-full relative rounded-[10px] bg-[#FFFFFF] drop-shadow-md backdrop-blur-md overflow-hidden">
        <Container className="w-full h-[80px] bg-gradient-to-r from-[#9181F4] to-[#5038ED] flex items-center justify-end px-4 md:px-[30px] absolute">
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

        <Container className="w-full relative p-4 md:p-[30px] flex flex-col gap-5">
          <Container className="w-full relative flex gap-5 items-end">
            <Container className="w-[120px] h-[146px] rounded-[10px] overflow-hidden relative">
              <Image src={user?.profileImage || ProfileImage.src} alt="Profile" fill />
            </Container>
            <Container className="w-fit mb-4">
              <span className="flex items-center gap-3">
                <Text className="text-base md:text-[30px] text-[#343434] font-semibold capitalize">
                  {fullName}
                </Text>
                {user?.isEmailVerified && (
                  <Image
                    src={Icons.Varified}
                    width={26}
                    height={26}
                    alt="verified"
                  />
                )}
              </span>
              <Text className="text-sm md:text-base text-[#787774]">
                {user?.role?.name || "Role unspecified"}
              </Text>
            </Container>
          </Container>

          <Container className="w-full relative flex flex-col gap-1">
            <Text
              variant="h3"
              className="text-base md:text-2xl font-semibold text-[#292929]"
            >
              About
            </Text>
            <Text className="text-sm md:text-base text-[#787774]">
              This user hasn&apos;t added an &quot;About&quot; section yet.
            </Text>
          </Container>
        </Container>
      </Container>

      {/* Personal Info + Guidelines */}
      <Container className="w-full relative flex gap-6 flex-col md:flex-row">
        <Container className="w-full rounded-[10px] bg-[#FFFFFF] border border-[#E1E2FF] drop-shadow-xs overflow-hidden">
          <Container className="w-full px-[30px] py-3 border-b border-[#EBF0FB] bg-[#EBF0FB] flex justify-between">
            <Text className="text-base 2xl:text-2xl text-[#455A64] font-semibold">
              Personal Information
            </Text>
            <Image src={Icons.EditInfo} alt="edit" width={30} height={30} />
          </Container>
          <Container className="w-full px-4 md:px-[30px] py-3 flex flex-col gap-4 md:pr-[140px]">
            {[
              { infoKey: "Full Name", infoValue: fullName },
              { infoKey: "Mobile No", infoValue: phone },
              { infoKey: "Email ID", infoValue: email },
              { infoKey: "Gender", infoValue: gender },
              { infoKey: "Address", infoValue: address },
            ].map(({ infoKey, infoValue }, index) => (
              <span
                key={`info-${index}`}
                className="flex gap-1 md:gap-[80px] flex-col md:flex-row"
              >
                <Text className="text-sm md:text-base text-[#292929]">
                  {infoKey}
                </Text>
                <Text className="text-sm md:text-base text-[#292929]">
                  {infoValue}
                </Text>
              </span>
            ))}
          </Container>
        </Container>

        <Container className="w-full rounded-[10px] bg-[#FFFFFF] border border-[#E1E2FF] drop-shadow-xs overflow-hidden">
          <Container className="w-full px-4 md:px-[30px] py-3 border-b border-[#EBF0FB] bg-[#EBF0FB] flex justify-between">
            <Text className="text-base 2xl:text-2xl text-[#455A64] font-semibold">
              Collaboration Guidelines
            </Text>
          </Container>

          <Container className="w-full px-4 md:px-[30px] py-3 flex flex-col gap-4">
            {guidelines.length > 0 ? (
              guidelines.map((item, index) => (
                <span
                  key={`guideline-${index}`}
                  className="flex flex-col gap-1"
                >
                  <Text className="text-sm md:text-base text-[#292929] font-semibold">
                    {item?.title || `Guideline ${index + 1}`}
                  </Text>
                  <ul className="text-sm md:text-base text-[#292929] list-disc list-inside pl-3">
                    {(item?.points || []).map((point: string, idx: number) => (
                      <li key={`point-${idx}`}>{point}</li>
                    ))}
                  </ul>
                </span>
              ))
            ) : (
              <Text className="text-sm md:text-base text-[#787774]">
                No collaboration guidelines have been added.
              </Text>
            )}
          </Container>
        </Container>
      </Container>

      {/* Websites Placeholder Section */}
      <Container className="w-full relative border border-[#E1E2FF] rounded-[20px] overflow-hidden bg-[#FDFDFF]">
        <Container className="w-full relative px-4 md:px-[30px] py-4 border-b border-[#E1E2FF]">
          <Text className="text-base 2xl:text-2xl text-[#292929] font-semibold">
            My Websites
          </Text>
        </Container>

        <Container className="w-full relative flex p-4 items-center gap-4">
          <Image
            src={Icons.MoveLeft}
            alt="left"
            width={34}
            height={34}
            className="hidden md:inline-block mx-auto"
          />

          <Container className="w-full relative items-center gap-4 grid md:grid-cols-2 xl:grid-cols-3">
            {(banners && banners.length>0) ? 
            (banners?.map((banner, index: number) => (
              <Container
                key={`website-${banner._id}-${index}`}
                className="w-full min-w-max relative border rounded-[10px] border-[#E1E2FF]"
              >
                <Container className="w-full relative flex p-4 items-center gap-10">
                  <span className="w-full flex gap-6 items-center">
                    <span className="relative flex">
                      <span className="size-[48px] bg-[#4C6FFF] rounded-full flex justify-center items-center">
                        <Text className="text-[#FFFFFF] text-sm md:text-xl font-bold">
                          {banner.name.slice(0, 2).toUpperCase() || "CH"}
                        </Text>
                      </span>
                      <span className="absolute bottom-0 right-0 translate-x-2">
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
                        {banner.websiteUrl}
                      </Text>
                      <Text className="text-xs md:text-sm text-[#425466]">
                        DR: {banner.dr} | DA: {banner.da}
                      </Text>
                    </span>
                  </span>
                  <Image
                    src={Icons.SquareRight}
                    width={24}
                    height={24}
                    alt="right"
                  />
                </Container>

                <Container className="w-full relative bg-[#EEF2FD] px-4 py-1 flex justify-between">
                  <Text className="text-xs md:text-sm text-[#425466]">
                    Traffic:{" "}
                    <span className="font-semibold">
                      {banner.trafficValue}
                      {banner.trafficUnit === "6823d16e81a262e2bca6a4c8"
                        ? "K/month"
                        : ""}
                    </span>
                  </Text>
                  <Text className="text-xs md:text-sm text-[#425466]">
                    Category:{" "}
                    <span className="font-semibold">
                      {banner.category?.name || "N/A"}
                    </span>
                  </Text>
                </Container>
              </Container>
            ))) : (<Text className="text-sm md:text-base text-[#787774]">
                No Websites have been added.
              </Text>)}
          </Container>

          <Image
            src={Icons.MoveRight}
            alt="right"
            width={34}
            height={34}
            className="hidden md:inline-block"
          />
        </Container>
      </Container>
    </Container>
  );
};

export default ProfileWindow;
