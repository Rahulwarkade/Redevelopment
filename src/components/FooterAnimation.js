import React from "react";
import svgEffect from "../../public/svgEffect.png";
import Image from "next/image";
import react, {useRef,useEffect} from 'react';
const FooterAnimation = () => {
    const trail = useRef();

    useEffect(()=>{
      let index = 0;
      let isAnimation = false;
      let k = 24;
      let j = 0;
      const animationStart = ()=>{
        j = j<=k? j+1 : 0;
      }
        const trailEffect = (e)=>{

          if(j>k)
          {
            const element = trail.current.childNodes[index];
            element.style.left = e.clientX + "px";
            element.style.top = e.clientY + "px";
            element.style.opacity = 1;
  
            setTimeout(() => { 
            element.classList.add("trail"); 
            setTimeout(() => { 
              element.style.opacity = 0; 
              element.classList.remove("trail"); 
            }, 1000); 
          }, index * 100);
            index = (index+1)%3;
            animationStart();
          }
          else{
          animationStart();
          }
        }
        window.addEventListener("mousemove",trailEffect);
    },[])
  return (
    <>
      <div ref={trail} className="w-full h-full absolute bg-black z-10 overflow-hidden">
          <Image
          src="/careLogo.png"
          width ={150}
          height={100}
          alt="logo"
          className="absolute  elem pointer-none"
          />
          <Image
          src="/eatsLogo.png"
          width ={150}
          height={100}
          alt="logo"
          className="absolute  elem pointer-none"
          />
          <Image
          src="/fitLogo.png"
          width ={150}
          height={100}
          alt="logo"
          className="absolute  elem pointer-none"
          />

      </div>
    </>
  );
};

export default FooterAnimation;
