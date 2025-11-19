export default function NutritionFacts({car, eng, fat, na, pro}) {
  return (
    <aside className="flex flex-col gap-3">
      <h4 className="text-2xl font-semibold">영양성분표</h4>
      <div className="grid grid-cols-2 *:flex *:gap-3">
        <p>
          <span>탄수화물</span>
          <span>{car} g</span>
        </p>
        <p>
          <span>열량</span>
          <span>{eng} KCAL</span>
        </p>
        <p>
          <span>지방</span>
          <span>{fat} g</span>
        </p>
        <p>
          <span>나트륨</span>
          <span>{na} mg</span>
        </p>
        <p>
          <span>단백질</span>
          <span>{pro} g</span>
        </p>
      </div>
    </aside>
  );
}
