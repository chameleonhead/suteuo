import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { NewRequest, NewRequestProps } from './NewRequest';

export default {
    title: 'pages/NewRequest',
    component: NewRequest,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<NewRequestProps> = (args) => <NewRequest {...args} />;

export const Default = Template.bind({});
Default.args = {
    user: {
        area: '愛知県'
    } as any
}