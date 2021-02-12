import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Layout, LayoutProps } from "./Layout";

export default {
  title: "components/Layout",
  component: Layout,
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
