import React from "react";
import Image from "next/image";
import svgVerticals from "../../public/svgEffect.png";

const FAQs = () => {
  return (
    <section className="w-full h-4/5 bg-sky-400 relative">
      <div className="w-full relative">
        <div className="w-fit h-fit relative bg-green-400">
          <h1 className="text-black text-[42px] font-normal">FAQs</h1>
          <div className="w-fit h-fit absolute  z-10">
            <Image src={svgVerticals} alt="vertical svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQs };
