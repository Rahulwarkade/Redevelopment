import React from "react";
import Image from "next/image";
import { Icons } from "@/assets/icons";
const Pagination = ({ dataLength, currentPage, onPageChange } : {dataLength : number, currentPage : number, onPageChange : any}) => {
  //   const totalPages = Math.ceil(dataLength);
  const visiblePages = 5;
  const generatePageButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={` ${currentPage === 1 ? " opacity-0" : ""} `}
      >
        <div className="w-[64px] h-[64px] 2xl:size-[92px] rounded-full border-[1px] border-[#E8E8E8]  relative flex justify-center items-center">
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 relative">
            <Image
              src={Icons.PageLeft}
              fill
              alt="left arrow"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </button>
    );

    for (let i = 1; i <= dataLength; i++) {
      if (i === currentPage) {
        buttons.push(
          <button
            key={i}
            className="w-[50px] h-[50px] rounded-full text-center bg-[#222222] text-base  md:text-xl  text-white" // Add the active class
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        i === 1 ||
        i === dataLength ||
        (i >= currentPage - Math.floor(visiblePages / 2) &&
          i <= currentPage + Math.floor(visiblePages / 2))
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className="w-[50px] h-[50px] rounded-full text-center text-[#999999]"
          >
            {i}
          </button>
        );
      } else if (i === currentPage - Math.floor(visiblePages / 2) - 1) {
        buttons.push(<span key={i}>...</span>);
      } else if (i === currentPage + Math.floor(visiblePages / 2) + 1) {
        buttons.push(<span key={i}>...</span>);
      }
    }

    // Add "Next" button
    buttons.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === dataLength}
        className={`${currentPage === dataLength ? "  opacity-0" : ""} `}
      >
        <div className="w-[64px] h-[64px] 2xl:size-[92px] rounded-full border-[1px] border-[#E8E8E8]  relative flex justify-center items-center">
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 relative">
            <Image
              src={Icons.PageRight}
              fill
              alt="left arrow"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </button>
    );

    return buttons;
  };

  return <div className="pagination">{generatePageButtons()}</div>;
};

export default Pagination;
