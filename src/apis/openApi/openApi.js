import {BASE_URL} from "../baseUrl";
export const openApi = {
  getOpenAPIRecipeSlideList: async ({start, end}) => {
    const response = await fetch(
      `${BASE_URL}/open/getApiRecipe/${start}/${end}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("외부API를 불러오는데 실패하였습니다.");
    }
    return data;
  },
  getOpenAPIRecipeListDesc: async ({start, end}) => {
    const response = await fetch(
      `${BASE_URL}/open/getApiRecipeSortDesc/${start}/${end}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("외부API를 불러오는데 실패하였습니다.");
    }
    return data;
  },
};
