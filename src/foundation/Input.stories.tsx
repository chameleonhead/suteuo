import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Input, InputProps } from "./Input";

export default {
  title: "foundation/Input",
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const PlainText = Template.bind({});
PlainText.args = {
  type: "plaintext",
  value: "text",
  placeholder: "プレーンテキスト",
};

export const Text = Template.bind({});
Text.args = {
  type: "text",
  value: "text",
  placeholder: "テキスト",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  value: "email",
  placeholder: "メールアドレス",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  value: "password",
  placeholder: "パスワード",
};
