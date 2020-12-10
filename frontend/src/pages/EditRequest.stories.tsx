import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { EditRequest, EditRequestProps } from './EditRequest';

export default {
    title: 'pages/EditRequest',
    component: EditRequest,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<EditRequestProps> = (args) => <EditRequest {...args} />;

export const Default = Template.bind({});
Default.args = {
    match: {
        params: {
            id: '1'
        }
    } as any
}