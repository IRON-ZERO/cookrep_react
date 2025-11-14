import {useMutation} from "@tanstack/react-query";
import {authApi} from "../../apis/auth/authApi";
import {useNavigate} from "react-router";

export default function useLoginMutation() {
  const navigate = useNavigate();
  const {mutate} = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: async (error) => {
      console.log(error.message);
    },
    onSettled: (data) => {
      console.log(data);
    },
  });
  return {mutate};
}
