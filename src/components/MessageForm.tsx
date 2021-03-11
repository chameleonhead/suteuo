import * as React from "react";
import { useFormik } from "formik";

interface MessageFormValue {
  text: string;
}

export type MessageFormProps = {
  onSubmit: (value: MessageFormValue) => void;
};

export const MessageForm = (props: MessageFormProps) => {
  const { onSubmit } = props;
  const [focus, setFocus] = React.useState(false);
  const formik = useFormik<MessageFormValue>({
    initialValues: {
      text: "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.text) {
        errors.text = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={
          "relative flex items-stretch border rounded p-0" +
          (focus ? " ring-offset-2 ring-2 ring-indigo-500" : "")
        }
      >
        <input
          className="flex-auto block py-1 px-2 rounded-l outline-none focus:outline-none"
          id="text"
          type="text"
          name="text"
          placeholder="メッセージ"
          value={formik.values.text}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          className="block py-2 px-4 border-l text-sm rounded-r text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          送信
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
