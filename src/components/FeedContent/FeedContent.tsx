'use client';
import React, { useEffect, useState } from "react";
import { Container, JobPost } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { getBanners } from "@/store/user/userAPI";

type Banner = {
  // Add only the fields you use in JobPost, or use 'any' as a last resort
  [key: string]: unknown;
};

const FeedContent = () => {
  const dispatch = useAppDispatch();
  const [banners, setBanners] = useState<Banner[]>([]);
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
        <JobPost key={`feed-${index}`}  />
      ))}
    </Container>
  );
};

export default FeedContent;
