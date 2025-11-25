import BasicLayout from "../components/layouts/global/BasicLayout";
import HomeRecipeList from "../components/pages/home/homeRecipeList/HomeRecipeList";
import HomeRecipeSlide from "../components/pages/home/HomeRecipeSlide";
import CrownIcon from "../components/layouts/global/icons/CrownIcons";
import SearchRecipe from "../components/searchRecipe/SearchRecipe";

export default function Main() {
  return (
    <BasicLayout classNames={"mt-22 min-h-full flex flex-col gap-10"}>
      <div className="flex flex-col gap-3">
        <SearchRecipe />
        <div className="flex items-center gap-2">
          <CrownIcon />
          <h2 className="text-2xl font-bold">쿠크랩 Pick TOP 20</h2>
          <CrownIcon />
        </div>
        <HomeRecipeSlide />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">공공 레시피 리스트</h2>
        <HomeRecipeList />
      </div>
    </BasicLayout>
  );
}
