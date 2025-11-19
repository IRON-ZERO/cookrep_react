export default function IngredientControls({
  ingredientCount,
  activeCount,
  onAdd,
  onSelectAll,
}) {
  return (
    <div className="flex gap-3">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
        onClick={onAdd}
      >
        재료 추가
      </button>
      <button
        className="px-3 py-1 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition"
        onClick={onSelectAll}
      >
        {activeCount === ingredientCount ? "전체 해제" : "전체 선택"}
      </button>
    </div>
  );
}
