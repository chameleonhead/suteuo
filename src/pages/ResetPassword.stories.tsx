import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import ResetPassword from "./ResetPassword";
import { withContext } from "./utils";

export default {
  title: "pages/ResetPassword",
  component: ResetPassword,
} as Meta;

const Template: Story = (args) => <ResetPassword {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
