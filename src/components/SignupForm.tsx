import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import Input from "../foundation/Input";
import Button from "../foundation/Button";

interface SignupFormValue {
  username: string;
  email: string;
  password: string;
}

export type SignupFormProps = {
  onSubmit: (value: SignupFormValue) => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik<SignupFormValue>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {} as FormikErrors<SignupFormValue>;
      if (!values.email) {
        errors.email = "必須項目です。";
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
            type="text"
            name="username"
            placeholder="ユーザー名"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={formik.values.email}
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
          <Button type="submit">登録</Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
