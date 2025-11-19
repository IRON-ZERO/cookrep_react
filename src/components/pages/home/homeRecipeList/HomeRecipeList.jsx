import useOpenApiRecipeListQuery from "../../../../hooks/openApi/useOpenApiRecipeListQuery";

export default function HomeRecipeList() {
  const {data, isSuccess, isPending, isError} = useOpenApiRecipeListQuery({
    start: 1,
    end: 30,
  });
  return (
    <ul>
      {isPending && <li></li>}
      {isSuccess &&
        data.map((recipe) => (
          <li key={recipe.RCP_SEQ}>
            <h3>{recipe.RCP_NM}</h3>
          </li>
        ))}
    </ul>
  );
}
