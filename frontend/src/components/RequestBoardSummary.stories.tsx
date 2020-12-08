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
Default.args = {}
