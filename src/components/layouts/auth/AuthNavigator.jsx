import {Link} from "react-router";

export default function AuthNavigator({whiteTxt, toGoTxt, toLink}) {
  return (
    <p className="mt-auto text-sm flex flex-col gap-2 *:text-center sm:flex-row sm:*:text-right">
      <span>{whiteTxt}</span>
      <Link to={toLink} className="text-(--ck-green-light)">
        {toGoTxt}
      </Link>
    </p>
  );
}
