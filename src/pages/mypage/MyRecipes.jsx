import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserRecipes } from "../../apis/user/userApi";
import MypageRecipeCard from "../../components/layouts/mypage/MypageRecipeCard";

export default function MyRecipes() {
  const { user } = useOutletContext();

  const {
    data: myRecipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRecipes"],
    queryFn: getUserRecipes,
  });

  return (
    <div className="flex-1 min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold">{user.nickname}님의 레시피</h1>
        </div>

        {/* Recipe Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                작성한 레시피
              </h2>
              <p className="text-gray-600">
                {(myRecipes || []).length}개의 레시피를 작성했어요.
              </p>
            </div>

            {/* Recipe List */}
            {isLoading ? (
              <div className="text-center py-12 text-gray-600">
                불러오는 중...
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                작성한 레시피를 불러오는 데 실패했습니다.
              </div>
            ) : (myRecipes || []).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  아직 작성한 레시피가 없어요.
                </p>
                <p className="text-gray-500 mt-2">
                  첫 번째 레시피를 작성해보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(myRecipes || []).map((recipe) => {
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
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">팁</h3>
          <p className="text-gray-700">
            더 많은 사람들이 당신의 레시피를 발견할 수 있도록 상세한 설명과 멋진
            사진을 추가해보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
