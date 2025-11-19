import NutritionFacts from "./recipeModalComp/_NutritionFacts";

export default function HomeRecipeModal({recipe, setModal}) {
  const mapMannual = Array.from({length: 20}, (v, i) => {
    const index = String(i + 1).padStart(2, "0");
    const manual = recipe[`MANUAL${index}`];
    const manualImg = recipe[`MANUAL_IMG${index}`];
    if (
      (manual && manual.trim() !== "") ||
      (manualImg && manualImg.trim() !== "")
    ) {
      return {
        index,
        manual,
        manualImg,
      };
    }
  }).filter((i) => i !== undefined);
  //   ESC 키로 모달을 닫을 수 있도록 키보드 이벤트 핸들러 추가
  // 모달이 열릴 때 포커스 트랩(focus trap) 구현
  // 적절한 ARIA 속성 추가 (role="dialog", aria-modal="true", aria-labelledby 등)
  return (
    <article className="modal-animate fixed z-50 top-0 left-0 bg-slate-900/50 w-full h-full flex justify-center items-center">
      <div onClick={() => setModal("")} className="absolute w-full h-full" />
      <div className="bg-(--ck-white) rounded-md flex flex-col gap-3 relative overflow-auto h-[90%]">
        <div className="relative left-0 top-0">
          <img
            src={recipe.ATT_FILE_NO_MK}
            alt={recipe.RCP_NM}
            className="w-full h-[600px] brightness-80"
          />
        </div>
        <div className="flex flex-col gap-5 p-6">
          <h3 className="text-4xl text-(--ck-orange)">{recipe.RCP_NM}</h3>
          <NutritionFacts
            car={recipe.INFO_CAR}
            eng={recipe.INFO_ENG}
            fat={recipe.INFO_FAT}
            na={recipe.INFO_NA}
            pro={recipe.INFO_PRO}
          />
          <ul>
            {mapMannual?.map((item) => (
              <li key={item.index}>
                <img src={item.manualImg} alt={item.manual} loading="lazy" />
                <p>{item.manual}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setModal("")}
            className="bg-(--ck-orange) p-2 rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </article>
  );
}
