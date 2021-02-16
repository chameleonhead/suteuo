import * as React from "react";

interface MessageItem {
  messageId: string;
  body: string;
  sender: string;
  createdAt: string;
}

export type MessageListProps = {
  items: MessageItem[];
};

export const MessageList = (props: MessageListProps) => {
  const { items } = props;
  return (
    <div>
      <h1>メッセージ一覧</h1>
      <div>
        {items.map((e) => (
          <div key={e.messageId}>{e.body}</div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
