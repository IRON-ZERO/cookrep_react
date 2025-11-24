import {BASE_URL} from "../baseUrl";
export const recipeApi = {
  getRecipeList: async (title = "") => {
    const url = title.trim()
      ? `${BASE_URL}/recipe/search/bytitle/${encodeURIComponent(title)}`
      : `${BASE_URL}/recipe/search/bytitle`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
    });

    if (!res.ok) {
      throw new Error("레시피 리스트를 가져오는데 오류가 발생했습니다.");
    }
    const data = await res.json();
    return data;
  },
};
