import AuthLayout from "../../components/layouts/auth/AuthLayout";
import AuthNavigator from "../../components/layouts/auth/AuthNavigator";
import JoinForm from "../../components/pages/join/JoinForm";

export default function Join() {
  return (
    <AuthLayout img={"join_wallpaper"}>
      <h2 className="text-2xl font-bold">회원가입</h2>
      <JoinForm />
      <AuthNavigator
        whiteTxt={"이미 회원이신가요?"}
        toGoTxt={"로그인"}
        toLink={"/login"}
      />
    </AuthLayout>
  );
}
