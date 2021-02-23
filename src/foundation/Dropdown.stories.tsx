import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Dropdown, DropdownProps } from "./Dropdown";

export default {
  title: "foundation/Dropdown",
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Open = Template.bind({});
Open.args = {
  open: true,
  trigger: <div className="bg-gray-200">Trigger</div>,
  children: "Children",
};

export const Closed = Template.bind({});
Closed.args = {
  ...Open.args,
  open: false,
};
