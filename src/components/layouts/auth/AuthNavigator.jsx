import {Link} from "react-router";

export default function AuthNavigator({whiteTxt, toGoTxt, toLink}) {
  return (
    <p className="mt-auto text-sm">
      {whiteTxt}
      <Link to={toLink} className="text-(--ck-green-light) ml-2">
        {toGoTxt}
      </Link>
    </p>
  );
}
