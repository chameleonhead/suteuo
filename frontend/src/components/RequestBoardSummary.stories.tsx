import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { RequestBoardSummary, RequestBoardSummaryProps } from './RequestBoardSummary';

export default {
    title: 'components/RequestBoardSummary',
    component: RequestBoardSummary,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestBoardSummaryProps> = (args) => <RequestBoardSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
    requests: [
        {
            id: '1', 
            title: 'Test 1 Title', 
            requester: {
                id: '1',
                name: 'Requester Name'
            },
            updatedAt: '2020-12-01T18:30:10',
        }
    ]
}
