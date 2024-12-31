import React from "react";
import Image from "next/image";
import Link from "next/link";



const Fitness = () => {
    const Fitness_Points = [{points:"Customised Health Plans"},{points:"Customised Health Plans"},{points:"Customised Health Plans"},{points:"Customised Health Plans"},{points:"Customised Health Plans"},{points:"Customised Health Plans"},]
  return (
    <div className="w-full mt-10  pb-10 lg:pb-2 md:my-48 md:mb-14 bg-gradient-to-t lg:bg-gradient-to-t from-[#FDF5E9] to-[#E2E7F4]">
      <div className="max-w-[89%] md:max-w-[83%] mx-auto flex flex-col-reverse lg:flex-row relative lg:justify-between">
        <div className="max-w-full lg:max-w-[45%] lg:relative lg:-top-20">
          <Image
            src="/mobileFit.png"
            alt="fitness"
            width={708}
            height={849}
            className="hidden   lg:block"
          />
          <Image
            src="/milindFitMobile.png"
            alt="fitness"
            width={380}
            height={508}
            className="block  lg:hidden mx-auto"
          />
        </div>
        <div className="my-14 lg:my-0 max-w-full lg:max-w-[38.5%]">
          <div
            className={`text-[2rem] leading-9 lg:text-4xl 2xl:text-[2.625rem] 2xl:leading-[3.375rem] font-normal text-[#222222] lg:mt-10`}
          >
            Complete Wellness With Fit, Eats & Care
          </div>
          {/* {!isMobile && (
            <div
              className={`text-xs lg:text-base 2xl:text-lg font-normal text-[#999999] mt-6 lg:4 2xl:mt-7`}
            >
              Get all that you need to achieve your health goals and stay fit in
              one place.
            </div>
          )} */}
          <div className="grid grid-cols-2 justify-between mt-8 lg:mt-10 2xl:mt-16">
            {Fitness_Points?.map((item, idx) => (
              <div className="flex gap-2 items-center mb-3 2xl:mb-6" key={idx}>
                <div>
                  <Image
                    src="/tick-circle.png"
                    alt="tick"
                    width={24}
                    height={24}
                  />
                </div>
                <div
                  className={`text-[#666666] text-sm font-medium lg:text-base 2xl:text-lg`}
                >
                  {item.points}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              className={`text-[#999999] hidden lg:block`}
            >
              Download our app
            </div>
            <div className="flex gap-5 lg:gap-9 items-center">
              <Link
                href={
                  "https://apps.apple.com/in/app/toneop-health-and-fitness-app/id1586794292"
                }
                target="blank"
              >
                <div className="cursor-pointer">
                  <Image
                    src="/android.png"
                    alt="apple"
                    width={240}
                    height={80}
                  />
                </div>
              </Link>
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.toneop.mobile"
                }
                target="blank"
              >
                <div className="cursor-pointer">
                  <Image
                    src="/android.png"
                    alt="android"
                    width={240}
                    height={80}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;