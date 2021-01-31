import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { LoginForm, LoginFormProps } from "./LoginForm";

export default {
  title: "components/LoginForm",
  component: LoginForm,
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
