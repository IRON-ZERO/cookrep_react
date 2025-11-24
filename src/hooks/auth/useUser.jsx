import {useQuery} from "@tanstack/react-query";
import {authApi} from "../../apis/auth/authApi";
import {useEffect} from "react";
/**
 *
 * @returns {{
 *  data:{userId:string,userNickname:string,userEmail:string},
 *  isPending:boolean,
 *  isSuccess:boolean
 * }}
 */
export default function useUser() {
  const {data, isPending, isSuccess} = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: authApi.loggedIn,
    initialData: () => {
      try {
        return JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
      } catch {
        return null;
      }
    },
  });
  useEffect(() => {
    if (isSuccess && data) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(data));
    }
  }, [isSuccess, data]);

  return {data, isPending, isSuccess};
}
