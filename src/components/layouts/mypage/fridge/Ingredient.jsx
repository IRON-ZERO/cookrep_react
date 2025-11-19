import { useIngredientLogic } from "../../../../hooks/mypage/fridge/useIngredientLogic";
import IngredientList from "./IngredientList";
import IngredientControls from "./IngredientControls";
import IngredientStats from "./IngredientStats";

export default function Ingredient({
  user,
  activeIds,
  setActiveIds,
  setActiveNames,
  activeNames,
}) {
  const {
    ingredients,
    toggleActive,
    handleAdd,
    handleDelete,
    toggleSelectAll,
  } = useIngredientLogic(activeIds, setActiveIds, setActiveNames);

  return (
    <div className="mb-10 border-2 border-[#9d9d9d] rounded-xl p-12">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {user?.nickname}님이 가지고 있는 재료예요.
        </h3>
        <IngredientControls
          ingredientCount={ingredients?.length ?? 0}
          activeCount={activeIds.length}
          onAdd={handleAdd}
          onSelectAll={toggleSelectAll}
        />
      </div>

      {/* 설명 */}
      <p className="text-gray-600 mt-1">
        가지고 있는 재료를 누르면 메뉴를 추천해드려요.
      </p>

      {/* 재료 리스트 및 통계 */}
      <div className="flex flex-col gap-3">
        <IngredientList
          ingredients={ingredients}
          activeIds={activeIds}
          onToggle={toggleActive}
          onDelete={handleDelete}
        />
        <IngredientStats activeNames={activeNames} />
      </div>
    </div>
  );
}
