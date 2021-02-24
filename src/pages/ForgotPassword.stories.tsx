import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import ForgotPassword from "./ForgotPassword";
import { withContext } from "./utils";

export default {
  title: "pages/ForgotPassword",
  component: ForgotPassword,
} as Meta;

const Template: Story = (args) => <ForgotPassword {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
