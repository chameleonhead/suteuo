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
      body: "message",
      sender: "sender",
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
};

export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    {
      id: "message-1",
      body: "message1",
      sender: "sender",
      createdAt: "2021-01-10T10:12:31.000Z",
    },
    {
      id: "message-2",
      body: "message2",
      sender: "sender",
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
};
