export default function HowToCook({mannual}) {
  return (
    <>
      <h4 className="text-xl font-semibold">조리방법</h4>
      <ul className="flex flex-col gap-2">
        {mannual?.map((item) => (
          <li key={item.index} className="flex flex-col items-center gap-3">
            <img
              src={item.manualImg}
              alt={item.manual}
              loading="lazy"
              className="w-80"
            />
            <span className="text-center">{item.manual}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
