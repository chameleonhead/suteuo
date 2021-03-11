import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import Layout from "../components/Layout";
import MessageRoomList from "../components/MessageRoomList";
import CreateMessageRoomForm from "../components/CreateMessageRoomForm";
import Modal from "../foundation/Modal";
import Button from "../foundation/Button";

export type MessagingProps = ReturnType<typeof mergeProps>;

export const Messaging = (props: MessagingProps) => {
  const {
    auth,
    users,
    messageRooms,
    userQuery,
    selectedMessageRoom,
    messages,
    onInit,
    onChangeUserQuery,
    onSelectMessageRoom,
    onCreateMessage,
  } = props;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="mt-3 mb-6">
        <h1 className="text-3xl">メッセージ</h1>
      </div>
      <div className="md:grid md:grid-cols-3">
        <div className="p-3 mb-6 md:mb-0">
          <MessageRoomList
            items={messageRooms}
            selectedMessageRoom={selectedMessageRoom}
            loginUserId={auth?.user?.id || ""}
            onMessageRoomSelect={(mr) => onSelectMessageRoom(mr.id)}
          />
          <div className="mt-3">
            <Button type="button" onClick={() => setOpen(true)}>
              追加
            </Button>
          </div>
        </div>
        {selectedMessageRoom && (
          <div className="p-3 mb-6 md:mb-0 md:col-span-2">
            <MessageList items={messages} />
            <div className="mt-3">
              <MessageForm
                onSubmit={(value) =>
                  onCreateMessage({
                    recipients: selectedMessageRoom.participants.map(
                      (u) => u.id
                    ),
                    text: value.text,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="bg-white w-64 mt-3 m-auto p-3">
          <CreateMessageRoomForm
            userCandidates={
              userQuery
                ? users
                    .filter((u) => u.id !== auth.user?.id)
                    .filter((u) => u.name.includes(userQuery))
                    .map((u) => ({ value: u.id, text: u.name }))
                : []
            }
            userQuery={userQuery}
            onUserQueryChange={(value) => onChangeUserQuery(value)}
            onSubmit={onCreateMessage}
          />
        </div>
      </Modal>
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  state: state,
  auth: selectors.getAuthState(state),
  users: selectors.getUsers(state),
  messageRooms: selectors.getMessageRooms(state),
  ui: selectors.getMessagingState(state),
});

const mapDispatchToProps = {
  onInit: actionCreators.initMessaging,
  onChangeUserQuery: actionCreators.setUserQuery,
  onSelectMessageRoom: actionCreators.setMessageRoomId,
  onCreateMessage: actionCreators.createMessage,
};

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: typeof mapDispatchToProps
) => {
  const { selectedMessageRoomId, userQuery = "" } = stateProps.ui || {};
  if (selectedMessageRoomId) {
    return {
      ...stateProps,
      ...dispatchProps,
      userQuery: userQuery || "",
      messages: selectors.getMessagesByRoomId(
        stateProps.state,
        selectedMessageRoomId
      ),
      selectedMessageRoom: selectors.getMessageRoomById(
        stateProps.state,
        selectedMessageRoomId
      ),
    };
  }

  return {
    ...stateProps,
    ...dispatchProps,
    userQuery: userQuery || "",
    messages: [],
    selectedMessageRoom: undefined,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Messaging as any);
