import React, { useState } from "react";
import "../../styles/recipe/RecipeUpload.css";

const RecipeUpload = () => {
  // 임시 테스트용 userId
  const userId = "0c79275d-716f-4551-83ab-95265b648308";

  const [title, setTitle] = useState("");
  const [peopleCount, setPeopleCount] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [mainFile, setMainFile] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // 단계 추가
  const addStep = () => {
    setSteps([...steps, { content: "", file: null }]);
  };

  // 단계 삭제 함수
  const deleteStep = (index) => {
    const newSteps = steps
      .filter((_, i) => i !== index) // 선택한 단계 삭제
      .map((step, i) => ({          // stepOrder 재정렬
        ...step,
        stepOrder: i + 1,
      }));
    setSteps(newSteps);
  };

  // 단계 내용 변경
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  // 재료 추가
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", count: "" }]);
  };

  // 재료 삭제 함수
  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // 재료 변경
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const submitRecipe = async () => {
    try {
      const now = Date.now();
      const fileNames = [];

      // 메인 이미지 파일 경로 생성
      if (mainFile) {
        fileNames.push(`users/${userId}/recipes/${now}/main/${mainFile.name}`);
      }

      // Step 이미지 경로 생성
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

      // presigned URL 요청
      const presignResp = await fetch("/api/recipe/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fileNames),
      });

      if (!presignResp.ok) {
        alert("S3 presigned URL 생성 실패!");
        return;
      }

      const presignData = await presignResp.json();

      // S3 업로드
      for (let i = 0; i < presignData.length; i++) {
        const fileObj = presignData[i];
        let file;
        if (i === 0) file = mainFile;
        else file = steps[i - 1]?.file;

        if (file) {
          await fetch(fileObj.uploadUrl, {
            method: "PUT",
            body: file,
          });
        }
      }

      // Step 데이터 구성
      const stepsData = steps.map((step, idx) => {
        const imageUrl = step.file
          ? `users/${userId}/recipes/${now}/steps/${String(idx + 1).padStart(
              2,
              "0"
            )}_${step.file.name}`
          : null;
        return { stepOrder: idx + 1, contents: step.content, imageUrl };
      });

      // 재료 데이터 구성
      const ingredientsData = ingredients.map((ing) => ({
        name: ing.name,
        count: ing.count,
      }));

      // 최종 전송 데이터
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

      const registerResp = await fetch(`/api/recipe/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!registerResp.ok) {
        alert("레시피 등록 실패!");
        return;
      }

      const result = await registerResp.json();
      alert("레시피 등록 완료!");
      console.log(result);
    } catch (err) {
      console.error("레시피 등록 실패", err);
      alert("레시피 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="recipe-upload__cont">
      <h2>레시피 작성</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitRecipe();
        }}
      >
        {/* 제목 */}
        <div>
          <label className="text-2xl font-bold">레시피 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </div>

        {/* 메인 이미지 */}
        <div>
          <label>메인 이미지 (필수)</label>
          <input type="file" onChange={(e) => setMainFile(e.target.files[0])} />
        </div>

        {/* 기본 정보 */}
        <div>
          <label>인원 수 / 준비시간 / 조리시간 / 칼로리(kcal)</label>
          <input
            type="number"
            value={peopleCount || ""}
            onChange={(e) => setPeopleCount(parseInt(e.target.value) || 0)}
            placeholder="인원 수"
          />
          <input
            type="number"
            value={prepTime || ""}
            onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
            placeholder="준비 시간 (분)"
          />
          <input
            type="number"
            value={cookTime || ""}
            onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
            placeholder="조리 시간 (분)"
          />
           <input
              type="number"
              value={kcal || ""}
              onChange={(e) => setKcal(parseInt(e.target.value) || 0)}
              placeholder="칼로리 (kcal)"
            />
        </div>

        {/* 재료 입력 */}
        <div>
          <h3>재료</h3>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="ingredient">
              <input
                type="text"
                placeholder="재료 이름"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(idx, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="수량 (예: 200g, 1큰술 등)"
                value={ing.count}
                onChange={(e) =>
                  handleIngredientChange(idx, "count", e.target.value)
                }
              />
              <button type="button" onClick={() => deleteIngredient(idx)}>❌</button> 
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            + 재료 추가
          </button>
        </div>

        {/* 조리 단계 입력 */}
        <div>
          <h3>조리 단계</h3>
          {steps.map((step, idx) => (
            <div key={idx} className="step">
              <h4>Step {idx + 1}</h4>
              <textarea
                placeholder="조리 내용을 입력하세요"
                value={step.content}
                onChange={(e) =>
                  handleStepChange(idx, "content", e.target.value)
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  handleStepChange(idx, "file", e.target.files[0])
                }
              />
              <button type="button" onClick={() => deleteStep(idx)}>❌</button> 
            </div>
          ))}
          <button type="button" onClick={addStep}>
            + 단계 추가
          </button>
        </div>

        <button type="submit">레시피 저장</button>
      </form>
    </div>
  );
};

export default RecipeUpload;
