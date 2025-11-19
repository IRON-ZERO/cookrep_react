import { Link } from "react-router";
import useUser from "../../../../hooks/auth/useUser";
import useLogoutMutation from "../../../../hooks/auth/useLogoutMutation";

export default function AuthNavList() {
  const { data } = useUser();
  const { mutate } = useLogoutMutation();
  return (
    <nav>
      <ul>
        {data ? (
          <>
            <li>
              <Link to={"/mypage"}>내정보</Link>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => mutate()}>
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>로그인</Link>
            </li>
            <li>
              <Link to={"/join"}>회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
