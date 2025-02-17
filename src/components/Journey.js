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

// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import { aboutUsImg, commonImges } from "@/Utils/ImgUrl";
// import { Effect } from "../Common/Effect";
// import useIsDesktop from "../CustomHooks/useIsDesktop";
// import { journeyData } from "@/constants";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";
// gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
// const generateNextBezier = (prevEndX, prevEndY) => {
//   if (prevEndY == 135) {
//     const newCp1X = prevEndX + 250;
//     const newCp1Y = prevEndY == 12 ? 12 : 135;

//     const newCp2X = newCp1X + 35;
//     const newCp2Y = newCp1X == 135 ? 135 : 12;

//     const newEndX = newCp2X + 250;
//     const newEndY = newCp2Y;

//     return {
//       bezier: `C${newCp1X} ${newCp1Y}, ${newCp2X} ${newCp2Y}, ${newEndX} ${newEndY}`,
//       newValues: { prevEndX: newEndX, prevEndY: newEndY },
//     };
//   } else {
//     const newCp1X = prevEndX + 250;
//     const newCp1Y = prevEndY == 12 ? 12 : 135;

//     const newCp2X = newCp1X + 35;
//     const newCp2Y = newCp1X == 135 ? 12 : 135;

//     const newEndX = newCp2X + 250;
//     const newEndY = newCp2Y;

//     return {
//       bezier: `C${newCp1X} ${newCp1Y}, ${newCp2X} ${newCp2Y}, ${newEndX} ${newEndY}`,
//       newValues: { prevEndX: newEndX, prevEndY: newEndY },
//     };
//   }
// };

// const Journey = () => {
//   let centerX = 424;
//   const  counter = useRef(1);
//   const isDesktop = useIsDesktop();
//   const journeyRef = useRef();
//   const pathRef = useRef();
//   const [path, setPath] = useState(
//     `M-135 133 C-135 135 174 12 424 2 C674 12 710 135 960 135 C1210 135 1245 12 1497 12 C1745 12 1775 135 2025 135`
//   );
//   const prevEndX = useRef(2025);
//   const prevEndY = useRef(135);
//   const height = useRef(0);
//   const extendPath = () => {
//     const { bezier, newValues } = generateNextBezier(
//       prevEndX?.current,
//       prevEndY?.current
//     );
//     setPath((prevPath) => `${prevPath} ${bezier}`);
//     prevEndX.current = newValues?.prevEndX;
//     prevEndY.current = newValues?.prevEndY;
//   };

//   useEffect(() => {
//     const generatePath = () => {
//       journeyData.map((data, index) => {
//         if (index < journeyData.length - 4) extendPath();
//         if (
//           Math.floor(data?.description?.split(" ").length / 6) > height?.current
//         ) {
//           height.current = Math.floor(
//             data?.description?.split(" ").length / 40
//           );
//         }
//       });
//     };
//     generatePath();
//     // scrollHandler("right");
//   }, []);
  
//   const scrollHandler = (direction) => {
//     const maxGap = 500;
//     const pathLength = pathRef.current.getTotalLength();
//     // const segmentLength = maxGap / pathLength;
//     const elements = gsap.utils.toArray(".motion");
//     const segmentLength = Math.min(maxGap / pathLength, 1 / elements.length);
    
//     if(counter.current==1)
//     {
//       // Initialize the positions
//       elements.forEach((element, index) => {
//       element.dataset.position = index * maxGap;
//       });
//     }
//     // console.log(pathRef.current.getTotalLength())
//     // console.log(pathRef.current.getPointAtLength(215))


// function animateElement(element, currentPosition) {
//   gsap.to(element, {
//     duration: 5,
//     motionPath: {
//       path: '#path',
//       align: '#path',
//       autoRotate: true,
//       alignOrigin: [0.5, 0.5],
//       start: currentPosition / pathLength,
//       end: Math.min((currentPosition + maxGap) / pathLength, 1)
//     },
//     onComplete: () => {
//       currentPosition += maxGap;
//       element.dataset.position = currentPosition; // Update current position for next animation
//     }
//   });
// }

//   const timeLine = gsap.timeline();
//   // const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 }); // Infinite loop with a delay between repeats
// function animateElementTimeLine(element, index) {
//   timeLine.to(element, {
//     duration: 5,
//     motionPath: {
//       path: '#path',
//       align: '#path',
//       autoRotate: true,
//       alignOrigin: [0.5, 0.5],
//       start: index * segmentLength,
//       end: (index + 1) * segmentLength
//     }
//   }, index * 5); // Stagger start times to ensure sequential animation

// }

// function animateElementReverse(element, currentPosition) {
//   gsap.to(element, {
//     duration: 5,
//     motionPath: {
//       path: '#path',
//       align: '#path',
//       autoRotate: true,
//       alignOrigin: [0.5, 0.5],
//       start: currentPosition / pathLength,
//       end: Math.max((currentPosition - maxGap) / pathLength, 0)
//     },
//     onComplete: () => {
//       currentPosition -= maxGap;
//       element.dataset.position = currentPosition; // Update current position for next animation
//     }
//   });
// }

// function startAnimation() {

//   elements.forEach((element) => {
//     const currentPosition = parseFloat(element.dataset.position);
//     animateElement(element, currentPosition);
//   });
// }

// function nextSegment() {
//   const firstElementPosition = parseFloat(elements[0].dataset.position);

//   if (counter.current!= 1 && (firstElementPosition >= 500)) {
//     console.log("Animation paused: elements are at the start.");
//     return;
//   }

//   elements.forEach((element,index) => {
//     let currentPosition = parseFloat(element.dataset.position);
//     if (currentPosition < pathLength) {
//       console.log(currentPosition)
//       if(currentPosition==0)
//       {
//         animateElementTimeLine(element, index);
//       }
//       else{
//         animateElement(element, currentPosition);
//       }
//     }
//   });
// }
// function previousSegment() {
//   const lastElementPosition = parseFloat(elements[elements.length - 1].dataset.position);
      
//   if (counter.current !=1 && (lastElementPosition < 2000)) {
//     console.log("Animation paused: elements are too close to the end.");
//     return;
//   }
//   elements.forEach((element) => {
//     let currentPosition = parseFloat(element.dataset.position);
//     if (currentPosition > 0) {
//       animateElementReverse(element, currentPosition);
//     }
//   });
// }
// // Example of how to call the functions based on counter
// if (counter.current == 1) {
//   console.log("animation start");
//   startAnimation();
//   counter.current++;
// } else {
//   console.log("animation end");
//   if(direction==="left")
//   {
//     previousSegment();
//   }
//   else {
//     nextSegment();
//   }
// }
//     // if (direction === "left") {
//     //   journeyRef.current.scrollLeft -= isDesktop ? 652 : 452;
//     // } else {
//     //   journeyRef.current.scrollLeft += isDesktop ? 652 : 452;
//     // }
//   };

//   // useEffect(() => {
//   //   const el = journeyRef.current;
//   //   if (el) {
//   //     const onWheel = (e) => {
//   //       if (e.deltaY == 0) return;
//   //       e.preventDefault();
//   //       el.scrollTo({
//   //         left: el.scrollLeft + e.deltaY,
//   //         behavior: "smooth",
//   //       });
//   //       // if (!pathRef.current) return;
//   //       // const pathLength = pathRef.current.getTotalLength();
//   //       // pathRef.current.style.strokeDasharray = `${pathLength}`;
//   //       // const totalScrollWidth = el.scrollWidth - el.clientWidth;
//   //       // const offset = totalScrollWidth - el.scrollLeft;
//   //       // pathRef.current.style.strokeDashoffset = `${offset}`;
//   //     };
//   //     el.addEventListener("wheel", onWheel);
//   //     return () => el.removeEventListener("wheel", onWheel);
//   //   }
//   // }, []);

//   return (
//     <>
//       <section className="w-full h-[690px] md:h-[800px] xl:h-[1106px] mt-12 xl:mt-[10%] bg-gradient-to-r from-[#FFE6CF80] to-[#DDECFF80] flex flex-col justify-evenly items-center xl:pt-[5%]  relative ">
//         {/* Svg Effect and Text Content */}
//         <div className="w-full relative flex justify-center items-center gap-20 py-5 xl:pl-[160px] md:pl-[5%] max-md:mt-[60px]">
//           <Effect
//             textContent="ToneOp Journey"
//             textClass="text-[#222222] text-2xl font-normal xl:text-[42px] text-nowrap "
//           />
//           <div className="w-full px-[60px] hidden md:flex ">
//             <p className="text-xl font-normal text-[#999999]">
//               We started ToneOp with a team of just but amazingly talented ten
//               members. We had only one thing in mind: “Health anywhere,
//               anytime”. We wanted to create a platform where people could feel
//               comfortable and connected with our services. We wanted to make
//               sure that they found a friend in our coaches and desired results
//               with our services.
//             </p>
//           </div>
//         </div>

//         <div
//           className="w-full overflow-scroll hideScroller scroll-smooth overflow-y-hidden animate"
//           ref={journeyRef}
//         >
//           <div className="w-full h-full absolute">
//             <Image
//               src={aboutUsImg.journeyImg.journeyLine}
//               width={1000}
//               height={136}
//               alt="journey"
//               className="lg:hidden"
//             />
//             <Image
//               src={aboutUsImg.journeyImg.journeyLineBig}
//               width={1920}
//               height={136}
//               alt="journey"
//               className="hidden lg:flex xl:hidden translate-y-10"
//             />
//           </div>
//           <div className="lg:min-w-[4100px] ">
//             {isDesktop ? (
//               <div className="w-full h-full relative">
//                  <div id="motion" className="size-[300px] bg-red-300 rounded-full absolute motion left-16"></div>
//                  <div id="motion" className="size-[200px] bg-green-300 rounded-full absolute motion left-10"></div>
//                  <div id="motion" className="size-[200px] bg-teal-300 rounded-full absolute motion left-16"></div>
//                  <div id="motion" className="size-[200px] bg-sky-300 rounded-full absolute motion left-10"></div>
//                  <div id="motion" className="size-[200px] bg-yellow-300 rounded-full absolute motion left-16"></div>
//                  <div id="motion" className="size-[200px] bg-rose-300 rounded-full absolute motion left-10"></div>
//                  <div id="motion" className="size-[200px] bg-teal-300 rounded-full absolute motion left-16"></div>
//                  <div id="motion" className="size-[200px] bg-white rounded-full absolute motion left-10"></div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="136"
//                   fill="none"
//                   className="animate"
//                 ></svg>

//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="136"
//                   fill="none"
//                 >
//                   <path
//                   id="path"
//                     ref={pathRef}
//                     d={path}
//                     stroke="#222222"
//                     strokeWidth="3"
//                     strokeDasharray="10 10"
//                   />
//                   {/* {journeyData?.map((data, index) => {
//                     if (index != 0) centerX += 535;
//                     return (
//                       <g key={index}>
//                         <clipPath id={`clip-circle-${index}`}>
//                           <circle
//                             cx={`${centerX}`}
//                             cy={`${index % 2 == 0 ? 2 : 135}`}
//                             r="100"
//                           />
//                         </clipPath>
//                         <circle
//                           cx={`${centerX}`}
//                           cy={`${index % 2 == 0 ? 2 : 135}`}
//                           r="100"
//                           fill="white"
//                         />
//                         <image
//                           href={data?.logo}
//                           x={`${centerX - 100}`}
//                           y={`${index % 2 == 0 ? -98 : 35}`}
//                           width="200"
//                           height="200"
//                           clipPath={`url(#clip-circle-${index})`}
//                         />
//                         <text
//                           x={`${centerX}`}
//                           y={`${index % 2 == 0 ? 150 : 290}`}
//                           fontSize="20"
//                           fontWeight="500"
//                           fill="black"
//                           textAnchor="middle"
//                         >
//                           {data?.date}
//                         </text>
//                         <text
//                           x={`${centerX}`}
//                           y={`${index % 2 == 0 ? 180 : 320}`}
//                           textAnchor="middle"
//                         >
//                           {data?.title
//                             .split(" ")
//                             .reduce((acc, word, i) => {
//                               const lastTspan = acc[acc.length - 1];
//                               if (lastTspan && lastTspan.words.length < 10) {
//                                 lastTspan.words.push(word);
//                               } else {
//                                 acc.push({
//                                   words: [word],
//                                   dy: acc.length ? "1.2em" : "0",
//                                 });
//                               }
//                               return acc;
//                             }, [])
//                             .map((line, i) => (
//                               <tspan
//                                 key={i}
//                                 x={`${centerX}`}
//                                 dy={line.dy}
//                                 fill="#666666"
//                                 fontSize="24"
//                                 fontWeight="700"
//                               >
//                                 {line.words.join(" ")}
//                               </tspan>
//                             ))}
//                           <tspan key={1} x={`${centerX}`} dy="2em" fill="none">
//                             a
//                           </tspan>

//                           {data?.description
//                             .split(" ")
//                             .reduce((acc, word, i) => {
//                               const lastTspan = acc[acc.length - 1];
//                               if (lastTspan && lastTspan.words.length < 10) {
//                                 lastTspan.words.push(word);
//                               } else {
//                                 acc.push({
//                                   words: [word],
//                                   dy: acc.length ? "1.2em" : "0",
//                                 });
//                               }
//                               return acc;
//                             }, [])
//                             .map((line, i) => {
//                               return (
//                                 <tspan
//                                   key={i}
//                                   x={`${centerX}`}
//                                   dy={line.dy}
//                                   fill="#666666"
//                                   fontSize="18"
//                                 >
//                                   {line.words.join(" ")}
//                                 </tspan>
//                               );
//                             })}
//                         </text>
//                       </g>
//                     );
//                   })} */}
                
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="136"
//                   fill="none"
//                 ></svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="100%"
//                   height="136"
//                   fill="none"
//                 ></svg>
//                 {Array.from({ length: height?.current }, (_, index) => {
//                   return (
//                     <svg
//                       key={`${index}height`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="100%"
//                       height="136"
//                       fill="none"
//                     ></svg>
//                   );
//                 })}

               
//               </div>
//             ) : (
//               <div className="w-full min-h-[401px]  relative ">
//                 <div className="w-full  flex absolute ">
//                   {journeyData?.map((data, index) => (
//                     <div
//                       key={`${index}journey`}
//                       className={`min-w-[452px] max-w-[452px] relative flex justify-center items-center `}
//                     >
//                       <div className="w-full h-full">
//                         <div className="w-full h-auto flex justify-center">
//                           <div className="w-[155px] h-[155px] rounded-full relative bg-white">
//                             <Image
//                               src={data?.logo}
//                               width={155}
//                               height={155}
//                               alt="journey logo"
//                               className="w-full h-full"
//                             />
//                           </div>
//                         </div>
//                         <div className="w-full ">
//                           <div className="py-3 text-center">
//                             <h2 className="text-[#666666] text-xl">
//                               {data.date}
//                             </h2>
//                             <h2 className="text-[#666666] text-xl">
//                               {data.title}
//                             </h2>
//                           </div>
//                           <div className="text-[#999999] text-sm text-center px-20">
//                             <p>{data.description}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Scroller Left and Right */}
//         <div className="w-full relative flex justify-center items-center mb-[40px] xl:mb-[80px]">
//           <div className="relative flex gap-6">
//             <button type="button" onClick={() => scrollHandler("left")}>
//               <div className="w-[64px] h-[64px] md:size-[92px] rounded-full border-[1px] border-[#E8E8E8] relative flex justify-center items-center">
//                 <div className="w-4 h-4 xl:w-6 xl:h-6 relative">
//                   <Image
//                     src={commonImges.scrollLeft}
//                     fill
//                     alt="left arrow"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
//               </div>
//             </button>
//             <button type="button" onClick={() => scrollHandler("right")}>
//               <div className="w-[64px] h-[64px] md:size-[92px] rounded-full border-[1px] border-[#E8E8E8] relative flex justify-center items-center">
//                 <div className="w-4 h-4 xl:w-6 xl:h-6 relative">
//                   <Image
//                     src={commonImges.scrollRight}
//                     fill
//                     alt="right arrow"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
//               </div>
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export { Journey };

