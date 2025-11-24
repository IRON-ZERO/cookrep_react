import AuthLayout from "../../components/layouts/auth/AuthLayout";
import logo from "/images/logos/logo_3.png";
import {useState} from "react";
import AuthMode from "../../components/pages/login/AuthMode";
import LoginForm from "../../components/pages/login/LoginForm";
import AuthDivider from "../../components/layouts/auth/AuthDivider";
import AuthNavigator from "../../components/layouts/auth/AuthNavigator";

export default function Login() {
  const [authMode, setAuthMode] = useState(true);
  return (
    <AuthLayout img={"login_wallpaper"}>
      <img
        src={logo}
        alt="로고이미지"
        loading="lazy"
        className="w-44 sm:w-52 transition-[width] duration-300 ease-in-out"
      />
      <AuthMode mode={authMode} setMode={setAuthMode} />
      <LoginForm authMode={authMode} />
      <AuthDivider />
      <AuthNavigator
        whiteTxt={"아직 회원이 아니세요?"}
        toGoTxt={"회원가입"}
        toLink={"/join"}
      />
    </AuthLayout>
  );
}
