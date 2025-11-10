import {useId} from "react";

export default function AuthInput({inputId, labelText, errMsg, ...args}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${inputId}_` + id}>{labelText}</label>
      <input id={`${inputId}_` + id} {...args} />
      {errMsg && <small>{errMsg}</small>}
    </div>
  );
}
