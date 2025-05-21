'use client';
import React, { useEffect, useState } from "react";
import { Container, JobPost } from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { getBanners } from "@/store/user/userAPI";
import { Banner } from "@/types/custom";

const FeedContent = () => {
  const dispatch = useAppDispatch();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [onUpdate,setUpdate] = useState(false);
  useEffect(() => {
      dispatch(getBanners({ }))
        .unwrap()
        .then((data) => setBanners(data || []))
        .catch(() => setBanners([]));
        
  }, [dispatch,onUpdate]);

  return (
    <Container className="w-full relative grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {banners.map((banner, index) => (
        <JobPost key={`feed-${index}`} banner={banner} setUpdate={setUpdate} />
      ))}
    </Container>
  );
};

export default FeedContent;
