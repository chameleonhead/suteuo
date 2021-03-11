import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MessageList, MessageListProps } from "./MessageList";

export default {
  title: "components/MessageList",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  items: [],
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: "messageId",
      timestamp: "2021-01-10T10:12:31.000Z",
      sender: { id: "user-1", name: "sender" },
      text: "message",
    },
  ],
};

export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    {
      id: "message-1",
      timestamp: "2021-01-10T10:12:31.000Z",
      sender: { id: "user-1", name: "sender" },
      text: "message1",
    },
    {
      id: "message-2",
      timestamp: "2021-01-10T10:12:31.000Z",
      sender: { id: "user-1", name: "sender" },
      text: "message2",
    },
  ],
};
