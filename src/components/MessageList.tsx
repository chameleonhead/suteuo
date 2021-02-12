import * as React from "react";

interface MessageItem {
  PK: string;
  SK: string;
  Body: string;
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
          <div key={e.PK + "#" + e.SK}>{e.Body}</div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
