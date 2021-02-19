import * as React from "react";
import { useFormik } from "formik";
import ConfirmCodeForm from "./ConfirmCodeForm";

interface LoginFormValue {
  username: string;
  password: string;
}

interface ConfirmCodeFormValue {
  username: string;
  password: string;
  code: string;
}

export type LoginFormProps = {
  needConfirmation: boolean;
  onSubmit: (value: LoginFormValue) => void;
  onConfirmCode: (value: ConfirmCodeFormValue) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { needConfirmation, onSubmit, onConfirmCode } = props;
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
  console.log(needConfirmation)
  if (needConfirmation) {
    return (
      <ConfirmCodeForm
        credential={{
          username: formik.values.username,
          password: formik.values.password,
        }}
        onSubmit={(value) => onConfirmCode({ ...formik.values, ...value })}
      />
    );
  }
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
