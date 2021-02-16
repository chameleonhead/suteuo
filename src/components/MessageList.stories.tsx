import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MessageList, MessageListProps } from "./MessageList";

export default {
  title: "components/MessageList",
  component: MessageList,
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      messageId: "messageId",
      body: "message",
      sender: "sender",
      createdAt: "2021-01-10T10:12:31.000Z",
    },
  ],
};
