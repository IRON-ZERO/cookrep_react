import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "../../components/aboutrecipe/Comment";
import ViewsCounter from "../../components/aboutrecipe/ViewCounter";

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/${recipeId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("레시피를 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => {
        setRecipe({
          ...data,
          liked: data.liked, // 백엔드에서 이미 좋아요 여부 내려줌
          like: data.like,   // 좋아요 수
        });
        setIsOwner(data.owner);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [recipeId]);


  const deleteRecipe = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/${recipeId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제 완료!");
          navigate("/mypage/recipes");
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("삭제 중 오류 발생");
      });
  };

const handleLike = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/recipe/like/${recipeId}`, // recipeId 포함
      {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함
      }
    );

    if (!res.ok) {
      const text = await res.text(); // JSON이 아닌 경우 처리
      console.error("좋아요 실패:", res.status, text);
      return;
    }

    const data = await res.json();

    setRecipe((prev) => ({
      ...prev,
      like: data.likeCount, // 백엔드에서 내려주는 좋아요 수
      liked: data.liked, // 하트 모양 변경을 위해 필요
    }));
  } catch (err) {
    console.error("좋아요 실패:", err);
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
          <ViewsCounter recipeId={recipeId} />

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