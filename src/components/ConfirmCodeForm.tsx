import * as React from "react";
import { useFormik } from "formik";

interface ConfirmCodeFormValue {
  usernamme: string;
  code: string;
}

export type ConfirmCodeFormProps = {
  usernamme: string;
  onSubmit: (value: ConfirmCodeFormValue) => void;
};

export const ConfirmCodeForm = (props: ConfirmCodeFormProps) => {
  const { usernamme, onSubmit } = props;
  const formik = useFormik<ConfirmCodeFormValue>({
    initialValues: {
      usernamme,
      code: "",
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onClick={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="passcode">パスコード</label>
          <input
            type="text"
            name="passcode"
            id="passcode"
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
