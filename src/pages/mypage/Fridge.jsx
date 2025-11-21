import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RecommendedRecipeCard from "../../components/layouts/mypage/fridge/RecommendedRecipeCard";
import { searchRecipesByIngredientIds } from "../../apis/user/userApi";
import { useOutletContext } from "react-router";
import Ingredient from "../../components/layouts/mypage/fridge/Ingredient";

export default function Fridge() {
  // ============================================================
  // 🟦 선언부 (state, query 선언)
  // ============================================================

  // 유저 정보
  const { user } = useOutletContext();

  const nickname = user?.nickname;

  // 선택된 재료 IDs/Names
  const [activeIds, setActiveIds] = useState([]);
  const [activeNames, setActiveNames] = useState([]);

  // 필터링된 레시피
  const { data: filteredRecipes } = useQuery({
    queryKey: ["filteredRecipes", activeIds],
    queryFn: () => searchRecipesByIngredientIds(activeIds),
    enabled: activeIds.length > 0,
  });
  // 추천 레시피 리스트 적용
  const recommendList = filteredRecipes ?? [];
  // ============================================================
  // 🟩 로직부 (핸들러 / 리스트 선택)
  // ============================================================

  // ============================================================
  // 🟧 렌더부 (UI)
  // ============================================================

  return (
    <div className="flex-1 min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold">{nickname}님의 냉장고</h1>
        </div>

        {/* Ingredients Card */}
        <Ingredient
          user={user}
          activeIds={activeIds}
          activeNames={activeNames}
          setActiveIds={setActiveIds}
          setActiveNames={setActiveNames}
        />

        {/* Recommended Recipes Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                추천 레시피
              </h2>
              <p className="text-gray-600">
                CookRep이 당신을 위해 선별한 레시피예요.
              </p>
            </div>

            {/* Recipe Grid */}
            {recommendList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">추천할 레시피가 없어요.</p>
                <p className="text-gray-500 mt-2">
                  위에서 재료를 선택해주세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
                {recommendList.map(({ recipe, matchCount, scrapped }) => {
                  return (
                    <RecommendedRecipeCard
                      key={recipe.recipeId}
                      recipe={recipe}
                      matchCount={matchCount}
                      scrapped={scrapped}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
