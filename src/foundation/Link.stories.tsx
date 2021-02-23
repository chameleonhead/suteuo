import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Link, LinkProps } from "./Link";

export default {
  title: "foundation/Link",
  component: Link,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  to: "/",
  children: "Link text",
};
