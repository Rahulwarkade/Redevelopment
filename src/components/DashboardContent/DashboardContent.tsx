"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FeedContent,
  Image,
  Text,
  AddBanner,
  Select,
} from "@/components";
import { NewYearParty, PetalBg } from "@/assets/Images";
import { FilterIcon, StarIcon } from "@/assets/icons/svgIcons";
import { useAppDispatch } from "@/store/hooks";
import { Category } from "@/types/custom";
import { getCategories } from "@/store/user/userAPI";
import useIsDesktop from "../Hooks/useIsDesktop";

interface BannerFilters {
  page?: number;
  limit?: number;
  category?: string;
  isPaid?: boolean;
  isGuestPost?: boolean;
  isExchangePost?: boolean;
  minDr?: number;
  minDa?: number;
  minPa?: number;
  minTraffic?: number;
  trafficUnit?: string;
  showAll?: boolean;
  status?: "interested" | "declined";
}

const DashboardContent: React.FC = () => {
  const isDesktop = useIsDesktop();
  const dispatch = useAppDispatch();
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<BannerFilters>({
    page: 1,
    limit: isDesktop ? 6 : 4,
  });
  const [appliedFilters, setAppliedFilters] = useState<BannerFilters>({
    page: 1,
    limit: isDesktop ? 6 : 4,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the API
    dispatch(getCategories())
      .unwrap()
      .then((categories: Category[]) => {
        setCategories(categories);
      })
      .catch(() => {
        setCategories([]);
      });
  }, [dispatch]);

  const handleFilterChange = (key: keyof BannerFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters); // Apply the filters
    setShowFilterModal(false); // Close the modal
  };

  const resetFilters = () => {
    setFilters({ page: 1, limit: 6 }); // Reset filters to default
    setAppliedFilters({ page: 1, limit: 6 }); // Reset applied filters
    setShowFilterModal(false); // Close the modal
  };

  return (
    <Container className="w-full relative flex flex-col gap-5 pb-5 md:pb-[100px]">
      {/* Header Container */}
      <Container className="w-full h-[200px] md:h-[278px] relative bg-[#515DEF] rounded-3xl overflow-hidden">
        {/* Background Image Container */}
        <Container className="w-full h-full absolute flex items-center">
          <Image
            src={PetalBg.src}
            alt="backgroundImage"
            width={914}
            height={248}
          />
        </Container>

        <Container className="w-full h-full absolute flex justify-between items-center px-5 md:px-[56px]">
          {/* Heading Container */}
          <Container>
            <Text className="text-white text-base md:text-[30px] font-semibold uppercase">
              Trending Post This Month
            </Text>
            <Text className="text-sm md:text-lg text-white font-medium capitalize">
              Watching trending posts this month
            </Text>
          </Container>
          {/* Svg Image Container */}
          <Image src={NewYearParty.src} alt="svg" width={216} height={252} />
        </Container>
      </Container>

      {/* Filter Container */}
      <Container className="w-full relative flex justify-between items-center py-2.5 px-3 md:px-5 bg-gray_ebf0fb rounded-[5px]">
        <Container className="w-fit flex gap-2.5 items-center">
          <Text
            variant="h3"
            className="text-xs md:text-2xl font-semibold capitalize"
          >
            Filter
          </Text>
          <span className="rounded-full p-[6px] bg-white">
            <StarIcon strokeColor="#838A91" className="relative" />
          </span>
        </Container>

        <Container className="w-fit flex gap-4">
          <Button
            leftIcon={<FilterIcon strokeColor="#515DEF" className="relative" />}
            className="py-[3px] md:py-[6px] px-3 md:px-6 border rounded-[5px] border-[#515def] text-xs md:text-2xl"
            onClick={() => setShowFilterModal(true)}
          >
            Filter
          </Button>
          <Button
            className="py-[3px] md:py-[6px] px-3 md:px-6 rounded-[5px] bg-[#515def] text-white text-xs md:text-base font-semibold"
            onClick={() => setShowAddBanner(true)}
          >
            Add New Banner
          </Button>
        </Container>
      </Container>

      {/* Feed Section Job Posts */}
      <Container className="w-full relative">
        <FeedContent filters={appliedFilters} isDesktop={isDesktop}/>
      </Container>

      {/* AddBanner Modal */}
      {showAddBanner && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-[10px] p-6 max-w-[90%] w-[500px] relative">
            <button
              onClick={() => setShowAddBanner(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <AddBanner setShowAddBanner={setShowAddBanner} />
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-[10px] p-6 max-w-[90%] w-[500px] relative">
            <button
              onClick={() => setShowFilterModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <div>
              <Text className="text-lg font-semibold mb-4">Filter Options</Text>
              {/* Example filter inputs */}
              <div className="flex flex-col gap-4">
                <label>
                  Category:
                  <Select
                    label="Category"
                    className="border border-[#DEDEDE] rounded-[6px] placeholder:text-base placeholder:text-[#575757]"
                    labelClassName="text-base text-[#747B85] hidden"
                    options={categories.map((cat) => ({
                      label: cat.name,
                      value: cat._id,
                    }))}
                    value={filters.category || ""}
                    onChange={(value) => handleFilterChange("category", value)}
                  />
                </label>
                <label>
                  Minimum Traffic:
                  <input
                  type="number"
                  value={filters.minTraffic || ""}
                  min="0"
                  onChange={(e) =>
                    handleFilterChange("minTraffic", Math.max(0, Number(e.target.value)))
                  }
                  className="border rounded px-2 py-1 w-full"
                  />
                </label>
                {/* Add more filters as needed */}
              </div>
              <div className="flex gap-4 mt-4">
                <Button
                  className="bg-[#515def] text-white px-4 py-2 rounded"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DashboardContent;
