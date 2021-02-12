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
  match: {
    params: {
      userId: "365fb1cb-7fb5-45ea-b51c-06e7025e6b0d",
    },
  } as any,
};
