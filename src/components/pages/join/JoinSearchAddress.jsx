import {useId} from "react";
import {onClickAddressBtn} from "../../../utils/auth/address";

export default function JoinSearchAddress({disable, setDisable, setValue}) {
  const manualAddressId = useId();
  const setAddress = () => onClickAddressBtn(setValue);
  return (
    <div className="flex gap-5">
      <div className="flex gap-4 items-center group">
        <label htmlFor={manualAddressId}>직접주소찾기</label>
        <div className="relative w-10 h-4 bg-gray-500 group-has-checked:bg-emerald-400 flex items-center rounded-full">
          <input
            type="checkbox"
            name="check"
            id={manualAddressId}
            className="box-border size-6 border appearance-none bg-gray-400 border-gray-300 checked:bg-(--ck-green) checked:border-(--ck-subTxt) rounded-full 
                         transition-all duration-300 ease-in-out
                         translate-x-0 checked:translate-x-full
                         "
            onChange={() => setDisable((prev) => !prev)}
          />
        </div>
      </div>
      <button
        type="button"
        className=" p-2 rounded-md cursor-pointer disabled:bg-(--ck-subTxt-dark) disabled:cursor-auto not-disabled:bg-(--ck-green)"
        disabled={disable}
        onClick={setAddress}
      >
        주소찾기
      </button>
    </div>
  );
}
