"use client";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Text } from "@/components";
import { Pic } from "@/assets/Images";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  getConnectionRequests,
  getNotifications,
  respondToConnectionRequest,
  deleteConnection,
} from "@/store/user/userAPI";
import { useAppSelector } from "@/store/hooks";
import { socket } from "@/app/socket";
import { increaseNotification } from "@/store/user/userSlice";

const NotificationWindow = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state) => state.user.profile?.data);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);
  const [actionedConnections, setActionedConnections] = useState<string[]>([]);
  const handleConnectionNotification = (note: any) => {
    setNotifications((prev) => {
      const newOnes = note.notification.filter(
        (n: any) => !prev.some((p) => p._id === n._id)
      );
      return [...prev, ...newOnes];
    });
    dispatch(increaseNotification(note.notification.length));
    // Optional: Also update connectionRequests list if needed
    if (note.connection) {
      setConnectionRequests((prev) => {
        const exists = prev.some((c: any) => c._id === note.connection._id);
        return exists ? prev : [...prev, note.connection];
      });
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    socket.emit("register", user.id);
  }, [dispatch, user]);
  useEffect(() => {
    if (!user?.id) return;

    dispatch(getNotifications(user.id))
      .unwrap()
      .then((res: any) => {
        setNotifications(res);
      })
      .catch((err: any) => {
        console.error("Notifications API error:", err);
      });

    dispatch(getConnectionRequests())
      .unwrap()
      .then((res: any) => {
        setConnectionRequests(res);
      })
      .catch((err: any) => {
        console.error("Connection Requests API error:", err);
      });
    socket.on("connection_request", handleConnectionNotification);
    return () => {
      socket.off("connection_request", handleConnectionNotification);
    };
  }, [dispatch, user]);

  const handleConnectionResponse = async (
    connectionId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      if (status === "rejected") {
        await dispatch(deleteConnection(connectionId)).unwrap();
      } else {
        await dispatch(
          respondToConnectionRequest({ connectionId, status })
        ).unwrap();
      }
      setActionedConnections((prev) => [...prev, connectionId]);
    } catch (err) {
      console.error(`Failed to ${status} connection:`, err);
    }
  };

  const renderNotification = (notification: any, index: number) => {
    const { type, sender, banner, comment, message, createdAt } = notification;
    const senderName = sender?.username || "Someone";
    const bannerName = banner?.name || "a banner";
    const timestamp = new Date(createdAt).toLocaleString();

    // Find the matching connection request for this notification
    let connectionRequestId: string | undefined;
    let connectionStatus: string | undefined;
    if (type === "connection_request" && sender?._id) {
      const found = connectionRequests.find(
        (req: any) =>
          req.requester?._id === sender._id && req.recipient === user?.id
      );
      connectionRequestId = found?._id;
      connectionStatus = found?.status;
    }

    // Only show pending connection requests and not actioned ones
    if (
      type === "connection_request" &&
      (connectionStatus !== "pending" ||
        (connectionRequestId
          ? actionedConnections.includes(connectionRequestId)
          : false))
    ) {
      return null;
    }

    return (
      <Container
        key={index}
        className="px-[30px] py-4 border-b border-blue_e1e2ff flex gap-2 border"
      >
        <Image
          src={Pic.src}
          width={32}
          height={32}
          alt="user"
          className="rounded-full"
        />
        <Container className="flex-1">
          {type === "comment" && (
            <>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                {senderName} <span className="font-normal">commented on</span>{" "}
                {bannerName}
              </Text>
              <span className="text-[10px] text-[#CBCACA]">{timestamp}</span>
              <Text className="text-sm text-[#6E6D69] mt-1">
                {comment?.content}
              </Text>
              <Button className="px-3 py-1 text-[10px] mt-2 border rounded border-[#EEEEEE] text-[#6E6D69] bg-white w-fit">
                Reply
              </Button>
            </>
          )}

          {type === "interest" && (
            <>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                {senderName}{" "}
                <span className="font-normal">showed interest in</span>{" "}
                {bannerName}
              </Text>
              <span className="text-[10px] text-[#CBCACA]">{timestamp}</span>
              <Text className="text-sm text-[#6E6D69] mt-1">{message}</Text>
            </>
          )}

          {type === "reply" && (
            <>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                {senderName} <span className="font-normal">replied in</span>{" "}
                {bannerName}
              </Text>
              <span className="text-[10px] text-[#CBCACA]">{timestamp}</span>
              <Text className="text-sm text-[#6E6D69] mt-1">
                {comment?.content}
              </Text>
            </>
          )}

          {type === "connection_request" && connectionRequestId && (
            <Container className="flex flex-col md:flex-row md:items-center md:justify-between">
              <Container>
                <Text className="text-sm md:text-base font-semibold text-[#787774]">
                  {senderName}{" "}
                  <span className="font-normal">
                    sent you a connection request
                  </span>
                </Text>
                <span className="text-[10px] text-[#CBCACA]">{timestamp}</span>
              </Container>
              <Container className="flex gap-2 mt-2 md:mt-0">
                <Button
                  className="px-4 py-[6px] border rounded border-[#515DEF] bg-[#FFFFFF] text-sm text-[#515DEF] cursor-pointer"
                  onClick={() =>
                    handleConnectionResponse(connectionRequestId!, "rejected")
                  }
                  disabled={actionedConnections.includes(connectionRequestId)}
                >
                  Decline
                </Button>
                <Button
                  className="px-4 py-[6px] border rounded border-[#515DEF] bg-[#515DEF] text-sm text-white cursor-pointer"
                  onClick={() =>
                    handleConnectionResponse(connectionRequestId!, "accepted")
                  }
                  disabled={actionedConnections.includes(connectionRequestId)}
                >
                  Accept
                </Button>
              </Container>
            </Container>
          )}

          {type === "connection_accepted" && (
            <>
              <Text className="text-sm md:text-base font-semibold text-[#787774]">
                {senderName}{" "}
                <span className="font-normal">
                  accepted your connection request
                </span>
              </Text>
              <span className="text-[10px] text-[#CBCACA]">{timestamp}</span>
            </>
          )}
        </Container>
      </Container>
    );
  };

  return (
    <Container className="w-full h-full border rounded-[20px] border-blue_e1e2ff">
      <Container className="px-[30px] py-[18px] border-b border-blue_e1e2ff">
        <Text
          variant="h3"
          className="text-black text-base md:text-2xl font-semibold"
        >
          Notifications
        </Text>
      </Container>

      {notifications.length > 0 ? (
        notifications.map(renderNotification)
      ) : (
        <Container className="px-[30px] py-6 text-center text-gray-400">
          No notifications yet.
        </Container>
      )}
    </Container>
  );
};

export default NotificationWindow;
