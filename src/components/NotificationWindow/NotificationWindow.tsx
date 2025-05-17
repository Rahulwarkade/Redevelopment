import React from "react";
import { Button, Container, Image, Text } from "@/components";
import { Pic } from "@/assets/Images";

const NotificationWindow = () => {
  return (
    <Container className="w-full h-full relative border rounded-[20px] border-blue_e1e2ff">
      {/* Notification Heading */}
      <Container className="px-[30px] py-[18px] border-b border-blue_e1e2ff">
        <Text
          variant="h3"
          className="text-black text-base md:text-2xl font-semibold"
        >
          Notifications
        </Text>
      </Container>

      {/* Notification Message Container */}

      <Container className="px-[30px] py-4 border-b border-blue_e1e2ff flex gap-1">
        <Image src={Pic.src} width={24} height={24} alt="pic" />
        <Container className="w-full relative">
          {/* Name and Commented in */}

          <Container>
            <Text className="text-sm md:text-base font-semibold text-[#787774]">
              Lois Griffin
              <span className="font-normal"> commented in </span> 🐶 Take Brian
              on a walk
            </Text>
            {/* Time stamp */}
            <span className="text-[8px] md:text-xs text-[#CBCACA]">
              11 hours ago • Task List
            </span>
          </Container>

          {/* Message and replays */}
          <Container className="mt-2">
            <Container className="text-xs md:text-sm text-[#A09F9D] flex flex-col">
              <span>Lois Griffin</span>
              <span>
                @Brian Griffin
                <span className="text-[#6E6D69]">
                  {" "}
                  when you you wanna go out buddy?{" "}
                </span>
              </span>
            </Container>
            <Container className="text-xs md:text-sm text-[#A09F9D] flex flex-col">
              <span>Lois Griffin</span>
              <span>
                @Brian Griffin{" "}
                <span className="text-[#6E6D69]">
                  {" "}
                  when you you wanna go out buddy?{" "}
                </span>
              </span>
            </Container>

            <Button className="px-2 py-1 border rounded-[3px] border-[#EEEEEE] bg-[#FFFFFF] text-[8px] md:text-xs text-[#6E6D69] mt-3">
              Reply
            </Button>
          </Container>
        </Container>
      </Container>

      <Container className="px-[30px] py-4 border-b border-blue_e1e2ff flex gap-1 ">
        <Image src={Pic.src} width={24} height={24} alt="pic" />
        <Container className="w-full relative">
          {/* Name and Commented in */}

          <Container>
            <Text className="text-sm md:text-base font-semibold text-[#787774]">
              Lois Griffin
              <span className="font-normal"> commented in </span> 🐶 Take Brian
              on a walk
            </Text>
            {/* Time stamp */}
            <span className="text-[8px] md:text-xs text-[#CBCACA]">
              11 hours ago • Task List
            </span>
          </Container>
        </Container>
      </Container>

      <Container className="w-full px-[30px] py-4 border-b border-blue_e1e2ff relative flex items-center justify-between max-md:flex-wrap">
        <Container className=" flex gap-1">
          <Image src={Pic.src} width={24} height={24} alt="pic" />
          <Container className="w-full relative">
            {/* Name and Commented in */}

            <Container>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                Lois Griffin
                <span className="font-normal"> commented in </span> 🐶 Take
                Brian on a walk
              </Text>
              {/* Time stamp */}
              <span className="text-[8px] md:text-xs text-[#CBCACA]">
                11 hours ago • Task List
              </span>
            </Container>
          </Container>
        </Container>

        {/* Cancle and Accept Button */}
        <Container className="w-fit flex gap-3 max-md:flex-wrap">
          <Button className="px-6 py-[10px] border rounded-[4px] border-[#515DEF] bg-[#FFFFFF] text-sm md:text-base font-medium text-[#515DEF]">
            Cancle
          </Button>
          <Button className="px-6 py-[10px] border rounded-[4px] border-[#515DEF] bg-[#515DEF] text-sm md:text-base font-medium text-white">
            Accept
          </Button>
        </Container>
      </Container>

      {/* for temporary purpose */}
      <Container className="px-[30px] py-4 border-b border-blue_e1e2ff flex gap-1">
        <Image src={Pic.src} width={24} height={24} alt="pic" />
        <Container className="w-full relative">
          {/* Name and Commented in */}

          <Container>
            <Text className="text-sm md:text-base font-semibold text-[#787774]">
              Lois Griffin
              <span className="font-normal"> commented in </span> 🐶 Take Brian
              on a walk
            </Text>
            {/* Time stamp */}
            <span className="text-[8px] md:text-xs text-[#CBCACA]">
              11 hours ago • Task List
            </span>
          </Container>

          {/* Message and replays */}
          <Container className="mt-2">
            <Container className="text-xs md:text-sm text-[#A09F9D] flex flex-col">
              <span>Lois Griffin</span>
              <span>
                @Brian Griffin
                <span className="text-[#6E6D69]">
                  {" "}
                  when you you wanna go out buddy?{" "}
                </span>
              </span>
            </Container>
            <Container className="text-xs md:text-sm text-[#A09F9D] flex flex-col">
              <span>Lois Griffin</span>
              <span>
                @Brian Griffin{" "}
                <span className="text-[#6E6D69]">
                  {" "}
                  when you you wanna go out buddy?{" "}
                </span>
              </span>
            </Container>

            <Button className="px-2 py-1 border rounded-[3px] border-[#EEEEEE] bg-[#FFFFFF] text-[8px] md:text-xs text-[#6E6D69] mt-3">
              Reply
            </Button>
          </Container>
        </Container>
      </Container>

      <Container className="px-[30px] py-4 border-b border-blue_e1e2ff flex gap-1">
        <Image src={Pic.src} width={24} height={24} alt="pic" />
        <Container className="w-full relative">
          {/* Name and Commented in */}

          <Container>
            <Text className="text-sm md:text-base font-semibold text-[#787774]">
              Lois Griffin
              <span className="font-normal"> commented in </span> 🐶 Take Brian
              on a walk
            </Text>
            {/* Time stamp */}
            <span className="text-[8px] md:text-xs text-[#CBCACA]">
              11 hours ago • Task List
            </span>
          </Container>
        </Container>
      </Container>

      <Container className="w-full px-[30px] py-4 border-b border-blue_e1e2ff relative flex items-center justify-between max-md:flex-wrap">
        <Container className=" flex gap-1">
          <Image src={Pic.src} width={24} height={24} alt="pic" />
          <Container className="w-full relative">
            {/* Name and Commented in */}

            <Container>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                Lois Griffin
                <span className="font-normal"> commented in </span> 🐶 Take
                Brian on a walk
              </Text>
              {/* Time stamp */}
              <span className="text-[8px] md:text-xs text-[#CBCACA]">
                11 hours ago • Task List
              </span>
            </Container>
          </Container>
        </Container>

        {/* Cancle and Accept Button */}
        <Container className="w-fit flex gap-3 max-md:flex-wrap">
          <Button className="px-6 py-[10px] border rounded-[4px] border-[#515DEF] bg-[#FFFFFF] text-sm md:text-base font-medium text-[#515DEF]">
            Cancle
          </Button>
          <Button className="px-6 py-[10px] border rounded-[4px] border-[#515DEF] bg-[#515DEF] text-sm md:text-base font-medium text-white">
            Accept
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default NotificationWindow;
