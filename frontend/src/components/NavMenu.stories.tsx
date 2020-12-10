import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { NavMenu, NavMenuProps } from './NavMenu';

export default {
    title: 'components/NavMenu',
    component: NavMenu,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<NavMenuProps> = (args) => <NavMenu {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {
        name: 'User Name'
    } as any,
    notificationCount: 0,
    messageCount: 0,
    location: {
        pathname: '/'
    } as any,
}

export const LoggedInAndMessageCount = Template.bind({});
LoggedInAndMessageCount.args = {
    ...LoggedIn.args,
    messageCount: 1,
}

export const LoggedInAndNotificationCount = Template.bind({});
LoggedInAndNotificationCount.args = {
    ...LoggedIn.args,
    notificationCount: 1,
}

export const LoggedInAndRequests = Template.bind({});
LoggedInAndRequests.args = {
    ...LoggedIn.args,
    location: {
        pathname: '/requests/ddd'
    } as any,
}

export const LoggedInAndNotifications = Template.bind({});
LoggedInAndNotifications.args = {
    ...LoggedIn.args,
    location: {
        pathname: '/notifications/ddd'
    } as any,
}

export const LoggedInAndMessages = Template.bind({});
LoggedInAndMessages.args = {
    ...LoggedIn.args,
    location: {
        pathname: '/messages/ddd'
    } as any,
}

export const LoggedOut = Template.bind({});
