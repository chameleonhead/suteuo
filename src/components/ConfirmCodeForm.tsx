import * as React from "react";
import { useFormik } from "formik";

interface ConfirmCodeFormValue {
  username: string;
  password: string;
  code: string;
}

export type ConfirmCodeFormProps = {
  credential: { username: string; password: string };
  onSubmit: (value: ConfirmCodeFormValue) => void;
};

export const ConfirmCodeForm = (props: ConfirmCodeFormProps) => {
  const { credential, onSubmit } = props;
  const formik = useFormik<ConfirmCodeFormValue>({
    initialValues: {
      ...credential,
      code: "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.username) {
        errors.username = "必須項目です。";
      }
      if (!values.password) {
        errors.password = "必須項目です。";
      }
      if (!values.code) {
        errors.code = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onClick={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="code">パスコード</label>
          <input
            type="text"
            name="code"
            id="code"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </div>
    </form>
  );
};
