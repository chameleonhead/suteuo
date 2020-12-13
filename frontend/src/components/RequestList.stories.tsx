import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';
import { allRequests } from '../data';

import { RequestList, RequestListProps } from './RequestList';

export default {
    title: 'components/RequestList',
    component: RequestList,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestListProps> = (args) => <RequestList {...args} />;

export const Default = Template.bind({});
Default.args = {
    requests: allRequests()
}
