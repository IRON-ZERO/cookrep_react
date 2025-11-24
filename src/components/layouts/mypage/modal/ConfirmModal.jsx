import { useEffect } from "react";
import "../../../../styles/shared/modal.css";

export default function ConfirmModal({
  title = "확인",
  message = "정말 진행하시겠습니까?",
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="modal-animate bg-white rounded-lg shadow-lg pointer-events-auto max-w-sm w-full overflow-hidden">
          <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <h2 className="text-lg font-bold text-yellow-700">{title}</h2>
            </div>
          </div>

          <div className="px-6 py-5">
            <p className="text-gray-700 text-sm leading-relaxed wrap-break-word">
              {message}
            </p>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              취소
            </button>
            <button
              onClick={() => {
                if (typeof onConfirm === "function") onConfirm();
                if (typeof onClose === "function") onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
