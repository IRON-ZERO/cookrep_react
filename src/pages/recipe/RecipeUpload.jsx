import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/auth/useUser";
import { recipeApi } from "../../apis/recipe/api";


const RecipeUpload = () => {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const userId = userData.userId;

  const [title, setTitle] = useState("");
  const [peopleCount, setPeopleCount] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [kcal, setKcal] = useState(0);

  const [mainFile, setMainFile] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  const [steps, setSteps] = useState([]);
  const [stepPreviews, setStepPreviews] = useState([]);

  const [ingredients, setIngredients] = useState([]);

  // 메인 이미지 미리보기 clean-up
  useEffect(() => {
    if (!mainFile) return;

    const previewUrl = URL.createObjectURL(mainFile);
    setMainPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [mainFile]);

  // 단계 이미지 미리보기 clean-up
  useEffect(() => {
    const urls = steps.map((s) => (s.file ? URL.createObjectURL(s.file) : null));
    setStepPreviews(urls);

    return () => urls.forEach((u) => u && URL.revokeObjectURL(u));
  }, [steps]);

  // 단계 추가
  const addStep = () => {
    setSteps([...steps, { content: "", file: null }]);
  };

  // 단계 삭제
  const deleteStep = (index) => {
    const newSteps = steps
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepOrder: i + 1 }));
    setSteps(newSteps);
  };

  // 단계 입력 변경
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  // 재료 추가
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", count: "" }]);
  };

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // ✔ 레시피 등록
  const submitRecipe = async () => {
    try {
      const now = Date.now();
      const fileNames = [];

      if (mainFile) {
        fileNames.push(`users/${userId}/recipes/${now}/main/${mainFile.name}`);
      }

      steps.forEach((step, idx) => {
        if (step.file) {
          fileNames.push(
            `users/${userId}/recipes/${now}/steps/${String(idx + 1).padStart(
              2,
              "0"
            )}_${step.file.name}`
          );
        }
      });

      // 1️⃣ presigned URL 요청
      const presignData = await recipeApi.getPresignedUrls(fileNames);

      for (let i = 0; i < presignData.length; i++) {
        const fileObj = presignData[i];
        let file;
        if (i === 0) file = mainFile;
        else file = steps[i - 1]?.file;

        if (file) {
          await fetch(fileObj.uploadUrl, { method: "PUT", body: file });
        }
      }

      const stepsData = steps.map((step, idx) => ({
        stepOrder: idx + 1,
        contents: step.content,
        imageUrl: step.file
          ? `users/${userId}/recipes/${now}/steps/${String(idx + 1).padStart(
              2,
              "0"
            )}_${step.file.name}`
          : null,
      }));

      const ingredientsData = ingredients.map((ing) => ({
        name: ing.name,
        count: ing.count,
      }));

      const recipeData = {
        title,
        peopleCount,
        prepTime,
        cookTime,
        kcal,
        thumbnailImageUrl: mainFile
          ? `users/${userId}/recipes/${now}/main/${mainFile.name}`
          : null,
        ingredients: ingredientsData,
        steps: stepsData,
      };

      // 4️⃣ 레시피 등록 API 호출
      const result = await recipeApi.postRecipe(userId, recipeData);
      alert("레시피 등록 완료!");

      if (result.recipeId) navigate(`/mypage/recipe/${result.recipeId}`);
    } catch (err) {
      console.error(err);
      alert("레시피 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-52 mb-11">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        레시피 작성
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitRecipe();
        }}
        className="space-y-8"
      >
        {/* 제목 */}
        <div>
          <label className="block text-xl font-extrabold mb-2 text-gray-700">
            레시피 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* 메인 이미지 */}
        <div>
          <label className="block text-xl font-extrabold mb-2 text-gray-700">
            메인 이미지 (필수)
          </label>

          {mainPreview && (
            <div className="mb-3">
              <img
                src={mainPreview}
                alt="미리보기"
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="main-image-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.9A5 5 0 1115.9 6a5 5 0 011 9.9h-1.4m-5 4l4-4m0 0l4 4m-4-4v12"
                  ></path>
                </svg>
                <p className="text-sm text-gray-600 font-semibold">
                  클릭하여 업로드
                </p>
              </div>
              <input
                id="main-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setMainFile(e.target.files[0])}
              />
            </label>
          </div>

          {mainFile && (
            <p className="mt-3 text-center text-sm text-gray-600">
              선택된 파일: {mainFile.name}
            </p>
          )}
        </div>

        {/* 기본 정보 */}
        <div>
          <label className="block text-xl font-extrabold mb-2 text-gray-700">
            인원 수 / 준비시간 / 조리시간 / 칼로리(kcal)
          </label>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="number"
              value={peopleCount || ""}
              onChange={(e) => setPeopleCount(parseInt(e.target.value) || 0)}
              placeholder="인원 수"
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              value={prepTime || ""}
              onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
              placeholder="준비 시간"
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              value={cookTime || ""}
              onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
              placeholder="조리 시간"
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              value={kcal || ""}
              onChange={(e) => setKcal(parseInt(e.target.value) || 0)}
              placeholder="칼로리"
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* 재료 */}
        <div>
          <h3 className="text-xl font-extrabold mb-2 text-gray-700">
            사용된 재료
          </h3>
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="재료 이름"
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="수량 (예: 200g, 1큰술)"
                  value={ing.count}
                  onChange={(e) =>
                    handleIngredientChange(idx, "count", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                  type="button"
                  onClick={() => deleteIngredient(idx)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  삭제
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-orange-400 text-white px-4 py-2 rounded-lg"
            >
              + 재료 추가
            </button>
          </div>
        </div>

        {/* 조리 단계 */}
        <div>
          <h3 className="text-xl font-extrabold mb-2 text-gray-700">
            조리 단계
          </h3>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-2 text-gray-700">
                  Step {idx + 1}
                </h4>

                <textarea
                  placeholder="조리 내용을 입력하세요"
                  value={step.content}
                  onChange={(e) =>
                    handleStepChange(idx, "content", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                />

                {/* 미리보기 */}
                {stepPreviews[idx] && (
                  <div className="mb-3">
                    <img
                      src={stepPreviews[idx]}
                      alt={`조리 단계 ${idx + 1} 미리보기`}
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}

                {/* 파일 업로드 */}
                <label
                  htmlFor={`stepImage-${idx}`}
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50 mb-3"
                >
                  <p className="text-gray-500">
                    이미지를 선택하거나 드래그하세요
                  </p>
                </label>

                <input
                  id={`stepImage-${idx}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleStepChange(idx, "file", e.target.files[0])
                  }
                  className="hidden"
                />

                {/* 삭제 버튼 */}
                <button
                  type="button"
                  onClick={() => deleteStep(idx)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition">
                  단계 삭제
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addStep}
              className="bg-orange-400 text-white px-4 py-2 rounded-lg"
            >
              + 단계 추가
            </button>
          </div>
        </div>

        {/* 저장 버튼 */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 mt-6"
        >
          레시피 저장
        </button>
      </form>
    </div>
  );
};

export default RecipeUpload;