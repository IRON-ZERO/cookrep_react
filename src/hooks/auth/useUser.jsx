import {useQuery} from "@tanstack/react-query";
import {authApi} from "../../apis/auth/authApi";
/**
 *
 * @returns {{
 *    data:{userId:string,userName:string,userEmail:string}
 * }}
 */
export default function useUser() {
  const {data, isPending} = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: authApi.loggedIn,
    placeholderData: {userId: null, userName: "로딩중", userEmail: "로딩중"},
  });

  return {data, isPending};
}
