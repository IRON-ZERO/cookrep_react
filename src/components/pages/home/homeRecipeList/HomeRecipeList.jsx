import useOpenApiRecipeListQuery from "../../../../hooks/openApi/useOpenApiRecipeListQuery";
import {useState} from "react";
import HomeRecipeModal from "../shared/_HomeRecipeModal";
import HomeRecipeListCard from "./_HomeRecipeListCard";
import HomeRecipeListLoading from "./loading/HomeRecipeListLoading";
import OpenApiError from "../shared/loading/openApi/error/_OpenApiError";

export default function HomeRecipeList() {
  const [modal, setModal] = useState("");
  const {data, isSuccess, isPending, isError} = useOpenApiRecipeListQuery({
    start: 1,
    end: 50,
  });
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      {isPending && <HomeRecipeListLoading />}
      {isSuccess &&
        data.row.map((recipe) => (
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
      {isError && <OpenApiError className="col-span-4 mx-20" />}
    </ul>
  );
}
