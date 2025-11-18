import {useQuery} from "@tanstack/react-query";
import {openApi} from "../../apis/openApi/openApi";

/**
 * @param {string} start
 * @param {string} end
 * @returns {OpenAPIResponse}
 */
export default function useOpenApiRecipeListQuery({start, end}) {
  const {data, isPending, isError, isSuccess} = useQuery({
    queryKey: ["openAPIRecieListDesc"],
    queryFn: () => openApi.getOpenAPIRecieListDesc({start, end}),
  });
  return {data, isPending, isError, isSuccess};
}
