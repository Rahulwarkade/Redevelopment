"use client";
import React, { useEffect, useState } from "react";
import { Container, JobPost, Pagination,} from "@/components";
import { useAppDispatch } from "@/store/hooks";
import { getBanners } from "@/store/user/userAPI";
import { Banner, BannerFilters } from "@/types/custom";

const FeedContent = ({ filters, isDesktop }: { filters: BannerFilters, isDesktop : boolean | undefined}) => {
  const dispatch = useAppDispatch();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [onUpdate, setUpdate] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchBanners = () => {
    const updatedFilters = { ...filters, page, limit: isDesktop!=undefined ? isDesktop ? 6 : 4 : 6};

    dispatch(getBanners({ filters: updatedFilters }))
      .unwrap()
      .then((data) => {
        setBanners(data.banners || []);
        setTotalPage(data.pagination.pages);
      })
      .catch(() => setBanners([]));
  };

  useEffect(() => {
    fetchBanners(); // Fetch banners on initial load or when filters/page/isDesktop change
  }, [dispatch, filters, page, onUpdate, isDesktop]);

  const handlePageChange = (pageIndex: number) => {
    localStorage.setItem("categoryPageValue", `${Number(pageIndex)}`);
    setPage(pageIndex);
  };

  return (
    <>
      <Container className="w-full relative grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <JobPost
            key={`feed-${index}`}
            banner={banner}
            setUpdate={setUpdate}
          />
        ))}
      </Container>
      {/* Pagination Container */}
      {isDesktop ? (
        <div className="w-full flex justify-center items-center mt-[50px]">
           {totalPage!=0 && <Pagination
            dataLength={totalPage} // Replace with actual total data length from API response
            currentPage={page}
            onPageChange={handlePageChange}
          />}
        </div>
      ) : (
        <div className="relative w-full flex justify-center mt-[30px]">
          {page < totalPage && (
            <button
              onClick={() => {
                setPage((prev) => prev + 1); // Increment page for "Load More"
              }}
              className="w-[188px] h-[52px] rounded-[67px] bg-black text-white text-center text-sm font-medium"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FeedContent;
