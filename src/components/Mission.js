import React from "react";
import Image from "next/image";
const Mission = () => {
  return (
    <>
      <section className="w-11/12 relative rounded-2xl bg-gradient-to-r from-[#DDECFF] via-[#FFFFFF]  to-[#DDECFF]">
        <section className="w-full h-1/2 relative flex flex-col md:flex-row ">
          <div className="w-full relative md:flex md:flex-col md:items-center md:justify-center xl:px-32">
            <div className="w-full relative text-center">
              <h1>Meet Our Founder</h1>
            </div>
            <div className="w-full  p-4 relative">
              <p className="text-[#666666] text-base font-light text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
          <div className="w-full h-[300px] xl:h-[600px] md:w-1/2   relative xl:translate-x-10 xl:-translate-y-10">
            <div className="w-[224px] xl:w-[449px] h-full  rounded-md absolute right-0">
              <Image src={"/jump.png"} fill alt="juping image" />
            </div>
          </div>
        </section>
        <section className="w-full h-1/2 xl:h-auto relative flex flex-col md:flex-row">
          <div className="w-full h-[300px] xl:h-[600px] md:w-1/2  relative xl:-translate-x-10 xl:translate-y-10">
            <div className="w-[224px] xl:w-[449px] h-full  rounded-md absolute left-0">
              <Image src={"/jump2.png"} fill alt="juping image" />
            </div>
          </div>
          <div className="w-full relative md:flex md:flex-col md:items-center md:justify-center xl:px-32">
            <div className="w-full  relative text-center">
              <h1>Meet Our Founder</h1>
            </div>
            <div className="w-full p-4 relative">
              <p className="text-[#666666] text-base font-light text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
        </section>
        <div className="w-[23%] h-[88px] md:w-[40%] md:h-[1px] absolute rounded-md left-[50%] top-[50%] -translate-y-1/2 -translate-x-1/2 bg-[#FCFDFF] md:bg-[#C5C5C5] flex justify-center items-center">
          <div className="w-[48px] h-[56px] relative md:hidden">
            <Image src="/ticon.png" alt="Icong loading" fill />
          </div>
        </div>
      </section>
    </>
  );
};

export { Mission };
