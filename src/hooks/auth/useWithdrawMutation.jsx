import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {withDraw} from "../../apis/user/userApi";

export default function useWithdrawMutation(options = {}) {
  const navigate = useNavigate();
  const {onErrorCallback} = options;

  const {mutate} = useMutation({
    mutationKey: ["withdrawUser"],
    mutationFn: withDraw,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      if (typeof onErrorCallback === "function") {
        onErrorCallback(error);
      } else {
        // fallback to alert for backward compatibility
        alert(`회원 탈퇴에 실패했습니다: ${error?.message || error}`);
      }
    },
  });

  return {mutate};
}
