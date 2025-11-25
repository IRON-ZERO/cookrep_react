export default function CookTypeBadge({way, type, classNames = ""}) {
  return (
    <p
      className={`absolute flex gap-2 z-30 text-(--ck-white) text-xs *:px-3 *:py-1 *:rounded-xl ${classNames}`}
    >
      <span className="bg-(--ck-red)">{way}</span>
      <span className="bg-(--ck-green)">{type}</span>
    </p>
  );
}
