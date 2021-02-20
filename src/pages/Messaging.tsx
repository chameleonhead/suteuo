import * as React from "react";
import { connect } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import Layout from "../components/Layout";

export type MessagingProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const Messaging = (props: MessagingProps) => {
  const { messages, onInit, onCreateMessage } = props;
  React.useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <MessageList items={messages} />
      <MessageForm onSubmit={onCreateMessage} />
    </Layout>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  messages: selectors.getMessages(state),
});

const mapDispatchToProps = {
  onInit: actionCreators.fetchMessages,
  onCreateMessage: actionCreators.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
