import React, { useEffect, useState, useRef } from "react";

export default function ViewsCounter({ recipeId }) {
  const [views, setViews] = useState(0);
  const didFetch = useRef(false);

  useEffect(() => {
    didFetch.current = false;
  }, [recipeId]);

  useEffect(() => {
    if (didFetch.current) return; // 중복 호출 방지
    didFetch.current = true;

    const fetchViews = async () => {
      try {
        // 세션에 이미 본 레시피인지 확인
        const viewedRecipes = JSON.parse(sessionStorage.getItem("viewedRecipes") || "[]");
        let increment = false;
        if (!viewedRecipes.includes(String(recipeId))) {
          increment = true;
          viewedRecipes.push(String(recipeId));
          sessionStorage.setItem("viewedRecipes", JSON.stringify(viewedRecipes));
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/recipe/countview/${recipeId}?increment=${increment}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("조회수 정보를 불러오지 못했습니다.");

        const data = await res.json();
        setViews(data.views);
      } catch (err) {
        console.error(err);
      }
    };

    fetchViews();
  }, [recipeId]);

  return (
    <div className="text-center mt-2 text-gray-600">
      🔥 조회수 {views}
    </div>
  );
}
