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
  authState: {
    state: "INITIALIZING",
    user: undefined,
    credential: undefined,
  },
};

export const WaitingConfirmCode = Template.bind({});
WaitingConfirmCode.args = {
  ...Initializing.args,
  authState: {
    ...Initializing.args.authState!,
    state: "WAITING_CONFIRM_CODE",
  },
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  ...Initializing.args,
  authState: {
    ...Initializing.args.authState!,
    state: "NOT_LOGGED_IN",
  } as any,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authState: {
    state: "LOGGED_IN",
    user: {
      username: "username",
      displayName: "Display Name",
    } as any,
    credential: undefined,
  },
};
