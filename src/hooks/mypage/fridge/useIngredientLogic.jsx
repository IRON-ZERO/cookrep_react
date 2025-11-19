import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUserIngredients,
  deleteUserIngredients,
  getUserIngredients,
} from "../../../apis/user/userApi";

export function useIngredientLogic(activeIds, setActiveIds, setActiveNames) {
  // 재료 리스트 조회
  const { data: ingredients } = useQuery({
    queryKey: ["userIngredients"],
    queryFn: getUserIngredients,
  });

  const queryClient = useQueryClient();

  // 재료 추가 mutation
  const addMutation = useMutation({
    mutationFn: addUserIngredients,
    onSuccess: () => {
      queryClient.invalidateQueries(["userIngredients"]);
    },
  });

  // 재료 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUserIngredients,
    onSuccess: () => {
      queryClient.invalidateQueries(["userIngredients"]);
    },
  });

  // 개별 재료 활성화/비활성화 토글
  const toggleActive = (id, name) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setActiveNames((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  // 재료 추가 핸들러
  const handleAdd = () => {
    const value = prompt("재료를 입력하세요. (예: 당근,마늘)");
    if (!value) return;
    const ingredientNames = value.split(",").map((v) => v.trim());
    addMutation.mutate(ingredientNames);
  };

  // 재료 삭제 핸들러
  const handleDelete = (ingredientId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    deleteMutation.mutate(ingredientId);
  };

  // 전체 활성화/비활성화 토글
  const toggleSelectAll = () => {
    if (!ingredients) return;

    const allIds = ingredients.map((i) => i.ingredientId);
    const allNames = ingredients.map((i) => i.name);

    const isAllSelected = activeIds.length === allIds.length;

    if (isAllSelected) {
      setActiveIds([]);
      setActiveNames([]);
    } else {
      setActiveIds(allIds);
      setActiveNames(allNames);
    }
  };

  return {
    ingredients,
    toggleActive,
    handleAdd,
    handleDelete,
    toggleSelectAll,
    isAddLoading: addMutation.isPending,
    isDeleteLoading: deleteMutation.isPending,
  };
}
