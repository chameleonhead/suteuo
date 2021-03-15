import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Messaging, MessagingProps } from "./Messaging";
import { withContext } from "./utils";

export default {
  title: "pages/Messaging",
  component: Messaging,
  decorators: [withContext()],
} as Meta;

const Template: Story<MessagingProps> = (args) => <Messaging {...args} />;

export const Default = Template.bind({});
Default.args = {
  auth: { state: "LOGGED_IN" },
  messageRooms: [],
  messages: [],
};
