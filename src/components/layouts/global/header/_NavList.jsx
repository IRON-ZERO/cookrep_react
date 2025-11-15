import {NavLink} from "react-router";

export default function NavList() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to={"/"}
            className={({isActive}) =>
              isActive ? "text-(--ck-orange)" : "text-(--ck-black)"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/search"}
            className={({isActive}) =>
              isActive ? "text-(--ck-orange)" : "text-(--ck-black)"
            }
          >
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
