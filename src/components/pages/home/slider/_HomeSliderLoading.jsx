import HomeSliderLayout from "./_HomeSliderLayout";
import HomeSliderLoadingItem from "./_HomeSliderLoadingItem";

export default function HomeSliderLoading() {
  return Array.from({length: 20}).map((_, index) => (
    <HomeSliderLayout key={index} classNames={`p-6`}>
      <HomeSliderLoadingItem />
    </HomeSliderLayout>
  ));
}
