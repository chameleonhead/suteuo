import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ResetPasswordForm, ResetPasswordFormProps } from "./ResetPasswordForm";

export default {
  title: "components/ResetPasswordForm",
  component: ResetPasswordForm,
} as Meta;

const Template: Story<ResetPasswordFormProps> = (args) => (
  <ResetPasswordForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  email: "test@example.com",
};
