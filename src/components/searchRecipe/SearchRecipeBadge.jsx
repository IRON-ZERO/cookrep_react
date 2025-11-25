export function SearchRecipeBadgeInfo() {
  return (
    <p className="flex gap-2 *:flex *:items-center *:before:content-[''] *:before:w-5 *:before:h-full *:before:mr-1 *:before:rounded-full">
      <small className=" before:bg-blue-400">인원수</small>
      <small className="before:bg-emerald-700">요리시간</small>
      <small className="before:bg-orange-400">준비시간</small>
    </p>
  );
}
export function SearchRecipeBadge({peopleCount, cookTime, prepTime}) {
  return (
    <div className="flex gap-3 items-center *:px-2 *:py-1 *:rounded-lg group-hover:translate-y-[-300%]">
      <span className="bg-blue-400">{peopleCount} 인분</span>
      <span className="bg-emerald-700">{cookTime} 분</span>
      <span className="bg-orange-400">{prepTime} 분</span>
    </div>
  );
}
