import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { UserDetails, UserDetailsProps } from './UserDetails';

export default {
    title: 'pages/UserDetails',
    component: UserDetails,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<UserDetailsProps> = (args) => <UserDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
    match: {
        params: {
            id: '1'
        }
    } as any
}
