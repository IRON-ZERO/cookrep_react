import {useId} from "react";

export default function AuthInput({inputId, labelText, errMsg, ...args}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={`${inputId}_` + id}>{labelText}</label>
      <input
        id={`${inputId}_` + id}
        className="bg-(--ck-subTxt-dark) focus-within:bg-(--ck-subTxt) px-3 py-2 rounded-md w-full"
        {...args}
      />
      {errMsg && <small className="text-red-400">{errMsg}</small>}
    </div>
  );
}
