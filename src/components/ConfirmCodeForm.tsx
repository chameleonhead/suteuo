import * as React from "react";
import { useFormik } from "formik";
import Input from "../foundation/Input";
import Button from "../foundation/Button";

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
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col space-y-3">
        <div>
          <Input
            id="code"
            type="text"
            name="code"
            placeholder="パスコード"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Button type="submit">送信</Button>
        </div>
      </div>
    </form>
  );
};

export default ConfirmCodeForm;
