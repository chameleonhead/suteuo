import * as React from "react";
import { useFormik } from "formik";

interface UserInfoFormValue {
  area: string;
  username: string;
  name: string;
}

export type UserInfoFormProps = {
  onSubmit: (value: UserInfoFormValue) => void;
};

export const UserInfoForm = (props: UserInfoFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik<UserInfoFormValue>({
    initialValues: {
      area: "",
      username: "",
      name: "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.username) {
        errors.username = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="area">活動場所</label>
          <input
            id="area"
            type="text"
            name="area"
            value={formik.values.area}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">表示名</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
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

export default UserInfoForm;
