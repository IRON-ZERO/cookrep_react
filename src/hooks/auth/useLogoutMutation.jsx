import {useMutation} from "@tanstack/react-query";
import {authApi} from "../../apis/auth/authApi";
import {useNavigate} from "react-router";

export default function useLogoutMutation() {
  const navigate = useNavigate();
  const {mutate} = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: authApi.logout,
    onSuccess: () => {
      sessionStorage.removeItem("loggedInUser");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {mutate};
}
