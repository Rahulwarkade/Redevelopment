import React from 'react'
import Image from 'next/image';
const JobCard = ()=>{
    return <section className="w-full relative px-[5%] xl:px[8%] flex flex-col items-center gap-[160px]">
        {/* Connect Free */}
        <div className="w-[176px] h-[210px]  relative flex flex-col">
            <div className="w-full relative px-8">
                <div className="w-[64px] h-[64px] rounded-full bg-white flex justify-center items-center">
                    <Image
                    src={"/user.svg"}
                    width = {24}
                    height={24}
                    alt="User"
                    />
                </div>
            </div>
            <div className="w-full relative flex gap-[28px] justify-center items-center">
                <div className="w-[64px] h-[64px] rounded-full bg-white flex justify-center items-center">
                    <Image
                    src={"/user.svg"}
                    width = {24}
                    height={24}
                    alt="User"
                    />
                </div>
                <div className="relative w-[84px] h-[84px] rounded-full bg-[#222222] overflow-hidden flex justify-center items-center">
                    <span className="w-full h-[17px] bg-[#15C06E]  text-xs text-[#FFFFFF] font-semibold flex items-center justify-center absolute top-[7px] mx-auto">Connect</span>
                    <Image
                    src={"/plus.svg"}
                    width={24}
                    height={24}
                    alt="plusIcon"
                    />
                    <span className="w-full h-[17px] bg-[#15C06E]  text-xs text-[#FFFFFF] font-semibold flex items-center justify-center absolute bottom-[7px] mx-auto">Free</span>
                </div>

            </div>
            <div className="w-full relative px-8">
                <div className="w-[64px] h-[64px] rounded-full bg-white flex justify-center items-center">
                    <Image
                    src={"/user.svg"}
                    width = {24}
                    height={24}
                    alt="User"
                    />
                </div>

            </div>
        </div>

        {/* JobCard Container */}
        <div className="w-full max-w-[728px]  border border-[#C5C5C5] rounded-[9px] bg-white p-5 md:p-6 flex flex-col gap-4">
            {/* Job titile */}
            <h1 className="text-lg md:text-2xl font-medium text-[#222222]">Interaction Designer</h1>
            {/* job Description */}
            <p className="text-sm md:text-lg text-[#434343] md:pr-[150px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full relative flex flex-wrap justify-between gap-4">
                <div className="w-auto flex gap-6 md:gap-8">
                    <span className="relative flex justify-center items-center gap-[6px]">
                        <Image
                        src={"/location.svg"}
                        width = {16}
                        height={16}
                        alt="locationIcon"
                        />
                        <p className="text-sm text-[#999999] md:text-base">Remote</p>
                    </span>
                    <span className="relative flex justify-center items-center gap-[6px]">
                        <Image
                        src={"/location.svg"}
                        width = {16}
                        height={16}
                        alt="timeIcon"
                        />
                        <p className="text-sm text-[#999999] md:text-base">Full Time</p>
                    </span>
                    <span className="relative flex justify-center items-center  gap-[6px]">
                        <Image
                        src={"/location.svg"}
                        width = {16}
                        height={16}
                        alt="jobIcon"
                        />
                        <p className="text-sm text-[#999999] md:text-base">Fresher</p>
                    </span>
                    <span className="hidden relative md:flex justify-center items-center  gap-[6px]">
                        <Image
                        src={"/location.svg"}
                        width = {16}
                        height={16}
                        alt="jobIcon"
                        />
                        <p className="text-sm text-[#999999] md:text-base">14 Sep 2024</p>
                    </span>
                </div>
                <button className="rounded-[52px] bg-[#222222] text-center px-[22px] md:px-[30px] py-[13px] md:py-[18px] text-white text-sm md:text-lg font-semibold">Apply Now</button>
            </div>
        </div>
    </section>

}


export default JobCard;