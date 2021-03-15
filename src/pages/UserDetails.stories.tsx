import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { UserDetails, UserDetailsProps } from "./UserDetails";
import { withContext } from "./utils";

export default {
  title: "pages/UserDetails",
  component: UserDetails,
  decorators: [withContext()],
} as Meta;

const Template: Story<UserDetailsProps> = (args) => <UserDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  match: {
    params: {
      userId: "user-1",
    },
  } as any,
  details: {
    area: "Area",
    id: "user-1",
    email: "user@email.com",
    avatarUrl: null,
    name: "User Name",
    rating: 1,
  },
};
