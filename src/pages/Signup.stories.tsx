import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Signup, SignupProps } from "./Signup";
import { withContext } from "./utils";

export default {
  title: "pages/Signup",
  component: Signup,
  decorators: [withContext()],
} as Meta;

const Template: Story<SignupProps> = (args) => <Signup {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: {
    waitingUserConfirmation: false,
  },
};

export const DefaultWithError = Template.bind({});
DefaultWithError.args = {
  state: {
    waitingUserConfirmation: false,
    error: "Error",
  },
};

export const WaitingForCode = Template.bind({});
WaitingForCode.args = {
  state: {
    waitingUserConfirmation: true,
  },
};
