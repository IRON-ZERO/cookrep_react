import {useForm} from "react-hook-form";
import AuthInput from "../../layouts/auth/AuthInput";
import FormBtn from "../../layouts/global/FormBtn";
import {useEffect} from "react";
import useLoginMutation from "../../../hooks/auth/useLoginMutation";

export default function LoginForm({authMode}) {
  const {mutate} = useLoginMutation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  const onSubmit = (data) => mutate(data);

  useEffect(() => {
    setValue("userId", "");
    setValue("password", "");
    clearErrors();
  }, [authMode, setValue, clearErrors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="*:flex *:flex-col *:gap-3 w-full sm:w-80"
    >
      <fieldset>
        <legend>로그인</legend>
        {authMode ? (
          <AuthInput
            labelText="UserName"
            type="text"
            placeholder="아이디를 입력해주세요."
            {...register("userId", {
              minLength: {value: 5, message: "5자 이상이여야합니다."},
              required: {value: true, message: "필수로 입력해야합니다."},
            })}
            errMsg={errors.userId?.message}
          />
        ) : (
          <AuthInput
            labelText="Email"
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("userId")}
            errMsg={errors.userId?.message}
          />
        )}
        <AuthInput
          labelText="Password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        <FormBtn text="로그인" onClick={handleSubmit(onSubmit)} />
      </fieldset>
    </form>
  );
}
