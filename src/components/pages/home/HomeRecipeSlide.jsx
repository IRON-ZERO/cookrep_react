import useOpenApiQuery from "../../../hooks/openApi/useOpenApiQuery";

export default function HomeRecipeSlide() {
  const {data, isPending} = useOpenApiQuery({start: 1, end: 20});
  return (
    <ul>
      {data.map((recipe) => (
        <li>{recipe.RCP_NM}</li>
      ))}
    </ul>
  );
}
