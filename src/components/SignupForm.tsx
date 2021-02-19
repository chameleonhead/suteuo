import * as React from "react";
import { useFormik } from "formik";
import ConfirmCodeForm from "./ConfirmCodeForm";

interface SignupFormValue {
  email: string;
  password: string;
}

interface ConfirmCodeFormValue {
  username: string;
  password: string;
  code: string;
}

export type SignupFormProps = {
  needConfirmation: boolean;
  onSubmit: (value: SignupFormValue) => void;
  onConfirmCode: (value: ConfirmCodeFormValue) => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const { needConfirmation, onSubmit, onConfirmCode } = props;
  const formik = useFormik<SignupFormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {} as any;
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
  if (needConfirmation) {
    return (
      <ConfirmCodeForm
        credential={{
          username: formik.values.email,
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
