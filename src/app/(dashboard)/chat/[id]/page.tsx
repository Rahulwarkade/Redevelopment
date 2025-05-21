"use client";
import React, { useEffect, useState } from "react";
import { Container, MyChatWindow } from "@/components";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getChatMessages, getChats } from "@/store/user/userAPI";
import { Chat } from "@/types/custom";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params?.id as string;
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    dispatch(getChats())
      .unwrap()
      .then((res: any) => {
        setChats(res);
      })
      .catch((err: any) => {
        console.error("Chats API error:", err);
      });
    if (id) {
      dispatch(getChatMessages({ otherUserId: id, page: 1, limit: 20 }))
        .unwrap()
        .then((res: any) => {
          console.log("Chat messages:", res);
        })
        .catch((err: any) => {
          console.error("Chat messages error:", err);
        });
    }
  }, [dispatch, id]);

  return (
    <Container className="w-full">
      <MyChatWindow id={id} chats={chats} />
    </Container>
  );
};

export default Page;
