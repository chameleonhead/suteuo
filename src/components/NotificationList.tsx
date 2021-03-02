import * as React from "react";

export interface NotificationItem {
  id: string;
  timestamp: string;
  message: string;
}

type NotificationListRowProps = {
  data: NotificationItem;
  onNotificationSelect: (item: NotificationItem) => void;
};

const NotificationListRow = (props: NotificationListRowProps) => {
  const { data: e, onNotificationSelect } = props;
  return (
    <div
      className="p-2 hover:bg-gray-100"
      onClick={() => onNotificationSelect(e)}
    >
      <div>{e.message}</div>
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
      <div>
        <div className="border rounded divide-y">
          {items.map((e) => (
            <NotificationListRow
              key={e.id}
              data={e}
              onNotificationSelect={onNotificationSelect}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default NotificationList;
