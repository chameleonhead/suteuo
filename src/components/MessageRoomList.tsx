import * as React from "react";

export interface MessageRoomItem {
  id: string;
  participants: { id: string; name: string }[];
  createdAt: string;
}

export type MessageRoomListProps = {
  loginUserId: string;
  items: MessageRoomItem[];
  selectedMessageRoom: MessageRoomItem | undefined;
  onMessageRoomSelect: (item: MessageRoomItem) => void;
};

export const MessageRoomList = (props: MessageRoomListProps) => {
  const {
    loginUserId,
    items,
    selectedMessageRoom,
    onMessageRoomSelect,
  } = props;
  if (items.length > 0) {
    return (
      <div>
        <div className="border rounded divide-y">
          {items.map((e) => (
            <div
              key={e.id}
              className={
                "p-2 hover:bg-gray-100" +
                (selectedMessageRoom === e ? " bg-gray-100" : "")
              }
            >
              <div onClick={() => onMessageRoomSelect(e)}>
                {(e.participants.length > 1
                  ? e.participants.filter((p) => p.id !== loginUserId)
                  : e.participants
                )
                  .map((u) => u.name)
                  .join("、")}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default MessageRoomList;
