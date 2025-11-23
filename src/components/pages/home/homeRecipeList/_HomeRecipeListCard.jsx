import React from "react";
import CookTypeBadge from "../shared/_CookTypeBadge";

const HomeRecipeListCard = React.memo(function HomeRecipeListCard({
  recipe,
  setModal,
}) {
  return (
    <li
      className="flex relative overflow-hidden rounded-md shadow-md w-full cursor-pointer min-w-[200px] max-h-[300px] group"
      onClick={() => setModal(recipe.RCP_SEQ)}
    >
      <CookTypeBadge
        way={recipe.RCP_WAY2}
        type={recipe.RCP_PAT2}
        classNames="top-6 left-6"
      />
      <h3
        className={`absolute right-6 bottom-6 z-30 font-bold text-(--ck-white) text-right text-xs sm:text-sm truncate overflow-hidden ${
          recipe.RCP_NM.length > 10 ? "w-52" : "w-60"
        }`}
      >
        {recipe.RCP_NM}
      </h3>
      <img
        src={recipe.ATT_FILE_NO_MAIN}
        alt={recipe.RCP_SEQ}
        className="size-full brightness-60"
        loading="lazy"
      />
    </li>
  );
});
export default HomeRecipeListCard;
