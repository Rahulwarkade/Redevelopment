'use client';
import React, { useEffect, useState } from "react";
import { Container, JobPost } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { getBanners } from "@/store/user/userAPI";

const FeedContent = () => {
  const dispatch = useAppDispatch();
  const [banners, setBanners] = useState<any[]>([]);
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    if (token) {
      dispatch(getBanners({ token }))
        .unwrap()
        .then((data) => setBanners(data || []))
        .catch(() => setBanners([]));
    }
  }, [dispatch, token]);

  return (
    <Container className="w-full relative grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {banners.map((banner, index) => (
        <JobPost key={`feed-${index}`} banner={banner} />
      ))}
    </Container>
  );
};

export default FeedContent;
