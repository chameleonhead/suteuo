import * as React from "react";
import { connect } from "react-redux";
import Modal from "../foundation/Modal";
import { actionCreators, ApplicationState, selectors } from "../redux";

export type MessageDialogProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const MessageDialog = (props: MessageDialogProps) => {
  const { messages, onMessageClose } = props;
  const message = React.useMemo(() => messages[messages.length - 1], [
    messages,
  ]);
  if (!message) {
    return null;
  }
  return (
    <>
      {messages.map((m) => (
        <Modal
          key={m.id}
          open={message === m}
          onClose={() => onMessageClose(m.id)}
        >
          <div className="mt-5 m-auto w-64 bg-white">
            <div>{m.title}</div>
            <div>{m.message}</div>
          </div>
        </Modal>
      ))}
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  messages: selectors.getDialogMessages(state),
});

const mapDispatchToProps = {
  onMessageClose: actionCreators.closeMessageDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDialog);
