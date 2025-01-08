import react from 'react'

const Touch = ()=>{
    return <>
        <section className="w-full relative px-[5%] xl:px-[8%]">
        {/* Get In Touch Container */}
            <div className="w-full md:h-[400px] relative bg-gradient-to-r from-[#FFE6CF80] to-[#DDECFF80] pt-[50px] md:pt-[118px]  pb-[40px] md:pb-0 flex flex-col gap-[50px] rounded-[30px] md:flex-row">
                <div className="hidden md:block absolute size-[84px] rounded-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF00] left-[44%] top-[116px]"></div>
                <div className="hidden md:block absolute size-[84px] rounded-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF00] left-[61%] bottom-[42px]"></div>
                <div className="hidden md:block absolute size-[36px] rounded-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF00] left-[20%] bottom-0"></div>
                <div className="hidden md:block absolute w-[989px] h-[637px] rounded-full border border-white left-1/2 top-[216px]"></div>
                <div className="w-full relative flex flex-col gap-4">
                    <h3 className="text-2xl text-[#434343] lg:text-[42px] md:text-[#222222]  text-center  lg:leading-[54px] md:text-start md:pl-[8%]">What's holding you back from reaching your health goals?</h3>
                    <p className="text-sm text-[#434343] text-center md:text-lg md:text-[#666666] md:text-start md:pl-[8%]">Connect with our health experts and get free assistance.</p>
                </div>
                <div className="w-full relative px-6 md:px-0 md:h-full">
                    {/* Form Container */}
                    <div className="w-full md:max-w-[530px] md:max-h-[380px] relative md:absolute md:bottom-[100px] md:right-[8%] flex flex-col gap-8 md:gap-[44px] px-5 md:px-[40px] py-8 bg-[#FFFFFF] rounded-[20px] ">
                        <h3 className="text-base md:text-xl text-[#666666] font-semibold">Get In Touch With Us!</h3>

                        <div className="w-full flex flex-col gap-4 md:gap-5 relative">
                            <input className="w-full relative h-[56px] bg-[#F9F9F9] rounded-[12px] p-4 placeholder:text-sm md:placeholder:text-lg placeholder:text-[#999999] outline-none" placeholder="Name"/>
                            <input className="w-full relative h-[56px] bg-[#F9F9F9] rounded-[12px] p-4 placeholder:text-sm md:placeholder:text-lg  placeholder:text-[#999999] outline-none" placeholder="Number"/>
                        </div>

                        <button className="w-[188px] h-[52px] md:w-[219px] md:h-[70px] px-[19px] md:px-8 py-[17px] md:py-6 text-center text-white bg-[#222222] rounded-[67px] text-sm md:text-xl font-medium mx-auto"> Get A Call Back </button>
                    </div>
                </div>
            </div>
        </section>
    </>
}


export default Touch;