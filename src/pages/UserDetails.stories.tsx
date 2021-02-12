import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import UserDetails from "./UserDetails";
import { withContext } from "./utils";

export default {
  title: "pages/UserDetails",
  component: UserDetails,
  decorators: [withContext()],
} as Meta;

const Template: Story<Parameters<typeof UserDetails>[0]> = (args) => (
  <UserDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userId: '22dab8d7-1476-48d7-91be-5218edbd5d19',
};
