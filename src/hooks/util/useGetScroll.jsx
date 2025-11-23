import {useEffect, useState} from "react";

export default function useGetScroll() {
  const [Y, setYPosition] = useState(true);
  const SCROLL_THRESHOLD = 170;
  useEffect(() => {
    const handleScroll = () => setYPosition(window.scrollY < SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {Y};
}
