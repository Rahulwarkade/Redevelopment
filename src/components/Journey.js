import Image from "next/image";
import React,{useRef} from "react";

const Journey = () => {

  const journeyRef = useRef();
  const scrollHandler = (direction) => {
    event.preventDefault();
    // console.log(journeyRef.current.scrollLeft)
    if(journeyRef.current) journeyRef.current.scrollLeft += 200;
  };
  return (
    <>
      <section className="w-full h-3/4 rounded-2xl bg-red-300 ">
        <div className="w-full h-1/4 bg-green-400">
          <div>
            <h1>ToneOp`s Journey!</h1>
          </div>
          <div className="hidden">
            <p>
              We started ToneOp with a team of just but amazingly talented ten
              members. We had only one thing in mind: “Health anywhere,
              anytime”. We wanted to create a platform where people could feel
              comfortable and connected with our services. We wanted to make
              sure that they found a friend in our coaches and desired results
              with our services.
            </p>
          </div>
        </div>
        <div className="w-full h-1/2 bg-blue-400">
          <div className="hidescroll ref={journeyRef} w-full h-full overflow-x-auto  gap-5">
            <div  className="w-fit h-full relative flex items-center">
              <Image
                src="/journeyLine.png"
                width={1000}
                height={100}
                alt="Journey line"
                style={{
                  objecetFit: "contain",
                }}
                className="-translate-y-1/2"
              />
              <div className="w-full h-full absolute flex  items-end">
                <div className="w-full h-3/4 relative">
                  <div className="w-full  flex justify-center relative">
                    <div className="w-[155px] h-[155px] rounded-full bg-white"></div>
                  </div>
                  <div className="w-full h-1/2 bg-indigo-400 relative"></div>
                </div>
              </div>
            </div>
            <div  className="w-fit h-full relative flex items-center">
              <Image
                src="/journeyLine.png"
                width={1000}
                height={100}
                alt="Journey line"
                style={{
                  objecetFit: "contain",
                }}
                className="-translate-y-1/2"
              />
              <div className="w-full h-full absolute flex  items-end">
                <div className="w-full h-3/4 relative">
                  <div className="w-full  flex justify-center relative">
                    <div className="w-[155px] h-[155px] rounded-full bg-white"></div>
                  </div>
                  <div className="w-full h-1/2 bg-indigo-400 relative"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/4 bg-sky-500 relative flex justify-center items-center">
          <div className="relative flex gap-6">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8E8E8] relative flex justify-center items-center">
              <button
                type="button"
                onClick={(event) => {
                  scrollHandler("left");
                }}
              >
                L
              </button>
            </div>
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8E8E8] relative flex justify-center items-center">
              <button
                type="button"
                onClick={(event) => {
                  scrollHandler("right");
                }}
              >
                R
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Journey };
