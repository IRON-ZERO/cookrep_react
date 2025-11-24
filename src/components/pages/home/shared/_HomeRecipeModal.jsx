import {useEffect, useRef} from "react";
import NutritionFacts from "./recipeModalComp/_NutritionFacts";
import HowToCook from "./recipeModalComp/_HowToCook";

export default function HomeRecipeModal({recipe, setModal}) {
  const modalRef = useRef(null);
  const mapMannual = Array.from({length: 20}, (v, i) => {
    const index = String(i + 1).padStart(2, "0");
    const manual = recipe[`MANUAL${index}`] ?? "";
    const manualImg = recipe[`MANUAL_IMG${index}`] ?? "";
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
  useEffect(() => {
    const handleKeyDownEsc = (e) => {
      if (e.key === "Escape") {
        setModal("");
      }
    };
    window.addEventListener("keydown", handleKeyDownEsc);

    return () => window.removeEventListener("keydown", handleKeyDownEsc);
  }, [setModal]);
  // 모달이 열릴 때 포커스 트랩(focus trap) 구현
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const focusAble = modal.querySelector("button");
    focusAble?.focus();
    const trap = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };
    modal.addEventListener("keydown", trap);
    return () => modal.removeEventListener("keydown", trap);
  }, []);
  // 적절한 ARIA 속성 추가 (role="dialog", aria-modal="true", aria-labelledby 등)
  return (
    <article
      ref={modalRef}
      className="modal-animate fixed z-50 top-0 left-0 bg-slate-900/50 w-full  h-full flex justify-center items-center"
    >
      <div onClick={() => setModal("")} className="absolute w-full h-full" />
      <div className="bg-(--ck-white) rounded-md flex flex-col gap-3 relative overflow-auto h-[90%]">
        <div className="relative left-0 top-0">
          <img
            src={recipe.ATT_FILE_NO_MK}
            alt={recipe.RCP_NM}
            className="w-[500px] h-[300px] brightness-80"
          />
        </div>
        <div className="flex flex-col gap-5 p-6 w-[500px]">
          <NutritionFacts
            nm={recipe.RCP_NM}
            car={recipe.INFO_CAR}
            eng={recipe.INFO_ENG}
            fat={recipe.INFO_FAT}
            na={recipe.INFO_NA}
            pro={recipe.INFO_PRO}
          />
          <HowToCook mannual={mapMannual} />
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
