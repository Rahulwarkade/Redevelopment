import React,{useEffect,useRef} from 'react';
import { ReactLenis, useLenis } from 'lenis/react'

const lerp = (start,end,factor) => start + (end-start) * factor;

import Image from "next/image";

const LenisImage = ({url,alt,classname,...props})=>{
    const imgRef = useRef(null);
    const bounds = useRef(null);
    const currentTranslateY = useRef(0);
    const targetTranslateY = useRef(0);
    const refId = useRef(null);
    useEffect(()=>{
        const updateBounds = ()=>{
            if(imgRef.current)
            {
                const rect = imgRef.current.getBoundingClientRect();
                bounds.current = {
                    top : rect.top + window.scrollY,
                    bottom : rect.bottom + window.scrollY,
                }
            }
        }
        updateBounds();
        window.addEventListener("resize",updateBounds);

        const animate = ()=>{
            if(imgRef.current)
            {
                currentTranslateY.current = lerp(
                    currentTranslateY.current,
                    targetTranslateY.current,
                    0.1
                )
                if(
                    Math.abs(targetTranslateY.current  - currentTranslateY.current >= 0.01 || targetTranslateY.current  - currentTranslateY.current <= 0.01)
                )
                {
                    imgRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
                }
            }

            refId.current = requestAnimationFrame(animate); 
        }

        animate();
        
        return ()=>{
            window.removeEventListener("resize",updateBounds);
            if(refId.current)
            {
                cancelAnimationFrame(refId.current);
            }
        }
    },[])

    useLenis(({scroll})=>{
        if(!bounds.current) return;
        const relativeScroll = scroll - bounds.current.top;
        targetTranslateY.current = relativeScroll * 0.2;
    })
return <>
    <Image
    ref = {imgRef}
    src={url}
    alt={alt}
    {...props}
    style={{
        willChange : "transform",
        transform : "translateY(0) scale(1.25)"
    }}
    className={`${classname}`}
    />
</>
}

export {LenisImage}