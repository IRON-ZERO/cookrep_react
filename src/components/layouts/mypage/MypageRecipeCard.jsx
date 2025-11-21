import { Link } from "react-router-dom";
import { Bookmark } from "../global/icons/BookMark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addUserScrappedRecipes,
  cancelUserScrappedRecipe,
} from "../../../apis/user/userApi";

export default function MypageRecipeCard({ recipe = {}, scrapActive }) {
  const queryClient = useQueryClient();

  // 유연한 필드 매핑 (API 응답 형식이 섞여 있을 수 있으므로 안전하게 추출)
  const id = recipe.recipeId || recipe.id || recipe.recipe_id || "";
  const title = recipe.title || recipe.name || recipe.recipeName || "제목 없음";
  const thumbnail =
    recipe.thumbnailImageUrl ||
    recipe.thumbnail ||
    recipe.image ||
    "/images/fallback-thumb.png";
  const cookLevel = recipe.cookLevel || null;
  const views =
    typeof recipe.views === "number" ? recipe.views : recipe.viewCount ?? 0;
  const peopleCount =
    typeof recipe.peopleCount === "number"
      ? recipe.peopleCount
      : recipe.servings ?? 0;
  const likeCount =
    typeof recipe.likeCount === "number"
      ? recipe.likeCount
      : typeof recipe.likes === "number"
      ? recipe.likes
      : recipe.like_count ?? 0;
  const scrapped =
    typeof recipe.scrapped === "boolean" ? recipe.scrapped : !!scrapActive;

  // cookLevel에 따른 배지 색상 결정 (한글/영문 모두 대응)
  const getCookLevelBadgeColor = (level) => {
    if (!level) return "bg-gray-100 text-gray-700";
    const lower = String(level).toLowerCase();
    if (lower.includes("쉬움") || lower.includes("easy"))
      return "bg-green-100 text-green-700";
    if (
      lower.includes("보통") ||
      lower.includes("normal") ||
      lower.includes("medium")
    )
      return "bg-yellow-100 text-yellow-700";
    if (lower.includes("어려움") || lower.includes("hard"))
      return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // 기본 동작: 부모에서 onToggleScrap을 넘겨주면 사용, 없으면 내부에서 mutation 실행
  const scrapAddMutation = useMutation({
    mutationFn: (recipeId) => addUserScrappedRecipes(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries(["filteredRecipes"]);
      queryClient.invalidateQueries(["userRecipes"]);
      queryClient.invalidateQueries(["userScraps"]);
    },
  });
  const scrapCancelMutation = useMutation({
    mutationFn: (recipeId) => cancelUserScrappedRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries(["filteredRecipes"]);
      queryClient.invalidateQueries(["userRecipes"]);
      queryClient.invalidateQueries(["userScraps"]);
    },
  });

  const handleScrapClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    if (scrapped) scrapCancelMutation.mutate(id);
    else scrapAddMutation.mutate(id);
  };
  return (
    <Link
      to={`/mypage/recipe/${id}`}
      className="block relative border border-[#9d9d9d] rounded-lg shadow overflow-hidden hover:shadow-md transition"
      aria-label={title}
    >
      <img
        src={thumbnail}
        alt={title}
        className="h-36 w-full object-cover brightness-50 hover:brightness-100 transition-all duration-300 ease-in-out scale-100 hover:scale-105"
      />
      <div className="p-3">
        <button
          aria-pressed={scrapped}
          title={scrapped ? "스크랩 취소" : "스크랩"}
          className={`size-8 absolute top-2 right-2 p-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            scrapped ? "bg-yellow-400" : "bg-gray-200"
          }`}
          onClick={handleScrapClick}
        >
          <Bookmark scrapActive={scrapped} />
        </button>

        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold truncate flex-1 text-sm">{title}</h4>
          {cookLevel && (
            <span
              className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getCookLevelBadgeColor(
                cookLevel
              )}`}
            >
              {cookLevel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 5C7 5 3 8 1 12c2 4 6 7 11 7s9-3 11-7c-2-4-6-7-11-7z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
            <span>{views}</span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 19c0-3 4-5 10-5s10 2 10 5v2H2v-2z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{peopleCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-pink-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
