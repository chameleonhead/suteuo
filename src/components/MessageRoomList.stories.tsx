import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MessageRoomList, MessageRoomListProps } from "./MessageRoomList";

export default {
  title: "components/MessageRoomList",
  component: MessageRoomList,
} as Meta;

const Template: Story<MessageRoomListProps> = (args) => (
  <MessageRoomList {...args} />
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
      participants: ["user-1"],
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
};

export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    {
      id: "message-1",
      participants: ["user-1"],
      createdAt: "2021-01-10T10:12:31.000Z",
    },
    {
      id: "message-2",
      participants: ["user-1", "user-2"],
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
};

export const Selected = Template.bind({});
const item = {
  id: "message-1",
  participants: ["user-1"],
  createdAt: "2021-01-10T10:12:31.000Z",
};
Selected.args = {
  items: [
    item,
    {
      id: "message-2",
      participants: ["user-1", "user-2"],
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
  selectedMessageRoom: item,
};
