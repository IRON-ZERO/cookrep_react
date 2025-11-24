import {useQuery} from "@tanstack/react-query";
import {recipeApi} from "../../apis/recipe/api";

export default function useSearchRecipe({title}) {
  const {data, isError, isPending, isSuccess, isLoading, refetch} = useQuery({
    queryKey: ["getSearchRecipe"],
    queryFn: () => recipeApi.getRecipeList(title),
  });
  return {data, isError, isPending, isSuccess, isLoading, refetch};
}
