import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
const Blogs = ()=>{
    return (
        <div className="w-full h-[90%]  relative rounded-2xl flex justify-center items-center">
            {/* Footer div*/}
            <div className="w-full relative bg-black">
                {/* Logo & Navigations & Social Links */}
                <div className="w-full relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-0 md:mt-[80px] md:mb-[66px]">
                    {/* Logo Container Div */}
                    <div className="w-full relative flex justify-center items-center bg-rose-300 lg:items-start xl:justify-start">
                        <Image
                        src={'/footerLogo.png'}
                        width={150}
                        height={40}
                        alt="footer Logo"
                        style={{
                            objectFit : "contain"
                        }}
                        />
                    </div>

                    {/* Social Icons and Navigation Links Container */}
                    <div className="w-full relative flex flex-col items-center gap-10 lg:gap-0 md:col-start-2 md:col-end-5 bg-green-300 lg:grid lg:grid-cols-3 ">
                        {/* Social Icon Container */}
                        <div className="w-full relative flex gap-8 lg:gap-4 lg:flex-wrap justify-center items-center lg:items-start lg:col-start-3 bg-blue-300 lg:absolute lg:place-self-start xl:justify-end">
                            {
                                [{logo:'/insta.png',slug:'/instagram.com'},{logo:'/insta.png',slug:'/instagram.com'},{logo:'/insta.png',slug:'/instagram.com'},{logo:'/insta.png',slug:'/instagram.com'},{logo:'/insta.png',slug:'/instagram.com'}].map((socialIcon,idx)=>{
                                    return (
                                        <div key={idx} className="min-w-[48px] min-h-[48px] rounded-full bg-[#666666] relative flex justify-center items-center">
                                            <Image
                                            src={socialIcon.logo}
                                            width={24}
                                            height={24}
                                            alt="Social Icon"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* Navigation Link Container */}
                        <div className="w-full  relative grid grid-cols-3 lg:col-start-1 lg:col-end-3 bg-red-300">
                            {/* Routing Container */}
                            <div className="flex flex-col gap-4 items-center">
                                {[{route:"Home",slug:"/Home"},{route:"About Us",slug:"/AboutUs"},{route:"Career",slug:"/Career"},{route:"Contact",slug:"/Contact"},{route:"Blogs",slug:"/Blogs"},{route:"Media",slug:"/Media"}].map((router,routeIdx)=>{
                                    return (
                                        <Link key={routeIdx} href={router.slug}>
                                            <li className="text-sm text-[#999999] list-none text-nowrap">{router.route}</li>
                                        </Link>
                                    )
                                })}
                            </div>
                            {/* Privacey police Container */}
                            <div className="flex flex-col gap-4 items-center">
                                {[{route:"Privacy Policy",slug:"/Home"},{route:"Terms & Conditions",slug:"/Home"},{route:"Legal Disclaimer",slug:"/Home"}].map((router,routeIdx)=>{
                                    return (
                                        <Link key={routeIdx} href={router.slug}>
                                            <li className="text-sm text-[#999999] list-none text-nowrap">{router.route}</li>
                                        </Link>
                                    )
                                })}
                            </div>
                            {/* Brands Container */}
                            <div className="flex flex-col gap-4 items-center">
                                {[{route:"ToneOp Fit",slug:"/ToneOpFit"},{route:"ToneOp Care",slug:"/ToneOpCare"},{route:"ToneOp Eats",slug:"/ToneOpEats"}].map((router,routeIdx)=>{
                                    return (
                                        <Link key={routeIdx} href={router.slug}>
                                            <li className="text-sm text-[#999999] list-none text-nowrap">{router.route}</li>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>    
                    </div>
                </div>
                    {/* Address and Copy right Container */}
                    <div className="w-full relative">
                            {/* Address Container div */}
                            <div>
                                <p className="text-sm text-[#999999] text-center"><span className="text-sm font-medium text-white">Address:</span>
                                ToneOp, Bansal Tech Professionals Private Limited, 3rd Floor, Tawa Complex, Bittan Market E-5, Arera Colony, Bhopal Madhya Pradesh, 462016
                                </p>
                            </div>
                            <hr className="md:my[32px]"/>
                            {/* Copy right Container */}
                            <div className="w-full relative">
                                <p className="text-sm text-[#666666] text-center">
                                ©ToneOp 2024 - All rights reserved.
                                </p>
                            </div>
                    </div>

            </div>


        </div>
    )
}

export {Blogs};