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
            id="username"
            type="email"
            name="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <input
            id="rememberMe"
            type="checkbox"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="rememberMe"> ログイン情報を保持する</label>
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </div>
    </form>
  );
};