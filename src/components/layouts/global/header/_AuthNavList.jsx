import {Link} from "react-router";
import useUser from "../../../../hooks/auth/useUser";
import useLogoutMutation from "../../../../hooks/auth/useLogoutMutation";

export default function AuthNavList() {
  const {data} = useUser();
  const {mutate} = useLogoutMutation();
  return (
    <nav>
      <ul className="flex items-center gap-5">
        {data ? (
          <>
            <li>
              <Link
                to={"/mypage"}
                className="size-10 overflow-hidden block rounded-full"
              >
                <img src="/images/icons/user-color.png" alt="아바타이미지" />
              </Link>
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
