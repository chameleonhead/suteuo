import * as React from "react";
import { useFormik } from "formik";
import Button from "../foundation/Button";
import ChipSelection from "../foundation/ChipSelection";
import Input from "../foundation/Input";

interface CreateMessageRoomFormValue {
  recipients: string[];
  text: string;
}

export type CreateMessageRoomFormProps = {
  userCandidates: { value: string; text: string }[];
  userQuery: string;
  onUserQueryChange: (userQuery: string) => void;
  onSubmit: (value: CreateMessageRoomFormValue) => void;
};

export const CreateMessageRoomForm = (props: CreateMessageRoomFormProps) => {
  const { userQuery, userCandidates, onUserQueryChange, onSubmit } = props;
  const [selectedUsers, setSelectedUsers] = React.useState(
    [] as { value: string; text: string }[]
  );
  const formik = useFormik<CreateMessageRoomFormValue>({
    initialValues: {
      recipients: [],
      text: "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (values.recipients.length === 0) {
        errors.recipients = "必須項目です。";
      }
      if (!values.text) {
        errors.text = "必須項目です。";
      }
      return errors;
    },
    onSubmit: (value, _) => onSubmit(value),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col space-y-4">
        <div>
          <ChipSelection
            placeholder="ユーザーを選択"
            selectedData={selectedUsers}
            selection={userCandidates}
            inputValue={userQuery}
            onChipChange={(value) => {
              setSelectedUsers(value);
              formik.setFieldValue(
                "recipients",
                value.map((e) => e.value)
              );
            }}
            onInputBlur={(e) => formik.handleBlur("recipients")}
            onInputValueChange={onUserQueryChange}
          />
        </div>
        <div>
          <Input
            type="text"
            id="text"
            name="text"
            placeholder="メッセージ"
            value={formik.values.text}
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

export default CreateMessageRoomForm;
