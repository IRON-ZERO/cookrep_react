import IngredientTag from "./IngredientTag";

export default function IngredientList({
  ingredients,
  activeIds,
  onToggle,
  onDelete,
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {ingredients?.map((item) => (
        <IngredientTag
          key={item.ingredientId}
          id={item.ingredientId}
          name={item.name}
          active={activeIds.includes(item.ingredientId)}
          onClick={() => onToggle(item.ingredientId, item.name)}
          onDelete={() => onDelete(item.ingredientId)}
        />
      ))}
    </div>
  );
}
