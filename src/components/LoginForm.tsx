import * as React from "react";
import { useFormik } from "formik";

interface LoginFormValue {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type LoginFormProps = {
  onSubmit: (value: LoginFormValue) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik<LoginFormValue>({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onClick={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="usernmae">メールアドレス</label>
          <input
            type="email"
            name="username"
            id="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            id="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </div>
    </form>
  );
};
