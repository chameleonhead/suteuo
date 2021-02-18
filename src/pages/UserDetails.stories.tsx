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
      userId: "139ad4d1-dfd4-4dd4-9974-6ef7baaa3e83",
    },
  } as any,
};
