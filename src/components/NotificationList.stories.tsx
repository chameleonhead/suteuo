import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { NotificationList, NotificationListProps } from "./NotificationList";

export default {
  title: "components/NotificationList",
  component: NotificationList,
} as Meta;

const Template: Story<NotificationListProps> = (args) => (
  <NotificationList {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  items: [],
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: "messageId",
      type: "",
      timestamp: "2021-01-10T10:12:31.000Z",
      payload: {
        message: "message",
      },
    },
  ],
};

export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    {
      id: "message-1",
      type: "MESSAGE_SENT",
      timestamp: "2021-01-10T10:12:31.000Z",
      payload: {
        message: "message1",
      },
    },
    {
      id: "message-2",
      type: "MESSAGE_SENT",
      timestamp: "2021-01-10T10:12:31.000Z",
      payload: {
        message: "message2",
      },
    },
  ],
};
