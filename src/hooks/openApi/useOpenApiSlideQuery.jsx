import {useQuery} from "@tanstack/react-query";
import {openApi} from "../../apis/openApi/openApi";

export default function useOpenApiSlideQuery({start, end}) {
  const {data, isPending, isError, isSuccess} = useQuery({
    queryKey: ["openAPIRecipeSlideList"],
    queryFn: () => openApi.getOpenAPIRecipeSlideList({start, end}),
  });
  return {data, isPending, isError, isSuccess};
}
