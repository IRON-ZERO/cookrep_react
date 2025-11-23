import {useEffect, useState} from "react";

export default function useGetScroll() {
  const [Y, setYPosition] = useState(true);
  const handleScroll = () => setYPosition(window.scrollY < 170);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {Y};
}
