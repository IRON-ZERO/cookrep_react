import React from "react";
import CookTypeBadge from "../shared/_CookTypeBadge";

const HomeRecipeListCard = React.memo(function HomeRecipeListCard({
  recipe,
  setModal,
}) {
  return (
    <li
      className="flex relative overflow-hidden rounded-md shadow-md w-full h-[500px] cursor-pointer"
      onClick={() => setModal(recipe.RCP_NM)}
    >
      <CookTypeBadge
        way={recipe.RCP_WAY2}
        type={recipe.RCP_PAT2}
        classNames="top-6 left-6"
      />
      <h3
        className={`absolute right-6 bottom-6 z-40 text-3xl font-bold text-(--ck-white) text-right ${
          recipe.RCP_NM.length > 18 ? "w-80" : "w-96"
        }`}
      >
        {recipe.RCP_NM}
      </h3>
      <img
        src={recipe.ATT_FILE_NO_MAIN}
        alt={recipe.RCP_SEQ}
        className="size-full brightness-50"
        loading="lazy"
      />
    </li>
  );
});
export default HomeRecipeListCard;
