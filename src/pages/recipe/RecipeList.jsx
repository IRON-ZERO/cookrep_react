import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {recipeApi} from "../../apis/recipe/api";

export default function MyRecipeList() {
  // 임시 테스트용 userId
  const userId = "0c79275d-716f-4551-83ab-95265b648308";

  const [recipes, setRecipes] = useState([]);

  // ✅ 레시피 목록 불러오기
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await recipeApi.getUserRecipes(userId);
      setRecipes(data || []);
    };
    fetchRecipes();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-2xl mt-52 min-h-full">
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
                    style={{width: "100%", height: "160px", objectFit: "cover"}}
                  />
                  <div style={{padding: "1rem"}}>
                    <h4 style={{marginBottom: "0.5rem"}}>{recipe.title}</h4>
                    <div
                      className="meta"
                      style={{fontSize: "0.9rem", color: "#666"}}
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
