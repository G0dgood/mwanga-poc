import { useEffect, useState } from "react";

const isMobileView = () => {
  return window.innerWidth <= 1080;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(isMobileView());

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileView());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return isMobile;
};

export { useIsMobile, isMobileView };
