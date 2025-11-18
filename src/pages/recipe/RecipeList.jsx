import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyRecipeList() {
  // 임시 테스트용 userId
  const userId = "0c79275d-716f-4551-83ab-95265b648308";

  const [recipes, setRecipes] = useState([]);

  // ✅ 레시피 목록 불러오기
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/user/${userId}`,{credentials: "include",}) // 백엔드 포트 맞춰주세요
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data || []); // data 자체가 배열임
      })
      .catch((err) => console.error("레시피 목록 불러오기 오류:", err));
  }, [userId]);

  return (
    <div className="mypage__layout" style={{ padding: "2rem" }}>
      {/*
      <aside className="sidebar">
        사이드바 (현재 비활성화)
      </aside>
      */}

      <section className="mypage__content">
        <div className="user-info recipe">
          <div
            className="recipe-grid"
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Link
                  key={recipe.recipeId}
                  to={`/mypage/recipe/${recipe.recipeId}`} // React Router용 상세 페이지 링크
                  className="recipe-card"
                  style={{
                    display: "block",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    textDecoration: "none",
                    color: "#333",
                    transition: "transform 0.2s",
                  }}
                >
                  <img
                    src={recipe.thumbnailImageUrl}
                    alt={recipe.title}
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <h4 style={{ marginBottom: "0.5rem" }}>{recipe.title}</h4>
                    <div
                      className="meta"
                      style={{ fontSize: "0.9rem", color: "#666" }}
                    >
                      <span className="views">조회수 {recipe.views}</span> ·{" "}
                      <span className="likes">좋아요 {recipe.likeCount}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-recipes">아직 업로드한 레시피가 없습니다 😅</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}