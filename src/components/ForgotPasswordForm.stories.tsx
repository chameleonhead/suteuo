import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ForgotPasswordForm, ForgotPasswordFormProps } from "./ForgotPasswordForm";

export default {
  title: "components/ForgotPasswordForm",
  component: ForgotPasswordForm,
} as Meta;

const Template: Story<ForgotPasswordFormProps> = (args) => <ForgotPasswordForm {...args} />;

export const Default = Template.bind({});
