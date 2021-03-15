import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ForgotPassword, ForgotPasswordProps } from "./ForgotPassword";
import { withContext } from "./utils";

export default {
  title: "pages/ForgotPassword",
  component: ForgotPassword,
  decorators: [withContext()],
} as Meta;

const Template: Story<ForgotPasswordProps> = (args) => (
  <ForgotPassword {...args} />
);

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
