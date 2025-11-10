import {useContext} from "react";
import {AuthModeContext} from "../../../contexts/auth/authModeContext";

function ModeBtn({mode, setMode, txt}) {
  return (
    <button
      className={`relative z-50 cursor-pointer px-5 py-3  ${
        mode ? "text-(--ck-txt)" : "text-(--ck-subTxt)"
      }`}
      onClick={setMode}
    >
      {txt}
    </button>
  );
}

export default function AuthMode() {
  const {authMode, setAuthMode} = useContext(AuthModeContext);
  const idMode = () => setAuthMode(true);
  const emailMode = () => setAuthMode(false);
  return (
    <div
      className={`relative flex border rounded-md authMode ${
        authMode ? "authMode_username" : "authMode_email"
      } `}
    >
      <ModeBtn mode={authMode} setMode={idMode} txt="아이디" />
      <ModeBtn mode={!authMode} setMode={emailMode} txt="이메일" />
    </div>
  );
}
