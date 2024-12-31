import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const DownloadNow = () => {
  return (
    <div className="w-[428px] relative bg-[#FFFFFF] p-6">
        {/* Logo and Close Button */}
        <div className="w-full relative flex justify-between ">
          <Image
          src={'/logo.png'}
          width={139}
          height={37}
          alt="Logo"
          />
          <div className="w-[44px] h-[44px] relative rounded-full bg-black flex justify-center items-center">
            <Image
            src={"/x.png"}
            width={30}
            height={40}
            alt="Cancle Icon"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className='w-full relative mt-[33px]'>
          <ul className="flex flex-col gap-5">
            {[{navigation:"Home",slug:"/home"},{navigation:"About Us",slug:"/aboutus"},{navigation:"Our Companies",slug:"/ourcompanies"},{navigation:"Media",slug:"/media"},{navigation:"FAQs",slug:"faqs"},{navigation:"Career",slug:"/creer"},{navigation:"Contact Us",slug:"/contactus"}].map((route,index)=>{
            return (
              <li key={index} className="text-lg text-[#999999] font-semibold"><Link href={`${route.slug}`}>{route.navigation}</Link></li>
            )})}
          </ul>
        </div>
        
        {/* Play Stores Links */}
        <div className="w-full relative flex flex-col gap-4 mt-[230px]">
          {/* Horizontal line */}
          <div className="w-[285px] h-[1px] bg-[#E8E8E8]"></div>
          <p className="text-sm text-[#15C06E] font-medium">Download Our App</p>
          {/* App Store and Play Store */}
          <div className="w-full relative flex gap-5">
            {/* App Store */}
            <Image
            src={"/careLogo.png"}
            width={150}
            height={50}
            alt={"App Store"}
            />
            {/* App Store */}
            <Image
            src={"/careLogo.png"}
            width={150}
            height={50}
            alt={"App Store"}
            />
          </div>
          <div className="w-[285px] h-[1px] bg-[#E8E8E8]"></div>
        </div>
        
        {/* Social Media Links */}
        <div className='w-full relative mt-4 flex flex-col gap-4'>
          <p className='text-sm text-[#666666] font-medium'>Follow Us</p>
          <div className="w-full relative flex gap-4">
            {[{logo:"/insta.png",slug:"/facebook.com"},{logo:"/insta.png",slug:"/inta.com"},{logo:"/insta.png",slug:"/inta.com"},{logo:"/insta.png",slug:"/inta.com"},{logo:"/insta.png",slug:"/inta.com"}].map((socialMedia,index)=>{
              return <div key={`socialIcon${index}`} className="w-[36px] h-[36px] rounded-full bg-[#F9F9F9] flex justify-center items-center">
                <Link href={`${socialMedia.slug}`}>
                <Image
                src={`${socialMedia.logo}`}
                width={16}
                height={16}
                alt="icon"
                />
                </Link>
              </div>
            })}
          </div>
        </div>
    </div>
  )
}

export default DownloadNow