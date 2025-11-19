import { useState } from "react";
import {
  getUserDetail,
  updateUser,
  getUserIngredients,
  addUserIngredients,
  deleteUserIngredients,
  getUserScrappedRecipes,
  cancleUserScrappedRecipe,
  getUserRecipes,
  searchRecipesByIngredientIds,
  addUserScrappedRecipes,
} from "../../apis/user/userApi";

export default function UserApiTest() {
  const [userId, setUserId] = useState("test_user"); // 임시 userId
  const [userDetail, setUserDetail] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [scraps, setScraps] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredientNames, setIngredientNames] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
  });

  /** --- 유저 정보 관련 --- */
  const handleGetUser = async () => {
    const data = await getUserDetail();
    setUserDetail(data);
    console.log(data);
  };

  const handleUpdateUser = async () => {
    const data = await updateUser(updateData);
    alert("유저 정보 수정 완료");
    console.log(data);
  };

  /** --- 재료 관련 --- */
  const handleGetIngredients = async () => {
    const data = await getUserIngredients();
    setIngredients(data);
  };

  const handleAddIngredients = async () => {
    if (!ingredientNames.trim()) return alert("ingredientNames를 입력하세요");

    try {
      const names = ingredientNames.split(",").map((n) => n.trim());
      await addUserIngredients({ ingredientNames: names }); // ✅ DTO 구조 맞춰서 전달
      alert("재료 추가 완료");
      handleGetIngredients(); // 🔄 조회 갱신
    } catch (error) {
      console.error("❌ 재료 추가 실패:", error);
      alert("재료 추가 실패");
    }
  };

  const handleDeleteIngredient = async () => {
    if (!ingredientId) return alert("ingredientId를 입력하세요");
    await deleteUserIngredients(Number(ingredientId));
    alert("삭제 완료");
    handleGetIngredients();
  };

  /** --- 스크랩 관련 --- */
  const handleGetScraps = async () => {
    const data = await getUserScrappedRecipes();
    setScraps(data);
  };

  const handleAddScrap = async (recipeId) => {
    await addUserScrappedRecipes(recipeId);
    alert("스크랩 완료");
    handleGetScraps();
  };

  const handleCancelScrap = async (recipeId) => {
    await cancleUserScrappedRecipe(recipeId);
    alert("스크랩 취소 완료");
    handleGetScraps();
  };

  /** --- 작성한 레시피 --- */
  const handleGetUserRecipes = async () => {
    const data = await getUserRecipes();
    setRecipes(data);
  };

  /** --- 재료 기반 레시피 검색 --- */
  const handleSearchRecipes = async () => {
    // 쉼표로 여러 개 입력 가능: 1,2,3
    const ids = searchInput
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    const data = await searchRecipesByIngredientIds(ids);
    console.log("검색 결과:", data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>CookRep API 테스트 페이지</h1>
      <div style={{ marginBottom: "1em" }}>
        <label>userId: </label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleGetUser}>유저 조회</button>
      </div>

      {userDetail && (
        <pre style={{ background: "#f3f3f3", padding: "10px" }}>
          {JSON.stringify(userDetail, null, 2)}
        </pre>
      )}

      <hr />
      <h2>유저 정보 수정</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <input
          placeholder="firstName"
          value={updateData.firstName}
          onChange={(e) =>
            setUpdateData({ ...updateData, firstName: e.target.value })
          }
        />
        <input
          placeholder="lastName"
          value={updateData.lastName}
          onChange={(e) =>
            setUpdateData({ ...updateData, lastName: e.target.value })
          }
        />
        <input
          placeholder="country"
          value={updateData.country}
          onChange={(e) =>
            setUpdateData({ ...updateData, country: e.target.value })
          }
        />
        <input
          placeholder="city"
          value={updateData.city}
          onChange={(e) =>
            setUpdateData({ ...updateData, city: e.target.value })
          }
        />
        <button onClick={handleUpdateUser}>정보 수정</button>
      </div>

      <hr />
      <h2>유저 재료 관리</h2>
      <button onClick={handleGetIngredients}>재료 불러오기</button>
      <ul>
        {ingredients.map((i) => (
          <li key={i.ingredientId}>
            {i.name} (id: {i.ingredientId})
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="추가할 재료 이름들을 쉼표로 구분"
          value={ingredientNames}
          onChange={(e) => setIngredientNames(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={handleAddIngredients}>재료 추가</button>
      </div>

      <div style={{ marginTop: "0.5em" }}>
        <input
          placeholder="삭제할 ingredientId (int)"
          value={ingredientId}
          onChange={(e) => setIngredientId(e.target.value)}
        />
        <button onClick={handleDeleteIngredient}>재료 삭제</button>
      </div>

      <hr />
      <h2>스크랩된 레시피</h2>
      <button onClick={handleGetScraps}>스크랩 조회</button>
      <ul>
        {scraps.map((r) => (
          <li key={r.recipeId}>
            {r.title}{" "}
            <button onClick={() => handleCancelScrap(r.recipeId)}>취소</button>
          </li>
        ))}
      </ul>

      <hr />
      <h2>작성한 레시피</h2>
      <button onClick={handleGetUserRecipes}>작성한 레시피 조회</button>
      <ul>
        {recipes.map((r) => (
          <li key={r.recipeId}>
            {r.title}
            <button onClick={() => handleAddScrap(r.recipeId)}>추가</button>
          </li>
        ))}
      </ul>

      <hr />
      <h2>선택한 재료로 레시피 검색</h2>
      <input
        placeholder="재료 id 입력 (예: 1,2,3)"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearchRecipes}>검색</button>
    </div>
  );
}
