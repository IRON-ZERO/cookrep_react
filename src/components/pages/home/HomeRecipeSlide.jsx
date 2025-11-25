import {useCallback, useRef, useState} from "react";
import useOpenApiSlideQuery from "../../../hooks/openApi/useOpenApiSlideQuery";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../layouts/global/icons/Chevron";
import HomeSlider from "./shared/loading/openApi/slider/_HomeSlider";
import HomeRecipeModal from "./shared/_HomeRecipeModal";
import HomeSliderLoading from "./shared/loading/openApi/slider/_HomeSliderLoading";
import OpenApiError from "./shared/loading/openApi/error/_OpenApiError";

export default function HomeRecipeSlide() {
  const [recipeId, setRecipeId] = useState("");
  const [X, setXPosition] = useState(0);
  const sliderRef = useRef(null);
  const {data, isPending, isError, isSuccess} = useOpenApiSlideQuery({
    start: 1,
    end: 20,
  });

  //   const move = useCallback((direction) => {
  //   const itemWidth = 200;
  //   const itemGap = 12;
  //   if (!sliderRef.current) return;
  //   const slideWidth = itemWidth + itemGap;
  //   const maxPosition = (data?.length - 1) * slideWidth; // 동적으로 계산
  //   setXPosition((prev) => {
  //     if (direction === "left") {
  //       return prev <= 0 ? maxPosition : prev - slideWidth;
  //     } else {
  //       return prev >= maxPosition ? 0 : prev + slideWidth;
  //     }
  //   });
  // }, [data?.length]);
  const move = useCallback((direction) => {
    const itemWidth = 200;
    const itemGap = 12;
    if (!sliderRef.current) return;
    const slideWidth = itemWidth + itemGap;
    setXPosition((prev) => {
      if (direction === "left") {
        return prev <= 0 ? 2600 : prev - slideWidth;
      } else {
        return prev >= 2600 ? 0 : prev + slideWidth;
      }
    });
  }, []);
  return (
    <div
      className="relative flex justify-between items-center w-full
     [&>button]:absolute [&>button]:w-24 [&>button]:h-full [&>button]:z-40 [&>button]:cursor-pointer 
     [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:rounded-md
     [&>button]:hover:bg-slate-800/20 [&>button]:transition [&>button]:duration-300 [&>button]:ease-in-out
     "
    >
      {isSuccess && (
        <button
          className="-left-10"
          onClick={() => move("left")}
          aria-label="이전 레시피 보기"
        >
          <ChevronLeftIcon className="size-30 text-(--ck-red)" />
        </button>
      )}
      <div className="relative flex justify-between overflow-hidden mx-20 w-[95%]">
        <ul
          ref={sliderRef}
          className="flex justify-between gap-3 w-[4000px] transition-transform duration-300 ease-in-out "
          style={{transform: `translateX(-${X}px)`}}
        >
          {isPending && <HomeSliderLoading />}
          {isSuccess &&
            data.row.map((r, index) => (
              <HomeSlider
                key={r.RCP_SEQ}
                data={r}
                index={index + 1}
                onClick={setRecipeId}
              />
            ))}
          {isError && <OpenApiError />}
        </ul>
        {recipeId && (
          <HomeRecipeModal
            recipe={data?.find((r) => r.RCP_SEQ === recipeId)}
            setModal={setRecipeId}
          />
        )}
      </div>
      {isSuccess && (
        <button
          className="-right-15"
          onClick={() => move("right")}
          aria-label="다음 레시피 보기"
        >
          <ChevronRightIcon className="size-30 text-(--ck-red)" />
        </button>
      )}
    </div>
  );
}
