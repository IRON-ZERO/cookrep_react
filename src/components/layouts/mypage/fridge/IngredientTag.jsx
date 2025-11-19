export default function IngredientTag({ name, active, onClick, onDelete }) {
  return (
    <span
      className={`px-3 py-1 rounded-full border cursor-pointer transition-colors duration-150 ${
        active ? "bg-green-200 border-[#79c368]" : "bg-gray-100 border-gray-300"
      }`}
      onClick={onClick}
    >
      {name}
      <button
        className="ml-2 text-red-400 hover:text-red-600 cursor-pointer"
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
