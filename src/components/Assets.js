import React from 'react'
import Image from 'next/image'
const Assets = ()=>{
    return (
        <section className="w-full relative flex flex-col gap-8 px-[5%] 2xl:px-[8%] md:flex-row-reverse 2xl:gap-[150px] mt-4 2xl:mt-[80px]">
            {/* About us Discription Container */}
            <div className="w-full relative flex flex-col  gap-5 text-sm 2xl:text-2xl text-[#666666] font-light 2xl:font-normal text-center 2xl:text-start">
                <article>In 2020, Bansal Tech Professionals initiated ToneOp, a health and fitness application designed to make staying fit fun, simple, and totally doable. We started with ToneOp Fit, which helped people crush their fitness goals with personalised diet and workout plans.</article>
                <article>As we grew, we realised that finding the time and resources to eat healthy every day isn’t easy. That’s why we launched ToneOp Eats, a cloud kitchen designed to deliver fresh, tasty, and nutritious meals right to your doorstep.</article>
                <article>We didn’t stop there. We knew that feeling your best also meant fueling your body with the right nutrients. Enter ToneOp Care, a line of smart, effective nutritional products designed to keep you healthy and energised.</article>
                <article>With ToneOp Fit, ToneOp Eats, and ToneOp Care, we’ve got your back every step of the way. Let’s make fitness fun and life just a little more awesome!</article>
            </div>
            {/* Website Assets Image Container */}
            <div className="w-full relative flex justify-center">
                <Image
                src={"/assets.png"}
                width={669}
                height={450}
                alt="BrandAmbassdors Image"
                />
            </div>
        </section>
    )
}


export default Assets;