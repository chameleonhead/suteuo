import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Home from "./Home";
import { withContext } from "./utils";

export default {
  title: "pages/Home",
  component: Home,
} as Meta;

const Template: Story = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
