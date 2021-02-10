import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { SignupForm, SignupFormProps } from "./SignupForm";

export default {
  title: "components/SignupForm",
  component: SignupForm,
} as Meta;

const Template: Story<SignupFormProps> = (args) => <SignupForm {...args} />;

export const Default = Template.bind({});
