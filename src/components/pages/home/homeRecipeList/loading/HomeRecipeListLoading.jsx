import {OpenApiLoadingItemSquare} from "../../shared/loading/openApi/layout/_OpenApiLoadingItem";
import OpenApiLoadingLayout from "../../shared/loading/openApi/layout/_OpenApiLoadingLayout";

export default function HomeRecipeListLoading() {
  return Array.from({length: 20}).map((_, index) => (
    <OpenApiLoadingLayout
      key={index}
      classNames="h-[300px] rounded-md shadow-2 p-2 animate-pulse"
    >
      <OpenApiLoadingItemSquare />
    </OpenApiLoadingLayout>
  ));
}
