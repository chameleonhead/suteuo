import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ConfirmCodeForm, ConfirmCodeFormProps } from "./ConfirmCodeForm";

export default {
  title: "components/ConfirmCodeForm",
  component: ConfirmCodeForm,
} as Meta;

const Template: Story<ConfirmCodeFormProps> = (args) => <ConfirmCodeForm {...args} />;

export const Default = Template.bind({});
