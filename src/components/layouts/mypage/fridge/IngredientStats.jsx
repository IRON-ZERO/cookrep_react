export default function IngredientStats({ activeNames }) {
  return (
    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
      <p className="text-sm font-medium text-gray-700">
        검색 재료{" "}
        <span className="text-orange-600 font-semibold">
          ({activeNames.length})
        </span>
      </p>
      {activeNames.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {activeNames.map((name, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">선택된 재료가 없습니다</p>
      )}
    </div>
  );
}
