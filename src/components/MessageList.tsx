import * as React from "react";

interface MessageItem {
  id: string;
  timestamp: string;
  sender: { id: string; name: string };
  text: string;
}

export type MessageListProps = {
  items: MessageItem[];
};

export const MessageList = (props: MessageListProps) => {
  const { items } = props;
  if (items.length > 0) {
    return (
      <div>
        <div className="border rounded divide-y">
          {items.map((e) => (
            <div key={e.id} className="p-2">
              <div className="flex justify-between items-baseline">
                <div>{e.text}</div>
                <div className="text-sm text-gray-600">{e.timestamp}</div>
              </div>
              <div className="text-sm text-gray-600">{e.sender.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default MessageList;
