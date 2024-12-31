import React, { useState } from "react";
// import Button from "../Button/Button";
// import { INITIAL_TOUCH_DATA } from "@/constant";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { sendContactDetails } from "@/api/apifunction";


const Touch = () => {
    const INITIAL_TOUCH_DATA = {
        name: "",
        phone: "",
      };
      
  const [info, setInfo] = useState(INITIAL_TOUCH_DATA);
  const [isThankShow, setIsThankShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const phoneNumberRegex = /^(?!.*(\d)\1{5,})[6-9](?:(?!(\d)\2{5,}).)*\d{9}$/;
    const nameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;

    if (info.name === "") {
      toast.error("Please Enter The Name");
      return;
    } else if (info.name.length <= 3) {
      toast.error("Name should be at least 4 character long");
      return;
    } else if (!nameRegex.test(info.name)) {
      toast.error("Please Enter the Valid Name");
      return;
    }
    if (info.phone === "") {
      toast.error("Please Enter The Phone Number");
      return;
    } else if (!phoneNumberRegex.test(info.phone)) {
      toast.error("Invalid phone number format");
      return;
    }
    if (info.phone) {
      let loadingToast = toast.loading("Data Sending....");
      const data = await sendContactDetails({
        phone: info.phone,
        name: info.name,
        message: "Call Back Leads",
      });
      if (data.status) {
        toast.dismiss(loadingToast);
        setInfo(INITIAL_TOUCH_DATA);
        setIsThankShow(true);
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message);
      }
    }
  };
  return (
    <>
      <Toaster />
      <div className="py- md:pt-14  mx-auto bg-[#ffffff]">
        <div className="mt-1  w-full max-w-[89%]  md:max-w-[83%] mx-auto  flex flex-col lg:flex-row justify-between  bg-gradient-to-b from-[#15C06E]/15 to-[#ffffff] rounded-2xl p-8 lg:pt-20 lg:relative ">
          <div className="lg:max-w-[40%]">
            <div
              className={`${poppins.className} text-3xl text-black lg:text-[2.625rem] lg:leading-[3.375rem]`}
            >
              Not Sure Of The Right Plan For You?
            </div>
            <div
              className={`${poppins.className} text-xs lg:text-lg text-[#666666] mt-8`}
            >
              It&apos;s never too late to start a healthy lifestyle! Book a 1:1
              consultation with our health expert to achieve your desired
              health.
            </div>
          </div>
          <div className="lg:max-w-[40%] shadow-xl rounded-2xl bg-white p-8 lg:pt-10 mt-14 lg:mt-0 lg:min-w-[33rem] lg:absolute lg:-top-16 right-10">
            {isThankShow ? (
              <div className="flex flex-col items-center gap-4">
                <div>
                  <Image
                    src="/touch/check.png"
                    alt="check"
                    width={90}
                    height={90}
                  />
                </div>
                <div
                  className={`${poppins.className} text-[#15C06E] font-semibold text-4xl`}
                >
                  Thank You
                </div>
                <div
                  className={`${poppins.className} text-[#999999] text-lg text-center`}
                >
                  An expert from our team will reach out to you shortly.
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={`${poppins.className} text-base lg:text-xl font-semibold text-[#666666]`}
                >
                  Get in touch with us!
                </div>
                <div className="w-full rounded-lg mt-9">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-1 rounded-lg outline-none w-full h-14 bg-[#F9F9F9]"
                    maxLength={20}
                    name="name"
                    value={info.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full rounded-lg mt-5">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="p-1 rounded-lg outline-none w-full h-14 bg-[#F9F9F9]"
                    maxLength={10}
                    name="phone"
                    value={info.phone}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  title="get a call back"
                  classname={`${poppins.className} mx-auto capitalize rounded-full flex items-center justify-center font-semibold text-xs lg:text-lg  text-white bg-black hover:bg-gradient-to-r from-[#59DF74] to-[#15C0B6] px-4 py-4 mt-5 lg:mt-10 lg:min-w-[200px]`}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Touch;
