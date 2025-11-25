import NavList from "./_NavList";
import AuthNavList from "./_AuthNavList";
import useGetScroll from "../../../../hooks/util/useGetScroll";
export default function HeaderNav() {
  const {Y} = useGetScroll();
  return (
    <header
      className={`glass-white fixed z-40 top-0 flex justify-between items-center gap-10 px-32 transition-[height] ease-in-out duration-300 
      w-full ${Y ? "h-32" : "h-24"} shadow`}
    >
      <NavList />
      <AuthNavList />
    </header>
  );
}
