import { BASE_URL } from "../baseUrl";

// 유저 상세 조회
export async function getUserDetail() {
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(
      `유저 정보를 불러오지 못했습니다. (status: ${response.status})\n${text}`
    );
  }
  return await response.json();
}
// 유저 정보 수정
export async function updateUser(userData) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("유저 정보 수정을 실패했습니다.");
  return await response.json();
}
// 계정 삭제(Auth로 가는게 나을 것 같긴함)
export async function withDraw() {
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "DELETE",
  });
  if (!response.ok) throw new Error("계정 삭제를 실패했습니다.");
}

// 유저 재료 조회
export async function getUserIngredients() {
  const response = await fetch(`${BASE_URL}/users/me/ingredients`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("유저 재료를 불러오지 못했습니다.");
  return await response.json();
}
// 유저 재료 추가
export async function addUserIngredients(ingredientNames) {
  const response = await fetch(`${BASE_URL}/users/me/ingredients`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredientNames }),
  });
  if (!response.ok) throw new Error("유저 재료 추가를 실패했습니다.");
  return await response.json();
}
// 유저 재료 삭제
export async function deleteUserIngredients(ingredientId) {
  const response = await fetch(
    `${BASE_URL}/users/me/ingredients/${ingredientId}`,
    {
      credentials: "include",
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("유저 재료 삭제를 실패했습니다.");
}
// 유저 스크랩된 레시피 조회
export async function getUserScrappedRecipes() {
  const response = await fetch(`${BASE_URL}/users/me/scraps`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("스크랩된 레시피 조회를 실패했습니다.");
  return await response.json();
}
// 유저 레시피 스크랩 추가
export async function addUserScrappedRecipes(recipeId) {
  const response = await fetch(`${BASE_URL}/users/me/scraps`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: recipeId }),
  });
  if (!response.ok) throw new Error("레시피 스크랩을 실패했습니다.");
}
// 유저 레시피 스크랩 취소
export async function cancelUserScrappedRecipe(recipeId) {
  const response = await fetch(`${BASE_URL}/users/me/scraps/${recipeId}`, {
    credentials: "include",
    method: "DELETE",
  });
  if (!response.ok) throw new Error("레시피 스크랩 취소를 실패했습니다.");
}
// 유저가 작성한 레시피 조회
export async function getUserRecipes() {
  const response = await fetch(`${BASE_URL}/users/me/recipes`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("유저 레시피 조회를 실패했습니다.");
  return response.json();
}

// 선택한 재료로 레시피 검색
export async function searchRecipesByIngredientIds(ingredientIds) {
  const response = await fetch(`${BASE_URL}/recipe/search`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredientIds: ingredientIds }),
  });
  if (!response.ok)
    throw new Error("선택한 재료로 레시피 검색을 실패했습니다.");
  return response.json();
}
