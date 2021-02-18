import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { UserInfoForm, UserInfoFormProps } from "./UserInfoForm";

export default {
  title: "components/UserInfoForm",
  component: UserInfoForm,
} as Meta;

const Template: Story<UserInfoFormProps> = (args) => <UserInfoForm {...args} />;

export const Default = Template.bind({});
