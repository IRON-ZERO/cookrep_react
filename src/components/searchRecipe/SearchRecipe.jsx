import {useState} from "react";
import useSearchRecipe from "../../hooks/recipe/useSearchRecipe";
import SearchRecipeCard from "./SearchRecipeCard";
import {SearchRecipeBadgeInfo} from "./SearchRecipeBadge";

export default function SearchRecipe() {
  const [title, setTitle] = useState("");
  const {data, isError, isPending, isSuccess} = useSearchRecipe({
    title,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">레시피 검색</h2>
        <SearchRecipeBadgeInfo />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="레시피 이름을 검색해 보세요."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="px-2 py-1 focus:px-5 focus:py-6 w-full rounded-md border border-(--ck-subTxt) bg-(--ck-white) transition-[padding] duration-300 ease-in-out"
        />
      </form>
      {isPending && <p className="text-xl">불러오는 중 입니다.</p>}
      {isSuccess && (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-3 place-items-center-safe ">
          {Array.isArray(data) && data.length === 0 ? (
            <li className="col-span-full text-xl text-center py-8">
              검색 결과가 없습니다.
            </li>
          ) : (
            <SearchRecipeCard recipe={data} />
          )}
        </ul>
      )}
      {isError && (
        <p className="text-xl text-(--ck-red)">
          서비스를 불러오는데 오류가 발생했습니다.
        </p>
      )}
    </div>
  );
}
