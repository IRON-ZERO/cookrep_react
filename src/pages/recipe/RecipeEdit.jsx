import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/recipe/RecipeEdit.css";

export default function RecipeEdit() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const userId = "0c79275d-716f-4551-83ab-95265b648308"; // 임시 테스트용 userId

  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]); // ✅ 추가
  const [loading, setLoading] = useState(true);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [kcal, setKcal] = useState(0); 


  // ingredients 상태 변경 감지용 useEffect
    useEffect(() => {
      console.log("🍳 현재 재료 상태:", ingredients);
    }, [ingredients]);


  // ✅ 레시피 불러오기
  useEffect(() => {
    fetch(`/api/recipe/${recipeId}`)
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

  console.log("📸 불러온 기존 썸네일 URL:", data.thumbnailImageUrl || data.thumbnailUrl);
  console.log("🍳 불러온 기존 단계 이미지 URL 목록:", initSteps.map(s => s.imageUrl));

  setSteps(initSteps);
  setIngredients(data.ingredients || []);
  setLoading(false);
})

      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) return <p>로딩 중...</p>;
  if (!recipe) return <p>레시피를 찾을 수 없습니다.</p>;

  /** ✅ 재료 관련 로직 추가 **/
  const addIngredient = () => {
    const newIngredients = [...ingredients, { name: "", count: "" }];
    setIngredients(newIngredients);
    console.log("➕ 재료 추가:", newIngredients);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
    console.log(`✏️ 재료 수정(index ${index}):`, newIngredients[index]);
  };


  const deleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    console.log(`❌ 재료 삭제(index ${index}):`, newIngredients);
  };


  /** ✅ 단계 관련 로직 **/
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

  /** ✅ 수정 제출 **/
  const submitEditRecipe = async () => {
  try {
    const now = recipeId; // 수정 시 recipeId 사용
    const fileNames = [];

    // ✅ 대표 이미지 업로드 준비
    if (thumbnailFile) {
      // 파일명 인코딩
      const mainPath = `users/${userId}/recipes/${now}/main/${encodeURIComponent(thumbnailFile.name)}`;
      fileNames.push(mainPath);
    }

    // ✅ 단계 이미지 업로드 준비
    steps.forEach((step) => {
      if (step.imageFile) {
        const path = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(step.imageFile.name)}`;
        fileNames.push(path);
      }
    });

    // ✅ presigned URL 요청
    let presignData = [];
    if (fileNames.length > 0) {
      const presignResp = await fetch("/api/recipe/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileNames),
      });
      if (!presignResp.ok) throw new Error("Presigned URL 요청 실패");
      presignData = await presignResp.json();

      // ✅ 대표 이미지 업로드
      if (thumbnailFile) {
        const mainUrlObj = presignData.find((u) => u.fileName.includes("main"));
        if (mainUrlObj)
          await fetch(mainUrlObj.uploadUrl, { method: "PUT", body: thumbnailFile });
      }

      // ✅ 단계 이미지 업로드
      for (let step of steps) {
        if (step.imageFile) {
          const path = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(step.imageFile.name)}`;
          const urlObj = presignData.find((u) => u.fileName === path);
          if (urlObj)
            await fetch(urlObj.uploadUrl, { method: "PUT", body: step.imageFile });
        }
      }
    }

    // ✅ updateData 생성
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
          // 새 파일 업로드한 경우
          imageKey = `users/${userId}/recipes/${now}/steps/${step.stepNum}_${encodeURIComponent(step.imageFile.name)}`;
        } else if (step.imageUrl) {
          // 기존 URL에서 S3 Key 추출
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

    console.log("✅ 최종 변환된 step.imageUrl 목록:", steps.map(s => s.imageUrl));
    console.log("🧾 서버로 전송할 updateData:", updateData);

    await fetch(`/api/recipe/${recipeId}`, {
      method: "PUT",
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
    <div className="recipe-edit-container" style={{ padding: "2rem" }}>
      <h2>레시피 수정</h2>

      {/* 제목 */}
      <div>
        <label>레시피 제목</label>
        <input
          type="text"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
      </div>

      {/* 대표 이미지 */}
      <div>
        <label>대표 이미지</label>
       <img
  src={
    thumbnailFile
      ? URL.createObjectURL(thumbnailFile)
      : recipe.thumbnailImageUrl || recipe.thumbnailUrl
  }
  alt="thumbnail"
  style={{ width: 200 }}
/>

        <input type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} />
      </div>

      {/* 기본 정보 */}
      <div>
        <label>인원 / 준비시간 / 조리시간 / 칼로리(kcal)</label>
        <input
          type="number"
          value={recipe.peopleCount}
          onChange={(e) =>
            setRecipe({ ...recipe, peopleCount: e.target.value })
          }
          placeholder="인원"
        />
        <input
          type="number"
          value={recipe.prepTime}
          onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })}
          placeholder="준비시간"
        />
        <input
          type="number"
          value={recipe.cookTime}
          onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
          placeholder="조리시간"
        />
      <input
          type="number"
          value={kcal}
          onChange={(e) => setKcal(parseInt(e.target.value) || 0)}
          placeholder="칼로리 (kcal)"
        />
      </div>

      {/* ✅ 재료 수정 섹션 */}
      <div style={{ marginTop: "2rem" }}>
        <h3>🧂 재료</h3>
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
          >
            <input
              type="text"
              value={ing.name}
              placeholder="재료명"
              onChange={(e) => updateIngredient(idx, "name", e.target.value)}
            />
            <input
              type="text"
              value={ing.count}
              placeholder="수량 (예: 200g, 2개)"
              onChange={(e) => updateIngredient(idx, "count", e.target.value)}
            />
            <button onClick={() => deleteIngredient(idx)}>❌</button>
          </div>
        ))}
        <button onClick={addIngredient}>+ 재료 추가</button>
      </div>

      {/* 조리 단계 */}
      <h3 style={{ marginTop: "2rem" }}>🍳 조리 단계</h3>
      {steps.map((step, idx) => (
        <div key={idx} style={{ marginBottom: "1rem" }}>
          <h4>Step {step.stepNum}</h4>
          <textarea
            value={step.contents}
            onChange={(e) => updateStepContent(idx, e.target.value)}
          />
         {step.imageUrl && (
            <img
                src={step.imageFile ? URL.createObjectURL(step.imageFile) : step.imageUrl}
                alt={`Step ${step.stepNum}`}
                style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
                }}
            />
            )}

          <input type="file" onChange={(e) => updateStepImage(idx, e.target.files[0])} />
          <button onClick={() => deleteStep(idx)}>삭제</button>
        </div>
      ))}
      <button onClick={addStep}>+ 단계 추가</button>

      <div style={{ marginTop: "2rem" }}>
        <button onClick={submitEditRecipe}>레시피 수정</button>
      </div>
    </div>
  );
}