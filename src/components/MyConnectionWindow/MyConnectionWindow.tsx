'use client';
import React, { useEffect, useState } from "react";
import { Container, Text, Button, Image } from "@/components";
import { ProfilePic } from "@/assets/Images";
import { getConnections, getRecommendedConnections, sendConnectionRequest } from "@/store/user/userAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import Link from "next/link";

const MyConnectionWindow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [connections, setConnections] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [invitedIds, setInvitedIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getConnections({ status: "accepted" }))
      .unwrap()
      .then((res: any) => {
        if (Array.isArray(res)) setConnections(res);
      })
      .catch((err: any) => {
        console.error("Connections API error:", err);
      });

    dispatch(getRecommendedConnections())
      .unwrap()
      .then((res: any) => {
        if (res?.recommendations) setRecommended(res.recommendations);
      })
      .catch((err: any) => {
        console.error("Connections API error:", err);
      });
  }, [dispatch]);

  const handleInvite = async (recipientId: string) => {
    try {
      await dispatch(sendConnectionRequest({ recipientId })).unwrap();
      setInvitedIds((prev) => [...prev, recipientId]);
    } catch (err) {
      console.error("Invite error:", err);
    }
  };

  const ConnectionFeed = ({
    id,
    username,
    isConnected,
    onInvite,
    invited,
  }: {
    id : string,
    username: string;
    isConnected: boolean;
    onInvite?: () => void;
    invited?: boolean;
  }) => (
    <Container className="w-full p-4 relative flex justify-between items-center drop-shadow-sm border border-[#E1E2FF] rounded-[10px]">
      {/* Profile Pic and Name and Designation */}
      <Container className="flex items-center gap-4">
        <span className="size-[48px] rounded-full relative overflow-hidden">
          <Image src={ProfilePic.src} alt="pic" fill />
        </span>
        <span>
          <Text className="text-sm md:text-base font-semibold text-[#27272E]">
            {username}
          </Text>
            {isConnected ? (
            <Text className="text-xs md:text-sm text-[#425466]">
              Connected User
            </Text>
            ) : (
              <Text className="text-xs md:text-sm text-[#425466]">
              Recommended User
            </Text>
            )}
        </span>
      </Container>
      {isConnected ? (
        <Link href={`/chat/${id}`}> 
          <Button className="px-[10px] py-1 rounded-[4px] bg-[#515DEF] text-white text-xs md:text-sm font-medium cursor-pointer">
            Message
          </Button>
        </Link>
      ) : (
        <Button
          className={`px-[10px] py-1 rounded-[4px] bg-[#515DEF] text-white text-xs md:text-sm font-medium ${!invited && "cursor-pointer"}`}
          onClick={onInvite}
          disabled={invited}
        >
          {invited ? "Requested" : "Invite"}
        </Button>
      )}
    </Container>
  );

  return (
    <section className="w-full h-full relative bg-white_fdfdff rounded-[20px] border border-grey_e1e2ff flex overflow-hidden flex-col gap-5 p-5">
      {/* My Connection Heading */}
      <Container className="w-full relative  h-[70px] border border-[#E1E2FF] rounded-[10px] px-[30px] py-4">
        <Text className="text-base md:text-2xl font-semibold text-black">
          My Connections
        </Text>
      </Container>

      {/* Connections Cards */}
      <Container className="w-full relative grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {connections.length > 0 ? (
          connections.map((conn) => {
            // console.log(conn)
            return <ConnectionFeed
              key={conn.connectionId}
              username={conn.user?.username || conn.user?.name || "Unknown"}
              isConnected={true}
              id={conn?.user?.id}
            />
})
        ): (
          <Text>No connections found.</Text>
        )}
      </Container>

      {/* Invite New Connections Heading */}
      <Container className="w-full relative  h-[70px] border border-[#E1E2FF] rounded-[10px] px-[30px] py-4">
        <Text className="text-base md:text-2xl font-semibold text-black">
          Invite New Connections
        </Text>
      </Container>

      {/* Recommended Connections Cards */}
      <Container className="w-full relative grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommended.length > 0 ? (
          recommended.map((user) => (
            <ConnectionFeed
              key={user._id}
              username={user.username}
              isConnected={false}
              onInvite={() => handleInvite(user._id)}
              invited={invitedIds.includes(user._id)}
              id={user._id}
            />
          ))
        ) : (
          <Text>No recommendations found.</Text>
        )}
      </Container>
    </section>
  );
};

export default MyConnectionWindow;