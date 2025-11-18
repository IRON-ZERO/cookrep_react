import BasicLayout from "../components/layouts/global/BasicLayout";
import HomeRecipeSlide from "../components/pages/home/HomeRecipeSlide";

export default function Main() {
  return (
    <BasicLayout classNames={"mt-44 min-h-full"}>
      <h1>hoho</h1>
      <HomeRecipeSlide />
    </BasicLayout>
  );
}
