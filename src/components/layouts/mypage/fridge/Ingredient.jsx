import { useEffect, useState } from "react";
import { useIngredientLogic } from "../../../../hooks/mypage/fridge/useIngredientLogic";
import IngredientList from "./IngredientList";
import IngredientControls from "./IngredientControls";
import IngredientStats from "./IngredientStats";
import { ErrorToast, SucceedToast } from "../modal/Modal";

export default function Ingredient({
  user,
  activeIds,
  setActiveIds,
  setActiveNames,
  activeNames,
}) {
  const {
    ingredients,
    toggleActive,
    handleAdd,
    handleDelete,
    toggleSelectAll,
  } = useIngredientLogic(activeIds, setActiveIds, setActiveNames);

  // Add modal + toast state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addInput, setAddInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const onConfirmAdd = () => {
    // 우선 tags 우선, 없으면 입력창에서 처리
    const target = tags.length > 0 ? tags : addInput;
    const resp = handleAdd(target);
    if (!resp) {
      setErrorToast("알 수 없는 오류");
      return;
    }
    if (!resp.success) {
      setErrorToast(resp.message || "유효한 재료 이름을 입력해주세요.");
      return;
    }
    setShowAddModal(false);
    setAddInput("");
    setTags([]);
    setSuccessToast("재료 추가 되었습니다.");
  };

  const addTagFromInput = () => {
    const raw = String(addInput || "");
    const parts = raw
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    if (parts.length === 0) return;
    setTags((prev) => {
      const next = [...prev];
      parts.forEach((p) => {
        if (!next.includes(p)) next.push(p);
      });
      return next;
    });
    setAddInput("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTagFromInput();
    }
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  useEffect(() => {
    if (!showAddModal) {
      setAddInput("");
      setTags([]);
      return;
    } // 모달이 닫혔을 때 인풋 태그들 초기화

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowAddModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showAddModal, setShowAddModal]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {user?.nickname}님이 가지고 있는 재료예요.
            </h2>
            <p className="text-gray-600">
              가지고 있는 재료를 누르면 메뉴를 추천해드려요.
            </p>
          </div>
          <IngredientControls
            ingredientCount={ingredients?.length ?? 0}
            activeCount={activeIds.length}
            onAdd={() => setShowAddModal(true)}
            onSelectAll={toggleSelectAll}
          />
        </div>

        {/* Ingredients List */}
        <div className="pt-6">
          <IngredientList
            ingredients={ingredients}
            activeIds={activeIds}
            onToggle={toggleActive}
            onDelete={handleDelete}
          />
        </div>

        {/* Stats */}
        <div className="pt-6">
          <IngredientStats activeNames={activeNames} />
        </div>
      </div>

      {/* Add Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4
    transition-opacity duration-300
    ${showAddModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setShowAddModal(false)}
        />

        {/* Modal Box */}
        <div
          className={`bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg
      transition-all duration-300 ease-out 
      ${showAddModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}
    `}
        >
          <h3 className="text-lg font-semibold mb-3 text-center">재료 추가</h3>
          <p className="text-sm text-gray-500 mb-3">
            냉장고에 추가할 재료를 입력하세요.
          </p>
          <div className="mb-4 flex flex-col flex-wrap gap-1">
            <p className="text-sm">재료 이름</p>
            <input
              value={addInput}
              onChange={(e) => setAddInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="w-full h-9 px-3 py-1 rounded-md
        border border-gray-300 text-sm text-gray-900
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-gray-600
        transition-all mb-1"
              placeholder="예: 당근, 양파, 감자"
            />

            <p className="text-sm text-gray-500 mb-4">
              엔터 또는 쉼표를 입력하면 태그가 추가됩니다.
            </p>
          </div>
          {tags.length > 0 && (
            <div className="mb-4 flex flex-col flex-wrap gap-1">
              <p className="text-sm">추가할 재료 ({tags.length}개)</p>

              <div className="flex flex-wrap gap-2 w-full px-3 py-2 border bg-gray-50 border-gray-300 rounded mb-1">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 border-orange-300 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{t}</span>
                    <button
                      onClick={() => removeTag(t)}
                      className="hover:text-orange-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={() => setShowAddModal(false)}
            >
              취소
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={onConfirmAdd}
            >
              추가
            </button>
          </div>
        </div>
      </div>

      {/* Toasts */}
      {errorToast && (
        <ErrorToast message={errorToast} onClose={() => setErrorToast(null)} />
      )}
      {successToast && (
        <SucceedToast
          message={successToast}
          onClose={() => setSuccessToast(null)}
        />
      )}
    </div>
  );
}
