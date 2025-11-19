export default function HomeSliderLoadingItem() {
  return (
    <>
      <div className="relative w-full flex justify-end -top-5 h-8 *:flex *:gap-3 *:absolute ">
        <div className="*:w-16 *:h-8 *:bg-slate-400 *:rounded-md">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className="animate-bounce" />
          ))}
        </div>
        <div className="*:w-16 *:h-8 *:bg-slate-400 *:rounded-md">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className="" />
          ))}
        </div>
      </div>
      {/* 제목 */}
      <div className="relative w-96 h-12 *:bg-slate-400 *:rounded-md">
        <div className="absolute w-96 h-12 animate-bounce" />
        <div className="absolute w-96 h-12" />
      </div>
    </>
  );
}
