"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Image from "next/image";
import { LenisImage } from "./LenisImage";
const Campaign = () => {
  return (
    <>
      <ReactLenis options={{ autoRaf: true }} root>
        <div className="landingpage w-full h-auto relative overflow-x-hidden">
          {/* Banner Section */}
          <div className="w-full h-screen relative ">
            <LenisImage
              url={"/banner.png"}
              alt="banner image"
              fill
              classname="object-cover absolute w-full h-full top-0 left-0"
            />
          </div>
          {/* What you Get Section */}
          <div className="w-full relative  bg-white flex flex-col gap-10 p-10">
            <h3>What you Get</h3>
            <h1>Rejuvenate Your Body, Revitalize Your Life</h1>
            <p>
              Our 7-Day Detox Plan is designed to cleanse your body, boost your
              energy levels, and improve your overall well-being. This
              comprehensive plan includes:
            </p>
            <div className="w-full relative flex flex-col gap-20">
              {[
                {
                  title: "Personalized Meal Plans",
                  description:
                    "Tailored to your specific needs and preferences.",
                },
                {
                  title: "Personalized Meal Plans",
                  description:
                    "Tailored to your specific needs and preferences.",
                },
                {
                  title: "Personalized Meal Plans",
                  description:
                    "Tailored to your specific needs and preferences.",
                },
              ].map((data, index) => {
                return (
                  <div
                    key={index}
                    className="w-[786px] h-[446px] relative overflow-hidden"
                  >
                    <LenisImage
                      src={"/campaign.png"}
                      fill
                      alt="campaign"
                      classname="absolute w-full h-full top-0 left-0"
                    />
                    <article>
                      <h1>{data.title}</h1>
                      <p>{data.description}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Payment Card */}
          <div className="w-[542px] h-[576px] rounded-2xl bg-[#FFFFFF40]
          backdrop-blur-lg drop-shadow-2xl  fixed top-[40vh] right-24 z-10"></div>
        </div>
      </ReactLenis>
    </>
  );
};

export { Campaign };
