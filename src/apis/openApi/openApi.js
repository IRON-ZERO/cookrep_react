import {API_BASE_URL, OPEN_API_KEY} from "../baseUrl";

const API_PATH = "COOKRCP01/json";
export const openApi = {
  getOpenAPIRecipeSlideList: async ({start, end}) => {
    const response = await fetch(
      `${API_BASE_URL}/${OPEN_API_KEY}/${API_PATH}/${start}/${end}`,
      {
        method: "GET",
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
      `${API_BASE_URL}/${OPEN_API_KEY}/${API_PATH}/${start}/${end}`,
      {
        method: "GET",
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
