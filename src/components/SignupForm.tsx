import * as React from "react";
import { useFormik } from "formik";

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
      const errors = {} as any;
      if (!values.username) {
        errors.username = "必須項目です。";
      }
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
      <div>
        <div>
          <label htmlFor="usernmae">ユーザー名</label>
          <input
            type="text"
            name="username"
            id="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            name="email"
            id="email"
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
          <button type="submit">登録</button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
