import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InitUser from "./InitUser";
import { withContext } from "./utils";

export default {
  title: "pages/InitUser",
  component: InitUser,
} as Meta;

const Template: Story = (args) => <InitUser {...args} />;

export const Default = Template.bind({});
Default.decorators = [withContext()];
