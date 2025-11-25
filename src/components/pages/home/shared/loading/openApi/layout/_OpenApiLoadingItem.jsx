export function OpenApiLoadingItemCircle() {
  return (
    <>
      <div className="absolute w-32 h-4 top-20 right-3 *:flex *:gap-1 *:absolute **:rounded-md **:w-full **:h-full ">
        <div className="animate-bounce *:bg-slate-400">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className="" />
          ))}
        </div>
        <div className=" *:bg-slate-400">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className="" />
          ))}
        </div>
      </div>
      {/* 제목 */}
      <div className="absolute w-36 h-6 bottom-16 right-3 *:bg-slate-400 *:rounded-md *:absolute *:w-full *:h-full">
        <div className="animate-bounce" />
        <div className="" />
      </div>
    </>
  );
}
export function OpenApiLoadingItemSquare() {
  return (
    <>
      <div className="relative w-full flex justify-end h-8 *:flex *:gap-3 *:absolute ">
        <div className="*:w-10 *:h-5 *:bg-slate-400 *:rounded-md">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} className="animate-bounce" />
          ))}
        </div>
        <div className="*:w-10 *:h-5 *:bg-slate-400 *:rounded-md">
          {Array.from({length: 3}).map((_, index) => (
            <div key={index} />
          ))}
        </div>
      </div>
      {/* 제목 */}
      <div className="relative w-56 h-5 self-end *:bg-slate-400 *:rounded-md *:absolute *:w-full *:h-full">
        <div className="animate-bounce" />
        <div />
      </div>
    </>
  );
}
