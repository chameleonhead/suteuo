import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import Input from "../foundation/Input";
import Button from "../foundation/Button";

interface ForgotPasswordFormValue {
  email: string;
}

export type ForgotPasswordFormProps = {
  onSubmit: (value: ForgotPasswordFormValue) => void;
};

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik<ForgotPasswordFormValue>({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {} as FormikErrors<ForgotPasswordFormValue>;
      if (!values.email) {
        errors.email = "必須項目です。";
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
          <Button type="submit">パスワードを再設定</Button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
