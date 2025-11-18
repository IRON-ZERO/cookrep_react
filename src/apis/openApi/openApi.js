import {BASE_URL} from "../baseUrl";
export const openApi = {
  getOpenAPIRecipeList: async ({start, end}) => {
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

    return data;
  },
};
