export default function IngredientTag({ name, active, onClick, onDelete }) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-lg border font-medium cursor-pointer transition-all duration-200 ${
        active
          ? "bg-orange-100 border-orange-400 text-orange-700 hover:bg-orange-200"
          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={onClick}
    >
      {name}
      <button
        className="ml-2 font-bold text-lg leading-none hover:opacity-70 transition"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ×
      </button>
    </span>
  );
}
