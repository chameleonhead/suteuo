import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Meta, Story } from "@storybook/react/types-6-0";
import { NavMenu, NavMenuProps } from "./NavMenu";

export default {
  title: "components/NavMenu",
  component: NavMenu,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<NavMenuProps> = (args) => <NavMenu {...args} />;

export const Initializing = Template.bind({});
Initializing.args = {
  auth: {
    state: "INITIALIZING",
    user: undefined,
  },
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  ...Initializing.args,
  auth: {
    ...Initializing.args.auth!,
    state: "NOT_LOGGED_IN",
  } as any,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  auth: {
    state: "LOGGED_IN",
    user: {
      id: "id",
      username: "username",
      nickname: "Display Name",
    } as any,
  },
};
