import useOpenApiSlideQuery from "../../../hooks/openApi/useOpenApiSlideQuery";
import HomeSlider from "./slider/_HomeSlider";
import HomeSliderLoading from "./slider/_HomeSliderLoading";

export default function HomeRecipeSlide() {
  const {data, isPending, isError, isSuccess} = useOpenApiSlideQuery({
    start: 1,
    end: 20,
  });

  return (
    <div className="w-full overflow-hidden">
      <ul className="flex w-[10000px]">
        {isPending && <HomeSliderLoading />}
        {isSuccess &&
          data.map((recipe, index) => (
            <HomeSlider key={recipe.RCP_NM} data={recipe} index={index + 1} />
          ))}
        {isError && <HomeSliderLoading />}
      </ul>
    </div>
  );
}
