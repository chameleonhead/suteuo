import * as React from "react";
import { useFormik } from "formik";

interface SignupFormValue {
  username: string;
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
      password: "",
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
          <button type="submit">登録</button>
        </div>
      </div>
    </form>
  );
};
