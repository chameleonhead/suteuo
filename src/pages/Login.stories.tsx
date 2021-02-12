import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Login from "./Login";
import { withContext } from "./utils";

export default {
  title: "pages/Login",
  component: Login,
} as Meta;

const Template: Story = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
