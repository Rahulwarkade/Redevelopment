import React from 'react'
import Image from 'next/image';
const Subscribe = ()=>{
    return <div className="w-full 2xl:w-[1600px] h-[450px] bg-gradient-to-r from-[#FFE6CF80] to-[#DDECFF80] relative overflow-hidden">
                    <div className="eclipsOne hidden md:inline w-[411px] h-[411px] absolute rounded-full left-[11%] top-[137px] bg-gradient-to-r from-[#FFE6CF99] to-[#FFFFFF99] duration-[10000ms] ease-in-out"></div>
        <div className="eclipsOneRes md:hidden w-[270px] h-[270px] absolute rounded-full -left-[150px] -top-[130px] bg-gradient-to-r from-[#FFE6CF99] to-[#FFFFFF99] duration-[10000ms] ease-in-out"></div>
        <div className="eclipsTwo hidden md:inline w-[171px] h-[171px] rounded-full bg-gradient-to-r from-[#DDECFF99] to-[#FFFFFF99]  absolute left-[63%] top-[20px] duration-[10000ms] ease-in-out"></div>
        <div className="eclipsTwoRes md:hidden z-10 w-[76px] h-[76px] rounded-full bg-gradient-to-r from-[#DDECFF99] to-[#FFFFFF99]  absolute left-[50px] -bottom-[20px] duration-[10000ms] ease-in-out"></div>
        <div className="eclipsThree hidden md:inline w-[185px] h-[185px] absolute rounded-full bg-gradient-to-r from-[#DDECFF99] to-[#FFFFFF99] top-[314px] left-[95%] duration-[10000ms] ease-in-out"></div>
        <div className="eclipsThreeRes md:hidden w-[117px] h-[117px] absolute rounded-full bg-gradient-to-r from-[#DDECFF99] to-[#FFFFFF99] top-[73%] left-[75%] duration-[10000ms] ease-in-out"></div>

        <div className="w-full h-full absolute flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-[42px] md:text-nowrap text-center text-[#222222] font-normal">
            Subscribe to ToneOp Newsletter
            </h1>

            <p className="text-base md:text-2xl text-center text-[#999999] mt-4 md:mt-8">
            Get the best health reads right in your inbox!
            </p>

            <div className="w-[298px] md:w-[489px] h-[48px] md:h-[80px]  relative mt-8 md:mt-[60px]">
                <span className="absolute w-[32px] md:w-[64px] h-[24px] md:h-[48px] rounded-[20px] md:rounded-[41px] bg-[#222222] flex justify-center items-center mx-[18px] md:mx-6 my-3 md:my-4 right-0">
                    <Image
                    src={"/arrow-right.svg"}
                    width={24}
                    height={24}
                    alt="arrow"
                    />
                </span>
                <input className="w-full h-full rounded-[27px] md:rounded-[36px] bg-[#F9F9F9] py-3 md:py-4 px-4 md:px-6 md:placeholder:text-[#999999] placeholder:text-[12px] md:placeholder:text-[18px] outline-none" placeholder="Enter your email id!"/>
            </div>
        </div>
      </div>
}

export default Subscribe;