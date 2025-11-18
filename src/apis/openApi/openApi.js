import {BASE_URL} from "../baseUrl";
export const openApi = {
  getOpenAPIRecipeSlideList: async ({start, end}) => {
    const response = await fetch(
      `${BASE_URL}/api/open/getApiRecipe/${start}/${end}`,
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
  getOpenAPIRecieListDesc: async ({start, end}) => {
    const response = await fetch(
      `${BASE_URL}/api/open/getApiRecipeDesc/${start}/${end}`,
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
