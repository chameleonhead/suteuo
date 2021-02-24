import * as React from "react";
import { useFormik } from "formik";
import Input from "../foundation/Input";
import Button from "../foundation/Button";

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
      <div className="flex flex-col space-y-4">
        <div>
          <Input
            id="username"
            type="email"
            name="username"
            placeholder="メールアドレス"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="パスワード"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Button type="submit">ログイン</Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
