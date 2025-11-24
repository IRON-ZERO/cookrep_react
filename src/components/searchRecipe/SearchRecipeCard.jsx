import {Link} from "react-router";
import {SearchRecipeBadge} from "./SearchRecipeBadge";

export default function SearchRecipeCard({recipe}) {
  return recipe.map((val) => (
    <li
      key={val.recipeId}
      className="relative p-3 rounded-lg flex overflow-hidden size-[400px] md:size-[250px] lg:size-[400px] xl:size-[250px] 2xl:size-[380px] z-30 group **:transition-[filter, transform] **:duration-200 **:ease-in-out "
    >
      <Link
        to={`/mypage/recipe/${val.recipeId}`}
        className="flex flex-col w-full h-full *:absolute *:text-(--ck-white)"
      >
        <h3
          className={`"absolute z-30 bottom-6 right-6 text-2xl truncate group-hover:translate-y-[300%] ${
            val.title.length > 10 ? "w-52" : ""
          } text-right"`}
        >
          {val.title}
        </h3>
        <img
          src={val.thumbnailImageUrl}
          alt={val.title}
          className="w-full h-full brightness-65 group-hover:brightness-100 left-0 top-0"
        />
        <SearchRecipeBadge
          peopleCount={val.peopleCount}
          cookTime={val.cookTime}
          prepTime={val.prepTime}
        />
      </Link>
    </li>
  ));
}
