import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
const Blogs = ()=>{
    return (
        <div className="w-full h-[90%]  relative rounded-2xl  bg-teal-300">
            
            {/* Hero Section */}
            <section className="w-full relative flex flex-col gap-6">
                {/* Health Logo */}
                <div className="w-full relative">
                    <div className="w-[91px] h-[32px] rounded-[54px] bg-[#E6F8EF] flex justify-center items-center text-base font-medium text-[#15C06E]">Health</div>
                </div>
                {/* Heading TextContainer */}
                <div className="w-full relative">
                    <h1 className="text-[26px] font-medium text-[#222222]">
                    Top Healthy And Nutritious Diwali Snacks This 2023
                    </h1>
                </div>
                {/* Profile audio summary dates and Social Icons  */}
                <div className="w-full relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {/* Profile Container */}
                    <div className="w-full relative flex gap-6">
                        {/* profile */}
                        {[{pic:"url",profileName:"Cody Fisher",profileStatus:"Written by:"},{pic:"url",profileName:"Martina Cody",profileStatus:"Researched by:"}].map((profile,profileIdx)=>{
                            return <div key={`${profileIdx}profile`} className="h-[41px] relative flex gap-2">
                                        <div className="size-[41px] rounded-full bg-white"></div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[10px] text-[#999999]">{profile.profileStatus}</p>
                                            <p className="text-xs text-[#999999]">{profile.profileName}</p>
                                        </div>
                                    </div>
                        })}
                    </div>
                    {/* Audio Summary Container */}
                    <div className="hidden 2xl:flex max-w-[413px] h-[40px] relative border-[1px] rounded-[20px] border-[#15C06E]">

                    </div>
                    {/* Publish Date, Time and Views */}
                    <div className="w-full relative flex justify-between">
                        {[{logo:"/insta.png",content:"03 Aug 2023"},{logo:"/insta.png",content:"15 min Read"},,{logo:"/insta.png",content:"458 Views"}].map((published,publishedIdx)=>{
                            return <div key={`${publishedIdx}published`} className="flex gap-2 items-center">
                            <Image
                            src={published.logo}
                            alt="calendar"
                            width={24}
                            height={24}
                            />
                            <p className="text-xs text-[#666666]">{published.content}</p>
                        </div>
                        })}
                    </div>

                    {/* Social Icons Container */}
                    <div className="w-full relative flex gap-3">
                        <h1>Share On:</h1>
                        <div className="flex gap-[6px]">
                            {[{iconLogo:"/whatsapp.png"},{iconLogo:"/whatsapp.png"},{iconLogo:"/whatsapp.png"},{iconLogo:"/whatsapp.png"},{iconLogo:"/whatsapp.png"}].map((socialIcon,iconIdx)=>{
                                return <div key={`${iconIdx}iconIdx`} className="size-[24px] relative rounded-full">
                                    <Image 
                                    src={socialIcon.iconLogo}
                                    fill
                                    alt="social Icon"
                                    sizes="(max-width:768px) 50px, (max-width:1280px) 100px, 33px"
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {/* Banner Container */}
                <div className="w-full relative flex justify-center">
                    {/* Banner Image Container */}
                    <div className="w-[382px] h-[231px] relative">
                        <Image
                        src={"/blogImg.jpeg"}
                        alt="Blogs Image"
                        fill
                        sizes="(max-width:768px) 100vw (max-width:1280px) 50vw,33vw"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export {Blogs};