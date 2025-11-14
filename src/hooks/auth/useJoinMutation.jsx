import {useMutation} from "@tanstack/react-query";
import {authApi} from "../../apis/auth/authApi";
import {useNavigate} from "react-router";

export default function useJoinMutation() {
  const navigate = useNavigate();
  const {mutate, isError} = useMutation({
    mutationKey: ["joinMutation"],
    mutationFn: authApi.join,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      if (error.message) {
        throw new Error(error.message || "오류가 발생했습니다.");
      }
    },
  });
  return {mutate, isError};
}
