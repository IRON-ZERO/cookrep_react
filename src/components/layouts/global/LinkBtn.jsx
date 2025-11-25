import {Link} from "react-router";

export default function LinkBtn({to, linkTxt}) {
  return (
    <Link to={to} className="bg-(--ck-green) w-full p-2 rounded-md text-center">
      {linkTxt}
    </Link>
  );
}
