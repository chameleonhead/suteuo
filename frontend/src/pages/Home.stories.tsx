import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { Home, HomeProps } from './Home';

export default {
    title: 'pages/Home',
    component: Home,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Default = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {
        id: '1'
    } as any
}
