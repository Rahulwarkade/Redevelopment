"use client";
import React, { useEffect, useState } from "react";
import { Container, MyChatWindow } from "@/components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { getChats } from "@/store/user/userAPI";
import { Chat } from "@/types/custom";
import { useAppSelector } from "@/store/hooks";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id : string | null = useAppSelector(state=>state.user.socketRecipientId);
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
  }, [dispatch, id]);


  return (
    <Container className="w-full h-full">
      <MyChatWindow id={id} chats={chats} setChats={setChats} />
    </Container>
  );
};

export default Page;
