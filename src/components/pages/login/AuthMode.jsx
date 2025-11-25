export default function AuthMode({mode, setMode}) {
  const idMode = () => setMode(true);
  const emailMode = () => setMode(false);
  return (
    <div
      className={`relative flex flex-col sm:flex-row border rounded-md authMode w-full ${
        mode ? "authMode_username" : "authMode_email"
      } `}
    >
      <ModeBtn mode={mode} setMode={idMode} txt="아이디" />
      <ModeBtn mode={!mode} setMode={emailMode} txt="이메일" />
    </div>
  );
}
function ModeBtn({mode, setMode, txt}) {
  return (
    <button
      className={`relative z-50 cursor-pointer px-5 py-3 w-full ${
        mode ? "text-(--ck-txt)" : "text-(--ck-subTxt)"
      }`}
      onClick={setMode}
    >
      {txt}
    </button>
  );
}
