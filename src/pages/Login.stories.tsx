import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Login, LoginProps } from "./Login";
import { withContext } from "./utils";

export default {
  title: "pages/Login",
  component: Login,
  decorators: [withContext()],
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: {
    waitingUserConfirmation: false,
  },
};

export const WaitingForCode = Template.bind({});
WaitingForCode.args = {
  state: {
    waitingUserConfirmation: true,
  },
};
