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
    } as any
}

export const LoggedOut = Template.bind({});
