import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Messaging from "./Messaging";
import { withContext } from "./utils";

export default {
  title: "pages/Messaging",
  component: Messaging,
} as Meta;

const Template: Story = (args) => <Messaging {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
