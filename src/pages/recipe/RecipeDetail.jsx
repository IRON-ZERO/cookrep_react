import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "../../components/aboutrecipe/Comment";
import ViewsCounter from "../../components/aboutrecipe/ViewCounter";
import { recipeApi } from "../../apis/recipe/api";

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // 레시피 불러오기

useEffect(() => {
  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const data = await recipeApi.getRecipeDetail(recipeId);
      setRecipe({ ...data, views: data.views });
      setIsOwner(data.owner);

      const sessionKey = `viewed_recipe_${recipeId}`;
      console.log(sessionStorage.getItem(sessionKey));

      if (!sessionStorage.getItem(sessionKey)) {
        const updatedViews = await recipeApi.increaseView(recipeId); // number 반환
         console.log(updatedViews);
        if (updatedViews && typeof updatedViews === "number") {
          setRecipe(prev => ({ ...prev, views: updatedViews }));
        }
        sessionStorage.setItem(sessionKey, "1");
      }
     
    } catch (err) {
      console.error(err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  fetchRecipe();
}, [recipeId, navigate]);

  // 삭제
    const deleteRecipe = () => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;
      
  recipeApi.deleteRecipe(recipeId)
    .then(() => {
      alert("삭제 완료!");
      navigate("/mypage/recipes");
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || "삭제 중 오류 발생");
    });
};

 // 좋아요 토글
    const handleLike = async () => {
      try {
        const data = await recipeApi.toggleLike(recipeId);
        setRecipe((prev) => ({
          ...prev,
          like: data.likeCount,
          liked: data.liked,
        }));
      } catch (err) {
        console.error(err);
      }
    };
  

  if (loading) return <p>로딩 중...</p>;
  if (!recipe) return <p>레시피를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-52 mb-11">
      {/* 제목 */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        {recipe.title}
      </h1>

      {/* 메인 이미지 */}
      <div className="w-full mb-6">
        <img
          src={recipe.thumbnailImageUrl}
          alt={recipe.title}
          className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
        />
      </div>

      {/* 기본 정보 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700 text-center">
          <p>
            준비시간: <span className="font-semibold">{recipe.prepTime}</span>분
          </p>
          <p>
            조리시간: <span className="font-semibold">{recipe.cookTime}</span>분
          </p>
          <p>
            인원 수: <span className="font-semibold">{recipe.peopleCount}</span>명
          </p>
          <p>
            칼로리: <span className="font-semibold">{recipe.kcal}</span> kcal
          </p>
          </div>
          <ViewsCounter recipe={recipe} />

      </div>

      {/* 재료 */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">사용된 재료</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul className="divide-y divide-gray-200 bg-gray-50 rounded-lg border border-gray-200">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex justify-between p-3 text-gray-700">
                <span>{ing.name}</span>
                <span className="font-medium">{ing.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">등록된 재료가 없습니다.</p>
        )}
      </div>

      {/* 조리 순서 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">조리 단계</h2>
        {recipe.steps && recipe.steps.length > 0 ? (
          <div className="space-y-6">
            {recipe.steps.map((step) => (
              <div
                key={step.stepOrder}
                className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-semibold text-orange-600 mb-2">
                    Step {step.stepOrder}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{step.contents}</p>
                </div>
                {step.imageUrl && (
                  <img
                    src={step.imageUrl}
                    alt={`Step ${step.stepOrder}`}
                    className="w-full sm:w-40 h-40 object-cover rounded-lg border border-gray-300"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">등록된 조리순서가 없습니다.</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => navigate("/mypage/recipes")}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          목록으로
        </button>

         {isOwner && (
    <>
      {/* 수정 버튼 */}
      <button
        type="button"
        onClick={() => navigate(`/mypage/recipe/edit/${recipeId}`)}
        className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition shadow-sm"
      >
        수정
      </button>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={deleteRecipe}
        className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition shadow-sm"
      >
        삭제
      </button>
    </>
  )}
      </div>

      {/* 좋아요 버튼 */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 hover:text-red-600 transition text-xl"
        >
          {recipe.liked ? (
            <span className="text-red-500 text-2xl">❤️</span> // 좋아요 O
          ) : (
            <span className="text-gray-400 text-2xl">🤍</span> // 좋아요 X
          )}
          <span className="text-lg font-semibold text-red-500">{recipe.like}</span>
        </button>

      </div>

      <Comment recipeId={recipeId} />
    </div>
    
  );
}