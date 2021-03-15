import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MessageDialog, MessageDialogProps } from "./MessageDialog";

export default {
  title: "components/MessageDialog",
  component: MessageDialog,
} as Meta;

const Template: Story<MessageDialogProps> = (args) => (
  <MessageDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  messages: [{ id: "id", type: "error", title: "Title", message: "Message" }],
};
