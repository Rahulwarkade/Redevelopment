import React from "react";
import { Button, Chat, Container, Input, Text } from "@/components";

const ChatWindow = () => {
  return (
    <Container className="w-full h-full relative flex flex-col justify-between pb-[15px]">
      {/* Chat Header Section */}
      <Container className="w-full h-[80px] relative border-b border-grey_dfdfdf bg-white flex items-center px-4">
        {/* Profile container */}
        <Container className="w-full h-full relative flex items-center gap-3">
          {/* Star Icon */}
          <Container className="w-fit relative">
            {/* Star icon */}
            <span className="size-[40px] rounded-full bg-grey_bdbdbd flex justify-center items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 15.77L16.18 19.5L14.54 12.47L20 7.74L12.81 7.13L10 0.5L7.19 7.13L0 7.74L5.46 12.47L3.82 19.5L10 15.77Z"
                  fill="black"
                  fillOpacity="0.54"
                />
              </svg>
            </span>
          </Container>
          {/* Name and Online Status */}
          <Container className="relative">
            <Text className="text-base md:text-lg font-medium text-black">
              Support ADMIN
            </Text>
            <Container className="w-fit relative flex items-center gap-1">
              <span className="size-[8px] rounded-full  bg-green-400 relative"></span>
              <Text className="text-[8px] md:text-xs font-medium text-blue_bababa">
                Online
              </Text>
            </Container>
          </Container>
        </Container>

        {/* Decline Button */}

        <Button className="px-6 py-2.5 rounded-[4px] bg-red_f92521 text-sm md:text-base font-medium text-white">
          Dcline
        </Button>
      </Container>

      {/* Chat Messages Section */}
      <Container className="w-full relative px-[30px] py-6 flex flex-col gap-10">
        {/* Chat */}
        {Array.from({ length: 4 }).map((_, index: number) => {
          return <Chat key={`message-${index}`} isRecieved={index % 2 == 0} />;
        })}
      </Container>
      {/* Chat Input */}
      <Container className="w-full h-fit relative px-[30px] flex items-center gap-6">
        {/* Icon */}
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
              stroke="#000929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.4"
              d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
              stroke="#000929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              opacity="0.4"
              d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
              stroke="#000929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
              stroke="#000929"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {/* Input Button */}
        <Input
          placeholder="Type your message"
          containerClassName="w-full h-[60px] rounded-[10px] bg-blue_f7f7fd flex relative"
          className="w-full h-full relative outline-none placeholder:text-sm md:placeholder:text-base placeholder:text-[#92929D]"
          rightIcon={
            <span className="flex items-center gap-[10px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1999 11.8L10.7899 13.21C10.0099 13.99 10.0099 15.26 10.7899 16.04C11.5699 16.82 12.8399 16.82 13.6199 16.04L15.8399 13.82C17.3999 12.26 17.3999 9.72999 15.8399 8.15999C14.2799 6.59999 11.7499 6.59999 10.1799 8.15999L7.75988 10.58C6.41988 11.92 6.41988 14.09 7.75988 15.43"
                  stroke="#2E3B5B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#2E3B5B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className=" pl-[30px] pr-[10px] py-[10px] rounded-[10px] bg-[#515DEF] flex items-center justify-end">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.3101 11.87 11.3101 11.39 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                    fill="white"
                  />
                </svg>
              </span>
            </span>
          }
        />
      </Container>
    </Container>
  );
};

export default ChatWindow;
