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
      participants: [{ id: "user-1", name: "user1" }],
    },
  ],
};

export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    {
      id: "message-1",
      participants: [{ id: "user-1", name: "user1" }],
    },
    {
      id: "message-2",
      participants: [
        { id: "user-1", name: "user1" },
        { id: "user-2", name: "user2" },
      ],
    },
  ],
};

export const Selected = Template.bind({});
const item = {
  id: "message-1",
  participants: [{ id: "user-1", name: "user1" }],
};
Selected.args = {
  items: [
    item,
    {
      id: "message-2",
      participants: [
        { id: "user-1", name: "user1" },
        { id: "user-2", name: "user2" },
      ],
    },
  ],
  selectedMessageRoom: item,
};
