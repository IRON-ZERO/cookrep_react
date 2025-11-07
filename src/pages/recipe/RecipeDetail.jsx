import React, { useEffect, useState } from "react";
import {createBrowserRouter} from "react-router";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/recipe/RecipeDetail.css";

export default function RecipeDetail() {
  const { recipeId } = useParams(); // URL에서 recipeId 가져오기
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipe/${recipeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("레시피를 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [recipeId]);

  const deleteRecipe = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`/api/recipe/${recipeId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제 완료!");
          navigate("/mypage/recipes"); // 삭제 후 리스트로 이동
        } else {
          alert("삭제 실패");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("삭제 중 오류 발생");
      });
  };

  if (loading) return <p>로딩 중...</p>;
  if (!recipe) return <p>레시피를 찾을 수 없습니다.</p>;

  return (
    <div className="recipe-container" style={{ padding: "2rem" }}>
      {/* 제목 */}
      <h1 className="recipe-title">{recipe.title}</h1>

      {/* 메인 이미지 */}
      <img
        className="recipe-main-image"
        src={recipe.thumbnailImageUrl}
        alt={recipe.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />

      {/* 기본 정보 */}
      <div className="recipe-info" style={{ marginTop: "1rem" }}>
        <p>👥 인원: {recipe.peopleCount}명</p>
        <p>⏱ 준비 시간: {recipe.prepTime}분</p>
        <p>🍳 조리 시간: {recipe.cookTime}분</p>
        <p>
          🔥 조회수: {recipe.views} | ❤️ 좋아요: {recipe.likeCount} | 🍽 칼로리:{" "}
          {recipe.kcal} kcal
        </p>
      </div>

      {/* 재료 섹션 */}
      <div className="recipe-ingredients" style={{ marginTop: "2rem" }}>
        <h2>🧂 사용된 재료</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recipe.ingredients.map((ing, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "0.5rem 0",
                }}
              >
                <span>{ing.name}</span>
                <span>{ing.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 재료가 없습니다.</p>
        )}
      </div>

      {/* 조리 순서 */}
      <div className="recipe-steps" style={{ marginTop: "2rem" }}>
        <h2>🍽 조리순서</h2>
        {recipe.steps && recipe.steps.length > 0 ? (
          recipe.steps.map((step) => (
            <div
              key={step.stepOrder}
              className="recipe-step"
              style={{ display: "flex", marginBottom: "1rem" }}
            >
              <div className="recipe-step-left" style={{ flex: 1 }}>
                <div
                  className="recipe-step-number"
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                  }}
                >
                  Step {step.stepOrder}
                </div>
                <div className="recipe-step-text">{step.contents}</div>
              </div>
              {step.imageUrl && (
                <div className="recipe-step-right">
                  <img
                    src={step.imageUrl}
                    alt={`Step ${step.stepOrder}`}
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>등록된 조리순서가 없습니다.</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="recipe-back-btn" style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/mypage/recipes")}>목록으로</button>
        <button onClick={() => navigate(`/mypage/recipe/edit/${recipeId}`)}>
          수정
        </button>
        <button onClick={deleteRecipe}>삭제</button>
      </div>
    </div>
  );
}
