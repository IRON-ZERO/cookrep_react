import { useEffect } from "react";
import "../../../../styles/shared/modal.css";

export function ErrorToast({
  message = "오류가 발생했습니다.",
  onClose,
  duration = 2500,
}) {
  useEffect(() => {
    if (typeof onClose !== "function") return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
      <div
        role="status"
        aria-live="polite"
        className="modal-animate max-w-md w-full bg-red-50 border-l-4 border-red-500 rounded-lg px-5 py-3 shadow-lg flex items-start gap-3"
        onClick={() => typeof onClose === "function" && onClose()}
      >
        <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
          !
        </div>
        <p className="text-sm text-red-700 leading-relaxed wrap-break-word">
          {message}
        </p>
      </div>
    </div>
  );
}

export function SucceedToast({
  message = "작업이 완료되었습니다.",
  onClose,
  duration = 2000,
}) {
  useEffect(() => {
    if (typeof onClose !== "function") return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
      <div
        role="status"
        aria-live="polite"
        className="modal-animate max-w-md w-full bg-green-50 border-l-4 border-green-500 rounded-lg px-5 py-3 shadow-lg flex items-start gap-3"
        onClick={() => typeof onClose === "function" && onClose()}
      >
        <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
          ✓
        </div>
        <p className="text-sm text-green-700 leading-relaxed wrap-break-word">
          {message}
        </p>
      </div>
    </div>
  );
}

export default null;
