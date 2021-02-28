import * as React from "react";
import { useFormik } from "formik";
import Button from "../foundation/Button";
import ChipSelection from "../foundation/ChipSelection";

interface CreateMessageRoomFormValue {
  participants: string[];
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
      participants: [],
    },
    validate: (values) => {
      const errors = {} as any;
      if (values.participants.length === 0) {
        errors.participants = "必須項目です。";
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
                "participants",
                value.map((e) => e.value)
              );
            }}
            onInputBlur={(e) => formik.handleBlur("participants")}
            onInputValueChange={onUserQueryChange}
          />
        </div>
        <div>
          <Button type="submit">作成</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateMessageRoomForm;
