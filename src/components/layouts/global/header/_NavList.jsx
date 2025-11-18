import {Link, NavLink} from "react-router";

export default function NavList() {
  return (
    <nav className="flex items-center gap-5">
      <Link to={"/"} className="w-32">
        <img
          src="/images/logos/logo_3.png"
          alt="로고이미지"
          className="wiggle"
        />
      </Link>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className={({isActive}) =>
              `${isActive ? "text-(--ck-orange)" : "text-(--ck-black)"}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/search"}
            className={({isActive}) =>
              `${isActive ? "text-(--ck-orange)" : "text-(--ck-black)"}`
            }
          >
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
