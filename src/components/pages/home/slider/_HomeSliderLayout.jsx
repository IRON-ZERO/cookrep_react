import {Link} from "react-router";

export default function HomeSliderLayout({
  linkTo = "/",
  classNames = "",
  children,
}) {
  return (
    <li>
      <Link
        to={linkTo}
        className={`relative size-[500px] flex flex-col justify-end items-end bg-gray-300 rounded-md overflow-hidden ${classNames}`}
      >
        {children}
      </Link>
    </li>
  );
}
