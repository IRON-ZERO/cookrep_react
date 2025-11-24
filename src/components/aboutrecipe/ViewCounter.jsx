export default function ViewsCounter({recipe}) {
  // const [views, setViews] = useState(0);

  // useEffect(() => {
  //   if (recipe && recipe.views !== undefined) {
  //     setViews(recipe.views);
  //   }
  // }, [recipe]);

  return (
    <div className="text-center mt-2 text-gray-600">
      🔥 조회수 {recipe?.views ?? 0}
    </div>
  );
}
