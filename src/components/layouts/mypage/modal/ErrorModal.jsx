import { useEffect } from "react";
import "../../../styles/shared/modal.css";

export default function ErrorModal({
  message = "오류가 발생했습니다.",
  onClose,
}) {
  // ESC 키 누르면 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="modal-animate bg-white rounded-lg shadow-lg pointer-events-auto max-w-sm w-full border-l-4 border-red-500 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-red-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-500 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <h2 className="text-lg font-bold text-red-700">오류</h2>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-6 py-5">
            <p className="text-gray-700 text-sm leading-relaxed wrap-break-word">
              {message}
            </p>
          </div>

          {/* 버튼 */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
