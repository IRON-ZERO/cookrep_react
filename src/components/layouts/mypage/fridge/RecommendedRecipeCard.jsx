import { Link } from "react-router-dom";
import { Bookmark } from "../../global/icons/BookMark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addUserScrappedRecipes,
  cancelUserScrappedRecipe,
} from "../../../../apis/user/userApi";

export default function RecommendedRecipeCard({
  recipe,
  matchCount,
  scrapActive,
}) {
  const queryClient = useQueryClient();
  // 스크랩 mutation
  const scrapAddMutation = useMutation({
    mutationFn: (recipeId) => addUserScrappedRecipes(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries(["filteredRecipes"]);
    },
  });

  const scrapCancelMutation = useMutation({
    mutationFn: (recipeId) => cancelUserScrappedRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries(["filteredRecipes"]);
    },
  });
  const handleToggleScrap = (recipeId, isActive) => {
    // 1) 서버 반영
    isActive
      ? scrapCancelMutation.mutate(recipeId)
      : scrapAddMutation.mutate(recipeId);
  };
  return (
    <Link
      to={`/mypage/recipe/${recipe.recipeId}`}
      className="block relative border border-[#9d9d9d] rounded-lg shadow overflow-hidden"
    >
      <img
        src={recipe.thumbnailImageUrl}
        alt={recipe.title}
        className="h-36 w-full object-cover brightness-50 hover:brightness-100 transition-all duration-300 ease-in-out scale-100 hover:scale-105"
      />

      <div className="p-3">
        <button
          className={`size-8 absolute top-2 right-2 p-2 rounded-full cursor-pointer ${
            scrapActive ? "bg-yellow-400" : "bg-gray-200"
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleScrap(recipe.recipeId, scrapActive);
          }}
        >
          <Bookmark scrapActive={scrapActive} />
        </button>

        <h4 className="font-semibold truncate">{recipe.title}</h4>
        <p className="text-sm text-gray-600">
          냉장고 재료 일치: {matchCount}개
        </p>
      </div>
    </Link>
  );
}
