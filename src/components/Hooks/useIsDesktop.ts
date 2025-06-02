import {useState,useEffect} from 'react'

const useIsDesktop = () => {
    const [isDesktop, setIsDestop] = useState<boolean | undefined>(undefined);
    useEffect(() => {
      setIsDestop(window.innerWidth >= 1280);
      const handleResize = () => {
        setIsDestop(window.innerWidth >= 1280);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return isDesktop;
}

export default useIsDesktop