export default function IngredientControls({
  ingredientCount,
  activeCount,
  onAdd,
  onSelectAll,
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium text-sm"
      >
        + 재료 추가
      </button>
      <button
        onClick={onSelectAll}
        className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium text-sm"
      >
        {activeCount === ingredientCount && ingredientCount > 0
          ? "전체 해제"
          : "전체 선택"}
      </button>
    </div>
  );
}
