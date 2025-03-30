import React from "react";
import { Container, Text } from "@/components";

interface ChatMessages {
  isRecieved: boolean;
}
const Chat: React.FC<ChatMessages> = ({
  isRecieved,
}) => {
  return (
    <Container
      className={`w-full relative flex items-center gap-7 ${
        isRecieved ? "" : "justify-end"
      }`}
    >
      {/* Profile Pic */}
      {isRecieved && (
        <span className="p-1.5 rounded-full bg-[#7879f1] text-center flex justify-center items-center text-white text-xs md:text-sm font-bold">
          OP
        </span>
      )}
      {/* Chat Message Container */}
      <Container className="w-fit relative flex flex-col gap-2.5">
        <Container
          className={`w-full max-w-[362px] relative px-3 py-2 border border-blue_a5a6f6 rounded-[10px] ${
            isRecieved ? "" : "bg-[#7879f1]"
          }`}
        >
          <Text
            className={`text-[8px] md:text-xs leading-[20px] ${
              isRecieved ? "text-[#5D5FEF]" : "text-white"
            }`}
          >
            Lorem ipsum dolor, commodi nisi corrupti suscipit exercitationem
            architecto inventore. Ab nobis cum quas consequatur quasi at
            perspiciatis delectus sint, provident distinctio!
          </Text>
          {/* Time Stamp */}
          <span
            className={`absolute text-[5px] md:text-[10px] text-black_333333 top-full mt-2.5 ${
              isRecieved ? "left-0" : "right-0"
            }`}
          >
            8:00 PM
          </span>
        </Container>
      </Container>

      {!isRecieved && (
        <span className="p-1.5 rounded-full bg-grey_bdbdbd flex justify-center items-center">
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
      )}
    </Container>
  );
};

export default Chat;
