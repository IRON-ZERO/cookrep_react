import BasicLayout from "../components/layouts/global/BasicLayout";
import HomeRecipeSlide from "../components/pages/home/HomeRecipeSlide";

export default function Main() {
  return (
    <BasicLayout classNames={"mt-44 min-h-full"}>
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl font-bold">쿠크랩 Pick TOP 20</h2>
        <HomeRecipeSlide />
      </div>
    </BasicLayout>
  );
}
