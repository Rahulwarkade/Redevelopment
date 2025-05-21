'use client'
import React, { useEffect, useState } from "react";
import { Container} from "@/components/common";
import { DeashboardLayout } from "@/components";
import { socket } from "../socket"

const Profile = () => {
const [isConnected, setIsConnected] = useState(socket.connected);

  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  socket.on('hello', (msg) => {
    console.log('Received from server:', msg);
  });


  return (
    <Container
      className="w-full max-w-[1440px] h-screen max-h-[1024px]   mx-auto flex justify-center items-center"
    >
      <DeashboardLayout/>
    </Container>
  );
};

export default Profile;
