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
      return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    },
  });
  useEffect(() => {
    console.log(data);
    if (isSuccess && data) {
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    }
  }, [isSuccess, data]);

  return {data, isPending, isSuccess};
}
