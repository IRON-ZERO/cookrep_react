import {useForm} from "react-hook-form";
import useJoinMutation from "../../../hooks/auth/useJoinMutation";
import AuthInput from "../../layouts/auth/AuthInput";
import {useEffect, useState} from "react";
import FormBtn from "../../layouts/global/FormBtn";
import JoinSearchAddress from "./JoinSearchAddress";

export default function JoinForm() {
  const [disable, setDisable] = useState(true);
  const {mutate} = useJoinMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
    },
  });
  // fn
  const onSubmit = (data) => mutate(data);
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  // useEffect
  useEffect(() => {
    setValue("country", "");
    setValue("city", "");
  }, [disable, setValue]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="*:flex *:flex-col *:gap-3 w-full sm:w-[500px]"
    >
      <fieldset>
        <legend>회원가입</legend>
        <AuthInput
          inputId={"email"}
          labelText={"이메일"}
          errMsg={errors.email?.message}
          {...register("email")}
        />

        <AuthInput
          inputId={"nickname"}
          labelText={"아이디"}
          errMsg={errors.nickname?.message}
          {...register("nickname")}
        />
        <AuthInput
          inputId={"firstName"}
          labelText={"이름(성)"}
          errMsg={errors.firstName?.message}
          {...register("firstName")}
        />
        <AuthInput
          inputId={"lastName"}
          labelText={"이름"}
          errMsg={errors.lastName?.message}
          {...register("lastName")}
        />
        <JoinSearchAddress
          disable={disable}
          setDisable={setDisable}
          setValue={setValue}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <AuthInput
              inputId={"country"}
              labelText={"나라"}
              errMsg={errors.country?.message}
              {...register("country")}
              disabled={!disable}
            />
            <AuthInput
              inputId={"city"}
              labelText={"도시"}
              errMsg={errors.city?.message}
              {...register("city")}
              disabled={!disable}
            />
          </div>
        </div>
        <AuthInput
          inputId={"password"}
          labelText={"비밀번호"}
          errMsg={errors.password?.message}
          {...register("password")}
        />
        <AuthInput
          inputId={"passwordCheck"}
          labelText={"비밀번호 확인"}
          errMsg={errors.passwordCheck?.message}
          {...register("passwordCheck")}
        />
        <FormBtn text="회원가입" onClick={handleSubmit(onSubmit)} />
      </fieldset>
    </form>
  );
}
