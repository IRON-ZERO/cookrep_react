import {Link} from "react-router";
import useUser from "../../../../hooks/auth/useUser";
import useLogoutMutation from "../../../../hooks/auth/useLogoutMutation";
import {ArrowRightStartOnRectangleIcon} from "../icons/ArrowOnRect";
import useGetScroll from "../../../../hooks/util/useGetScroll";

export default function AuthNavList() {
  const {data} = useUser();
  const {mutate} = useLogoutMutation();
  const {Y} = useGetScroll();
  return (
    <nav className="**:text-lg **:text-nowrap">
      <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-5 ">
        {data ? (
          <>
            <li>
              <Link
                to={"/mypage"}
                className="size-5 overflow-hidden block rounded-full"
              >
                <img src="/images/icons/user-color.png" alt="아바타이미지" />
              </Link>
            </li>

            <li>
              <Link to={"/mypage"} className="">
                <span
                  className={`text-sm transition-colors ease-in-out duration-300 hover:text-orange-500/75 ${
                    Y ? "text-(--ck-txt)" : "text-(--ck-orange)"
                  }`}
                >
                  {data.userNickname}
                </span>
              </Link>
            </li>
            <li>
              <button
                className={`cursor-pointer flex items-center gap-2 p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-gray-300/50 group ${
                  Y ? "" : "text-(--ck-orange) bg-slate-200"
                }`}
                onClick={() => mutate()}
              >
                <ArrowRightStartOnRectangleIcon className="size-5 group-hover:text-(--ck-orange-pretty)" />
                <span className="text-nowrap h-5 group-hover:text-(--ck-orange-pretty)">
                  로그아웃
                </span>
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
