import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../../hooks/auth/useUser";

export default function RecipeEdit() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const userId = userData.userId;
  // const userId = "0c79275d-716f-4551-83ab-95265b648308"; // 임시 테스트용 userId

  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [kcal, setKcal] = useState(0);

  // ingredients 상태 변경 감지용 useEffect
  useEffect(() => {
    // console.log("🍳 현재 재료 상태:", ingredients);
  }, [ingredients]);

  // 레시피 불러오기
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/${recipeId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("레시피를 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setKcal(data.kcal || 0);

        const initSteps = (data.steps || []).map((s, idx) => ({
          ...s,
          stepOrder: idx + 1,
          stepNum: String(idx + 1).padStart(2, "0"),
          imageFile: null,
          imageUrl: s.imageUrl || null,
        }));

        setSteps(initSteps);
        setIngredients(data.ingredients || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [recipeId]);

  // 🔹 대표 이미지 미리보기 cleanup
  useEffect(() => {
    if (!thumbnailFile) return;
    const previewUrl = URL.createObjectURL(thumbnailFile);
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [thumbnailFile]);

  // 🔹 단계 이미지 미리보기 cleanup
  useEffect(() => {
    const urlsToRevoke = steps
      .filter((step) => step.imageFile)
      .map((step) => URL.createObjectURL(step.imageFile));
    return () => {
      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [steps]);

  if (loading) return <p>로딩 중...</p>;
  if (!recipe) return <p>레시피를 찾을 수 없습니다.</p>;

  /** 재료 관련 로직 **/
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", count: "" }]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const deleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  /** 단계 관련 로직 **/
  const addStep = () => {
    const newStep = {
      stepOrder: steps.length + 1,
      stepNum: String(steps.length + 1).padStart(2, "0"),
      contents: "",
      imageFile: null,
      imageUrl: null,
    };
    setSteps([...steps, newStep]);
  };

  const deleteStep = (index) => {
    const newSteps = steps
      .filter((_, i) => i !== index)
      .map((step, i) => ({
        ...step,
        stepOrder: i + 1,
        stepNum: String(i + 1).padStart(2, "0"),
      }));
    setSteps(newSteps);
  };

  const updateStepContent = (index, content) => {
    const newSteps = [...steps];
    newSteps[index].contents = content;
    setSteps(newSteps);
  };

  const updateStepImage = (index, file) => {
    const newSteps = [...steps];
    newSteps[index].imageFile = file;
    newSteps[index].imageUrl = file ? URL.createObjectURL(file) : null;
    setSteps(newSteps);
  };

  /** 수정 제출 **/
  const submitEditRecipe = async () => {
    try {
      const now = recipeId;
      const fileNames = [];

      if (thumbnailFile) {
        const mainPath = `users/${userId}/recipes/${now}/main/${encodeURIComponent(
          thumbnailFile.name
        )}`;
        fileNames.push(mainPath);
      }

      steps.forEach((step) => {
        if (step.imageFile) {
          const path = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(
            step.imageFile.name
          )}`;
          fileNames.push(path);
        }
      });

      let presignData = [];
      if (fileNames.length > 0) {
        const presignResp = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/recipe/presigned`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fileNames),
          }
        );
        if (!presignResp.ok) throw new Error("Presigned URL 요청 실패");
        presignData = await presignResp.json();

        if (thumbnailFile) {
          const mainUrlObj = presignData.find((u) => u.fileName.includes("main"));
          if (mainUrlObj)
            await fetch(mainUrlObj.uploadUrl, { method: "PUT", body: thumbnailFile });
        }

        for (let step of steps) {
          if (step.imageFile) {
            const path = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(
              step.imageFile.name
            )}`;
            const urlObj = presignData.find((u) => u.fileName === path);
            if (urlObj) await fetch(urlObj.uploadUrl, { method: "PUT", body: step.imageFile });
          }
        }
      }

      const updateData = {
        title: recipe.title,
        thumbnailImageUrl: thumbnailFile
          ? `users/${userId}/recipes/${now}/main/${encodeURIComponent(thumbnailFile.name)}`
          : (() => {
              if (!recipe.thumbnailImageUrl) return null;
              const match = recipe.thumbnailImageUrl.match(/users\/.*$/);
              return match ? decodeURIComponent(match[0].split("?")[0]) : recipe.thumbnailImageUrl;
            })(),
        peopleCount: recipe.peopleCount,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        kcal,
        steps: steps.map((step) => {
          let imageKey = null;
          if (step.imageFile) {
            imageKey = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(
              step.imageFile.name
            )}`;
          } else if (step.imageUrl) {
            const match = step.imageUrl.match(/users\/.*$/);
            imageKey = match ? decodeURIComponent(match[0].split("?")[0]) : step.imageUrl;
          }
          return {
            stepOrder: step.stepOrder,
            contents: step.contents || "",
            imageUrl: imageKey,
          };
        }),
        ingredients: ingredients.map((ing) => ({
          name: ing.name,
          count: ing.count,
        })),
      };

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipe/${recipeId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      alert("레시피 수정 완료!");
      navigate(`/mypage/recipe/${recipeId}`);
    } catch (err) {
      console.error(err);
      alert("레시피 수정 실패");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-2xl mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🍽 레시피 수정</h2>

      {/* 제목 */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700">레시피 제목</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* 대표 이미지 */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700">대표 이미지</label>
        <div className="flex items-center gap-6">
          <img
            src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : recipe.thumbnailImageUrl || recipe.thumbnailUrl}
            alt="thumbnail"
            className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-sm"
          />
          <label className="cursor-pointer bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition text-sm font-medium shadow-sm">
            이미지 변경
            <input
              type="file"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-3 text-gray-700">
          👥 인원 수 / ⏱ 준비시간 / 🍳 조리시간 / 🍽 칼로리 (kcal)
        </label>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="number"
            value={recipe.peopleCount}
            onChange={(e) => setRecipe({ ...recipe, peopleCount: e.target.value })}
            placeholder="인원"
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            value={recipe.prepTime}
            onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })}
            placeholder="준비시간"
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            value={recipe.cookTime}
            onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
            placeholder="조리시간"
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            value={kcal}
            onChange={(e) => setKcal(parseInt(e.target.value) || 0)}
            placeholder="칼로리"
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* 재료 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">🧂 사용된 재료</h3>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex gap-3 mb-2 items-center">
            <input
              type="text"
              value={ing.name}
              placeholder="재료명"
              onChange={(e) => updateIngredient(idx, "name", e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              value={ing.count}
              placeholder="수량 (예: 200g, 2개)"
              onChange={(e) => updateIngredient(idx, "count", e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={() => deleteIngredient(idx)}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              ❌
            </button>
          </div>
        ))}
        <button
          onClick={addIngredient}
          className="mt-2 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          + 재료 추가
        </button>
      </div>

      {/* 조리 단계 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🍳 조리 단계</h3>

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50 shadow-sm"
          >
            <h4 className="font-semibold text-gray-700 mb-2">Step {step.stepNum}</h4>
            <textarea
              value={step.contents}
              onChange={(e) => updateStepContent(idx, e.target.value)}
              placeholder="조리 내용을 입력하세요"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-orange-400"
            />
            {step.imageUrl && (
              <img
                src={step.imageFile ? URL.createObjectURL(step.imageFile) : step.imageUrl}
                alt={`Step ${step.stepNum}`}
                className="w-36 h-36 object-cover rounded-lg mb-3 border border-gray-300 shadow-sm"
              />
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition text-sm font-medium shadow-sm">
                이미지 변경
                <input
                  type="file"
                  onChange={(e) => updateStepImage(idx, e.target.files[0])}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => deleteStep(idx)}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                ❌ 단계 삭제
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addStep}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition shadow-sm font-medium"
        >
          + 단계 추가
        </button>
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-center mt-8">
        <button
          onClick={submitEditRecipe}
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          레시피 수정 완료
        </button>
      </div>
    </div>
  );
}
