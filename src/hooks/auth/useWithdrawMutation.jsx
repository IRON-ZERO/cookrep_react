import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { withDraw } from "../../apis/user/userApi";

export default function useWithdrawMutation() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["withdrawUser"],
    mutationFn: withDraw,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate };
}
