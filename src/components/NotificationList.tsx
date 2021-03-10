import * as React from "react";

export interface NotificationItem {
  id: string;
  type: string;
  timestamp: string;
  payload: object;
}

type NotificationListRowProps = {
  data: NotificationItem;
  onNotificationSelect: (item: NotificationItem) => void;
};

const NotificationListRow = (props: NotificationListRowProps) => {
  const { data, onNotificationSelect } = props;
  return (
    <div
      className="p-2 hover:bg-gray-100"
      onClick={() => onNotificationSelect(data)}
    >
      <div>
        {data.type === "MESSAGE_SENT"
          ? "メッセージがあります。"
          : "通知があります。"}
      </div>
    </div>
  );
};

export type NotificationListProps = {
  items: NotificationItem[];
  onNotificationSelect: (item: NotificationItem) => void;
};

export const NotificationList = (props: NotificationListProps) => {
  const { items, onNotificationSelect } = props;
  if (items && items.length > 0) {
    return (
      <div className="divide-y">
        {items.map((e) => (
          <NotificationListRow
            key={e.id}
            data={e}
            onNotificationSelect={onNotificationSelect}
          />
        ))}
      </div>
    );
  }
  return <div className="p-2">通知はありません。</div>;
};

export default NotificationList;
