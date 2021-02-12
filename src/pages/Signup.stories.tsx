import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Signup from "./Signup";
import { withContext } from "./utils";

export default {
  title: "pages/Signup",
  component: Signup,
} as Meta;

const Template: Story = (args) => <Signup {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
