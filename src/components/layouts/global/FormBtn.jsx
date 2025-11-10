export default function FormBtn({onClick, text}) {
  return (
    <button className="bg-(--ck-orange) p-2 rounded-md" onClick={onClick}>
      {text}
    </button>
  );
}
