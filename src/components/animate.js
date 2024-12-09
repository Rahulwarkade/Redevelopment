import React from "react";
import Image from "next/image";
import Link from 'next/link';
import EatsVertical from "../../public/EatsVertical.png";
import toneOpEatsLogo from "../../public/toneOpEatsLogo.png";
const Animate = () => {

    const isDesktop = true;
    const verticals = [
        {
          url: EatsVertical,
          title: "ToneOp Eats",
          borderColor: "#80B53B",
          gradient: "bg-[#80B53B]",
          fromColor: "#80B53B",
          viaColor: "#59DF74",
          toColor: "#11A0DB",
          verticalUrl: "/ToneOpEats/",
        },

      ];
    
  return (
    <>
      <section className="w-full h-[95%] rounded-2xl bg-sky-300  relative">
        {/* Wrapper Div */}
        <section className="w-full h-full relative flex justify-center items-center">
          {/* Container Div for Component */}
          {verticals.map((product, idx) => {
        return (
          <div
          key={idx}
          className="onTopImg relative xl:w-[490px] xl:h-[650px] border flex flex-col items-center overflow-hidden "
          >
          <div
          className="absolute xl:w-[490px] xl:h-[580px] border flex flex-col items-center bottom-0"
          >
            <div
              className={`onTop w-full h-[383px] rounded-[24px]  border-[1px] border-[${product.borderColor}] bg-[#FFFFFFE5] shadow shadow-[#FFFFFFE5] absolute flex flex-col gap-[32px] justify-evenly  py-[36px] xl:w-[490px]   bottom-0 overflow-hidden`}
            >
            {/* Logo and Paragraph */}
            <div className="w-full h-[383px] rounded-[24px] absolute bottom-0 flex flex-col gap-[32px] justify-evenly">
              <span className="w-full h-auto flex flex-col items-center text-center gap-[32px] relative">
                <div className="w-[324px] h-[64px] relative">
                  <Image
                  src={toneOpEatsLogo}
                  fill
                  alt="toneOp Eats Logo"
                  />
                </div>
                <p
                  className="text-[20px] font-light leading-[30px] text-[#666666]"
            suppressHydrationWarning={true}
                >
                  {isDesktop
                    ? "Since 2020, ToneOp has been coming up with new initiatives to provide you with all possible health and fitness services and products."
                    : "Since 2020, ToneOp has been coming up with new initiatives to provide you with all possible health and fitness services and products. ToneOp Fit is one such platform under its umbrella which equips you with expert-created health & fitness plans through a mobile application."}
                </p>
              </span>
            
            {/* Botton Div Container */}
              <span className="w-full h-[70px] rounded-[90px] overflow-hidden">
                <Link href={`${product.verticalUrl}`}>
                  <button
                    className={`w-full h-full text-center ${product.gradient} rounded-[90px] overflow-hidden text-white text-[18px] leading-[24px] font-medium`}
                  >
                  Know more 
                  </button>
                </Link>
              </span>
            </div>
            </div>
              {/* Img Container */}
              <div className="logoImgAtTop w-full h-[184px] rounded-[12px] absolute overflow-hidden xl:w-[426px] top-full">
                <Image
                  src={product.url}
                  alt="EatsVertical"
                  fill
                  sizes="(max-width:768px) 100vw,(max-height:1200px) 50vw,33vw"
                  placeholder="blur"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              </div>
          </div>
        );
      })}

        </section>
      </section>
    </>
  );
};

export { Animate };


