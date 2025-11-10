import {Link} from "react-router";
import AuthLayout from "../../components/layouts/auth/AuthLayout";
import logo from "/images/logos/logo_3.png";
import AuthInput from "../../components/layouts/auth/AuthInput";
import FormBtn from "../../components/layouts/global/FormBtn";
import {useState} from "react";
import AuthMode from "../../components/pages/login/AuthMode";
import {AuthModeContext} from "../../contexts/auth/authModeContext";

export default function Login() {
  const [authMode, setAuthMode] = useState(true);
  return (
    <AuthLayout classNames="h-full relative overflow-hidden flex">
      <div className="bg-[url(/images/wallpaper/login-wp.avif)] bg-no-repeat bg-cover scale-110 brightness-50 w-full h-full absolute -top-10 left-0" />
      <div className="border-2 rounded-md p-5 glass-white right-0 flex flex-col gap-10 ml-auto items-center">
        <img src={logo} alt="로고이미지" width={200} height={200} />
        <AuthModeContext.Provider value={{authMode, setAuthMode}}>
          <AuthMode />
          <form className="*:flex *:flex-col *:gap-3 w-80">
            <fieldset>
              <legend>로그인</legend>
              <AuthInput
                labelText="UserName"
                type="text"
                className="bg-(--ck-subTxt-dark) focus-within:bg-(--ck-subTxt) px-3 py-2 rounded-md "
                placeholder="아이디를 입력해주세요."
              />
              <AuthInput
                labelText="Email"
                type="text"
                className="bg-(--ck-subTxt-dark) focus-within:bg-(--ck-subTxt) px-3 py-2 rounded-md"
                placeholder="이메일을 입력해주세요."
              />
              <AuthInput
                labelText="Password"
                type="password"
                className="bg-(--ck-subTxt-dark) focus-within:bg-(--ck-subTxt) px-3 py-2 rounded-md"
                placeholder="비밀번호를 입력해주세요"
              />
              <FormBtn text="로그인" />
            </fieldset>
          </form>
        </AuthModeContext.Provider>
        <div className="w-full  relative flex justify-center items-center">
          <div className="w-full h-px bg-(--ck-white)" />
          <span className="mx-2">or</span>
          <div className="w-full h-px bg-(--ck-white)" />
        </div>
        <p className="mt-auto text-sm">
          아직 회원이 아니세요?
          <Link to={"/join"} className="text-(--ck-green-light) ml-2">
            회원가입
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
