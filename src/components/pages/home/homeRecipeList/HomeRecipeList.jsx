import useOpenApiRecipeListQuery from "../../../../hooks/openApi/useOpenApiRecipeListQuery";
import {useState} from "react";
import HomeRecipeModal from "../shared/_HomeRecipeModal";
import HomeRecipeListCard from "./_HomeRecipeListCard";

export default function HomeRecipeList() {
  const [modal, setModal] = useState("");
  const {data, isSuccess, isPending, isError} = useOpenApiRecipeListQuery({
    start: 1,
    end: 50,
  });
  return (
    <ul className="grid grid-cols-5 gap-3">
      {isPending && <li></li>}
      {isSuccess &&
        data.map((recipe) => (
          <HomeRecipeListCard
            key={recipe.RCP_SEQ}
            recipe={recipe}
            setModal={setModal}
          />
        ))}
      {modal && (
        <HomeRecipeModal
          recipe={data.find((r) => r.RCP_SEQ === modal)}
          setModal={setModal}
        />
      )}
    </ul>
  );
}
