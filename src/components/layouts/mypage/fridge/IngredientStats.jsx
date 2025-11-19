export default function IngredientStats({ activeNames }) {
  return (
    <div className="text-[#434343] mt-4">
      검색 재료:{" "}
      {activeNames.length > 0 ? activeNames.join(", ") : "선택된 재료 없음"}
    </div>
  );
}
