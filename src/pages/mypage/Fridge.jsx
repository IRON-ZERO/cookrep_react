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
    <div className="flex">
      <section className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">{nickname}님의 냉장고</h2>

        {/* ----------------------------- 재료 섹션 ----------------------------- */}
        <Ingredient
          user={user}
          activeIds={activeIds}
          activeNames={activeNames}
          setActiveIds={setActiveIds}
          setActiveNames={setActiveNames}
        />

        {/* ----------------------------- 추천 레시피 섹션 ----------------------------- */}
        <div className="border-2 border-[#9d9d9d] rounded-xl p-12">
          <h3 className="text-xl font-semibold mb-4">
            CookRep이 추천하는 레시피예요.
          </h3>

          {recommendList.length === 0 ? (
            <p className="text-gray-600">추천할 레시피가 없어요 😅</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto ">
              {recommendList.map(({ recipe, matchCount, scrapped }) => (
                <RecommendedRecipeCard
                  key={recipe.recipeId}
                  recipe={recipe}
                  matchCount={matchCount}
                  scrapActive={scrapped}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
