import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import Input from "../foundation/Input";
import Button from "../foundation/Button";

interface ResetPasswordFormValue {
  email: string;
  code: string;
  newPassword: string;
}

export type ResetPasswordFormProps = {
  email: string;
  onSubmit: (value: ResetPasswordFormValue) => void;
};

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { email, onSubmit } = props;
  const formik = useFormik<ResetPasswordFormValue>({
    initialValues: {
      email: email,
      code: "",
      newPassword: "",
    },
    validate: (values) => {
      const errors = {} as FormikErrors<ResetPasswordFormValue>;
      if (!values.email) {
        errors.email = "必須項目です。";
      }
      if (!values.code) {
        errors.code = "必須項目です。";
      }
      if (!values.newPassword) {
        errors.newPassword = "必須項目です。";
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
            type="plaintext"
            name="email"
            placeholder="メールアドレス"
            value={formik.values.email}
          />
        </div>
        <div>
          <Input
            id="code"
            type="text"
            name="code"
            placeholder="コード"
            value={formik.values.code}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Input
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="新しいパスワード"
            value={formik.values.newPassword}
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

export default ResetPasswordForm;
