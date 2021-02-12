import * as React from "react";
import { useFormik } from "formik";

interface MessageFormValue {
  body: string;
}

export type MessageFormProps = {
  onSubmit: (value: MessageFormValue) => void;
};

export const MessageForm = (props: MessageFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik<MessageFormValue>({
    initialValues: {
      body: "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.body) {
        errors.body = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="body">メッセージ本文</label>
        <input
          id="body"
          type="text"
          name="body"
          value={formik.values.body}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <button type="submit">送信</button>
      </div>
    </form>
  );
};

export default MessageForm;
