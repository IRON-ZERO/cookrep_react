import { BASE_URL } from "../baseUrl";


export const recipeApi = {

   // presigned URL 발급
  getPresignedUrls: async (fileNames) => {
    try {
      const res = await fetch(`${BASE_URL}/recipe/presigned`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileNames),
      });
      if (!res.ok) throw new Error("Presigned URL 요청 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // 레시피 등록
  postRecipe: async (userId, recipeData) => {
    const resp = await fetch(`${BASE_URL}/recipe/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    if (!resp.ok) {
      throw new Error("레시피 등록 실패!");
    }

    return resp.json(); 
  },


  // ######### 조회 수 #########
  increaseView: async (recipeId) => {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}/view`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("조회수 증가 실패");
      const data = await res.json(); // 한 번만 읽기
      return data.views;    } catch (err) {
      console.error(err);
      return 0;
    }
  },

    // 레시피 삭제
    deleteRecipe: async (recipeId) => {
  const res = await fetch(`${BASE_URL}/recipe/${recipeId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text(); // 서버가 남긴 오류 메시지 확인
    throw new Error(`레시피 삭제 실패: ${text}`);
  }
  return; // 성공 시 그냥 true 반환
},

  // 좋아요 토글
  toggleLike: async (recipeId) => {
    const res = await fetch(`${BASE_URL}/recipe/like/${recipeId}`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`좋아요 실패: ${text}`);
    }
    return res.json();
  },

  // 특정 사용자의 레시피 목록 조회
  getUserRecipes: async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/recipe/user/${userId}`, {
        credentials: "include",
      });

      const text = await res.text(); // JSON이 아닐 경우도 대비
      try {
        return JSON.parse(text);
      } catch (err) {
        console.error("JSON 파싱 실패, 받은 데이터:", text);
        return [];
      }
    } catch (err) {
      console.error("레시피 목록 요청 실패:", err);
      return [];
    }
  },

  // ######## comment ##########
  getComments: async (recipeId) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/recipe/${recipeId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("댓글 조회 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  createComment: async ({ recipeId, contents, userId }) => {
    try {
      const res = await fetch(`${BASE_URL}/comment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, contents, userId }),
      });
      if (!res.ok) throw new Error("댓글 작성 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateComment: async ({ commentId, contents, userId }) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/${commentId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, userId }),
      });
      if (!res.ok) throw new Error("댓글 수정 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteComment: async (commentId) => {
    try {
      const res = await fetch(`${BASE_URL}/comment/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  
  //########## 레시피 edit ##########
  // 레시피 불러오기
  getRecipeDetail: async (recipeId) => {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}`, { credentials: "include" });
      if (!res.ok) throw new Error("레시피 불러오기 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // 레시피 수정
  updateRecipe: async (recipeId, updateData) => {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error("레시피 수정 실패");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
