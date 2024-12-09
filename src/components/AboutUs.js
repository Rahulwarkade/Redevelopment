import React from "react";
import Image from "next/image";
import toneOpLogoBig from "../../public/toneopLogBig.png";
import fitLogo from "../../public/fitLogo.png";
import eatsLogo from "../../public/eatsLogo.png";
import careLogo from "../../public/careLogo.png";
const ContactUs = () => {
  return (
    <>
      <section className="w-full h-[95%] rounded-2xl bg-sky-300  relative">
        {/* Wrapper Div */}
        <section className="w-full h-full relative flex justify-center items-center">
          {/* Container Div for Component */}
          <div className="w-[740px] h-[626px] border bg-teal-400 relative flex justify-center">
            {/* Eclips Container div */}
            <div className="w-[740px] h-[594px] -top-[32px] border  absolute flex justify-center items-center">
              {/* Inner Eclips First */}
              <div className="Eclips w-[362px] h-[362px] rounded-full border border-[#F1F1F1] absolute flex justify-center items-center">
                <div className="w-[244px] h-[166px] relative Logo">
                  <Image src={toneOpLogoBig} fill alt="ToneOp Logo" />
                </div>
                    {/* ToneOp Care Eclips */}
                    <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-full left-0 flex justify-center items-center z-10">
                        {/* Fit Logo Container */}
                        <div className="Logo w-[131px] h-[63px] relative">
                            <Image src={careLogo} fill alt="toneOpfit Logo" />
                        </div>
                    </div>
              </div>
              {/* Inner Eclips Second */}
              <div className="Eclips w-[443px] h-[443px] rounded-full  border border-[#F1F1F1] absolute">
                                              {/* ToneOp Fit Eclips */}
              <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[26px] right-full  flex justify-center items-center z-10">
                {/* Fit Logo Container */}
                <div className="Logo w-[131px] h-[63px] relative z-10">
                  <Image src={fitLogo} fill alt="toneOpfit Logo" />
                </div>
              </div>
              </div>
              {/* Inner Eclips Third */}
              <div className="Eclips w-[520px] h-[520px] rounded-full border border-[#F1F1F1] absolute">
                {/* ToneOp Eats Eclips */}
                <div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[142px] left-full flex justify-center items-center z-10">
                {/* Eats Logo Container */}
                <div className="Logo w-[131px] h-[63px] relative">
                    <Image src={eatsLogo} fill alt="toneOpfit Logo" />
                </div>
                </div>
              </div>
              {/* Inner Eclips Fourth */}
              <div className="w-[593px] h-[593px] rounded-full border border-[#F9F9F9] absolute">
                
              </div>
            </div>

            {/* Inner Eclips Last */}
          
            
          </div>
        </section>
      </section>
    </>
  );
};

export { ContactUs };

<div className="w-[740px] h-[626px]  border border-[#F9F9F9] absolute">
{/* ToneOp Fit Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[26px] left-0  flex justify-center items-center">
  {/* Fit Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={fitLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
{/* ToneOp Eats Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] top-[142px] right-0 flex justify-center items-center">
  {/* Eats Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={eatsLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
{/* ToneOp Care Eclips */}
<div className="w-[182px] h-[182px] rounded-full drop-shadow-2xl absolute bg-[#FCFCFC] bottom-0 left-[130px] flex justify-center items-center">
  {/* Fit Logo Container */}
  <div className="w-[131px] h-[63px] relative">
    <Image src={careLogo} fill alt="toneOpfit Logo" />
  </div>
</div>
</div>
