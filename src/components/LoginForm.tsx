import * as React from "react";
import { useFormik } from "formik";

interface LoginFormValue {
  username: string;
  password: string;
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
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.username) {
        errors.username = "必須項目です。";
      }
      if (!values.password) {
        errors.password = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
          <button type="submit">ログイン</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
