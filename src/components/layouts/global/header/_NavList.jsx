import {Link, NavLink} from "react-router";
import {PlusIcon} from "../icons/PlusIcon";
import useGetScroll from "../../../../hooks/util/useGetScroll";

export default function NavList() {
  const {Y} = useGetScroll();
  return (
    <nav className="flex items-center gap-5 w-full **:text-nowrap">
      <Link to={"/"} className="w-32">
        <img
          src="/images/logos/logo_3.png"
          alt="로고이미지"
          className="wiggle"
        />
      </Link>
      <ul
        className={`flex flex-col md:flex-row items-center gap-5 ml-auto **:transition-colors **:ease-in-out **:duration-300  ${
          Y ? "**:text-(--ck-txt)" : "**:text-(--ck-orange)"
        }`}
      >
        <li>
          <NavLink
            to={"/"}
            className={({isActive}) =>
              `${isActive && "*:text-(--ck-orange)"} hover:text-(--ck-red)`
            }
          >
            공공 레시피
          </NavLink>
        </li>
        <li
          className={`
            px-2 py-1 border rounded-md 
            group  hover:border-(--ck-subTxt) hover:bg-slate-300 transition-colors ease-in-out duration-300
            ${Y ? "border-[#ADADAD]" : "border-[#DDDDDD] bg-slate-200"}`}
        >
          <NavLink
            to={"/upload"}
            className={({isActive}) =>
              `flex items-center gap-1 ${isActive && "*:text-(--ck-orange)"}`
            }
          >
            <PlusIcon className="size-5 group-hover:*:text-(--ck-red) " />
            <span className="text-sm group-hover:text-(--ck-red)">
              레시피 생성
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
