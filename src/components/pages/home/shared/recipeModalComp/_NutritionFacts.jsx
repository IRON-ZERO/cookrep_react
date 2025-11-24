export default function NutritionFacts({nm, car, eng, fat, na, pro}) {
  return (
    <>
      <h3 className="text-4xl text-(--ck-orange) pb-2 border-b border-slate-300">
        {nm}
      </h3>
      <aside className="flex flex-col gap-3">
        <h4 className="text-2xl font-semibold">영양성분표</h4>
        <div
          className="grid grid-cols-2 border border-gray-300 rounded-md *:border-b *:border-gray-300 *:p-2"
          role="table"
        >
          {/* 탄수화물 */}
          <span>탄수화물</span>
          <span>{car} g</span>
          {/* 열량 */}
          <span>열량</span>
          <span>{eng} KCAL</span>
          {/* 지방 */}
          <span>지방</span>
          <span>{fat} g</span>
          {/* 나트륨 */}
          <span>나트륨</span>
          <span>{na} mg</span>
          {/* 단백질 */}
          <span>단백질</span>
          <span>{pro} g</span>
        </div>
      </aside>
    </>
  );
}
