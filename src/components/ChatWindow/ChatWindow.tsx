"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Chat, Container, Input, Text } from "@/components";
import { getChatMessages, sendMessage } from "@/store/user/userAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/store/hooks";
import { socket } from "@/app/socket"; // Adjust path if needed

interface Message {
  _id: string;
  sender: { _id: string; username: string; id: string };
  recipient: { _id: string; username: string; id: string };
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const ChatWindow: React.FC<{ recipientId: string; username: string }> = ({
  recipientId,
  username,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const currentUserId = useAppSelector((state) => state.user.profile?.data?.id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [online, setOnline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  // Register user on socket connect or when currentUserId changes
  useEffect(() => {
    if (!currentUserId) return;



    // If already connected, register immediately
    if (socket.connected) {
      socket.emit("register", currentUserId);
    }

  }, [currentUserId]);

  useEffect(() => {
    if (recipientId) {
      dispatch(
        getChatMessages({ otherUserId: recipientId, page: 1, limit: 20 })
      )
        .unwrap()
        .then((res: any) => {
          // If your API returns { messages: [...] }
          setMessages(res.messages || res);
        })
        .catch((err: any) => {
          console.error("Chat messages error:", err);
        });
    }
  }, [dispatch, recipientId]);
  // Listen for new messages and online status
  useEffect(() => {
    // Listen for new messages
    const handleNewMessage = (msg: Message) => {
      // Only add if it's for this chat
      if (
        (msg.sender._id === recipientId &&
          msg.recipient._id === currentUserId) ||
        (msg.sender._id === currentUserId && msg.recipient._id === recipientId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    // Listen for online status
    const handleUserOnline = ({ userId }: { userId: string }) => {
      if (userId === recipientId) setOnline(true);
    };
    const handleUserOffline = ({ userId }: { userId: string }) => {
      if (userId === recipientId) setOnline(false);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
    };
  }, [recipientId, currentUserId]);
    // Add this handler inside your ChatWindow component
  const handleTyping = () => {
    if (currentUserId && recipientId) {
      socket.emit("typing", { userId: currentUserId, recipientId });
    }
  };
  useEffect(() => {
    const handleTyping = ({ userId }: { userId: string }) => {
      if (userId === recipientId) {
        setIsTyping(true);
        // Hide after 2 seconds of inactivity
        setTimeout(() => setIsTyping(false), 2000);
      }
    };
    socket.on("typing", handleTyping);
    return () => {
      socket.off("typing", handleTyping);
    };
  }, [recipientId]);
  const onSubmit = async (data: { content: string }) => {
    if (!data.content.trim()) return;
    try {
      const res = await dispatch(
        sendMessage({ recipientId, content: data.content })
      ).unwrap();
      // Append the new message to the chat
      if (res.message) {
        setMessages((prev) => [...prev, res.message]);
      }
      // Emit message via socket (does not affect existing feature)
      socket.emit("send_message", {
        userId: currentUserId,
        recipientId,
        content: data.content,
      });
      reset(); // Clear input after sending
    } catch (err) {
      console.error("Send message error:", err);
    }
  };


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
            <Text className="text-base md:text-lg font-medium text-black ">
              {username}
            </Text>
            <Container className="w-fit relative flex items-center gap-1">
              <span
                className={`size-[8px] rounded-full ${
                  online ? "bg-green-400" : "bg-gray-400"
                } relative`}
              ></span>
              <Text className="text-[8px] md:text-xs font-medium text-blue_bababa">
                {online ? "Online" : "Offline"}
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
      <Container className="w-full h-full overflow-scroll overflow-x-hidden hidescroller relative px-[30px] py-6 flex flex-col gap-10">
        {/* Render chat messages */}
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Chat
              key={msg._id}
              isRecieved={msg.sender._id !== currentUserId}
              time={new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              username={username}
            >
              {msg.content}
            </Chat>
          ))
        ) : (
          <span className="text-xs text-gray-400">No messages yet.</span>
        )}
        {/* This div is used for scrolling to bottom */}
        <div ref={messagesEndRef} />
        {isTyping && (
          <span className="text-xs text-gray-400 italic">Typing...</span>
        )}
      </Container>
      {/* Chat Input */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("content")}
            placeholder="Type your message"
            onChange={(e) => {
              handleTyping();
              // Also call react-hook-form's onChange
              register("content").onChange(e);
            }}
            containerClassName="w-full h-[60px] rounded-[10px] bg-blue_f7f7fd flex relative"
            className="w-full h-full relative outline-none placeholder:text-sm md:placeholder:text-base placeholder:text-[#92929D]"
            rightIcon={
              <div className="pl-[30px] pr-[10px] py-[10px] rounded-[10px] bg-[#515DEF] flex items-center justify-end">
                <button type="submit">
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
                </button>
              </div>
            }
            onKeyUp={handleTyping} // Add this line
          />
        </Container>
      </form>
    </Container>
  );
};

export default ChatWindow;
