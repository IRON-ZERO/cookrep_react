import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserScrappedRecipes } from "../../apis/user/userApi";
import MypageRecipeCard from "../../components/layouts/mypage/MypageRecipeCard";

export default function Freezer() {
  const { user } = useOutletContext();

  const {
    data: scrapedRecipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userScraps"],
    queryFn: getUserScrappedRecipes,
  });

  return (
    <div className="flex-1 min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold">{user.nickname}님의 스크랩</h1>
        </div>

        {/* Scraped Recipes Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                저장한 레시피
              </h2>
              <p className="text-gray-600">
                {(scrapedRecipes || []).length}개의 레시피를 저장했어요.
              </p>
            </div>

            {/* Recipe Grid */}
            {isLoading ? (
              <div className="text-center py-12 text-gray-600">
                불러오는 중...
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                스크랩된 레시피를 불러오는 데 실패했습니다.
              </div>
            ) : (scrapedRecipes || []).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">저장한 레시피가 없어요.</p>
                <p className="text-gray-500 mt-2">
                  마음에 드는 레시피를 저장해보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(scrapedRecipes || []).map((recipe) => {
                  return (
                    <MypageRecipeCard
                      key={recipe.recipeId}
                      recipe={recipe}
                      scrapActive={recipe.scrapped}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">팁</h3>
          <p className="text-gray-700">
            저장한 레시피는 언제든 다시 확인할 수 있어요. 자주 요리하는 레시피를
            저장해두면 빠르게 찾을 수 있습니다!
          </p>
        </div>
      </div>
    </div>
  );
}
