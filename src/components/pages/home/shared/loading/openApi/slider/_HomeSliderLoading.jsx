import OpenApiLoadingLayout from "../layout/_OpenApiLoadingLayout";
import {OpenApiLoadingItemCircle} from "../layout/_OpenApiLoadingItem";

export default function HomeSliderLoading() {
  return Array.from({length: 20}).map((_, index) => (
    <OpenApiLoadingLayout
      key={index}
      classNames={`size-[200px] rounded-full group p-6 animate-pulse`}
    >
      <OpenApiLoadingItemCircle />
    </OpenApiLoadingLayout>
  ));
}
