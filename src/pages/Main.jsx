import BasicLayout from "../components/layouts/global/BasicLayout";
import HomeRecipeList from "../components/pages/home/homeRecipeList/HomeRecipeList";
import HomeRecipeSlide from "../components/pages/home/HomeRecipeSlide";

export default function Main() {
  return (
    <BasicLayout classNames={"mt-44 min-h-full flex flex-col gap-10"}>
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl font-bold">쿠크랩 Pick TOP 20</h2>
        <HomeRecipeSlide />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl font-bold">식약식품안전처 레시피리스트</h2>
        <HomeRecipeList />
      </div>
    </BasicLayout>
  );
}
