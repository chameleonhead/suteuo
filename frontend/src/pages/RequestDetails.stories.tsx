import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { RequestDetails, RequestDetailsProps } from './RequestDetails';

export default {
    title: 'pages/RequestDetails',
    component: RequestDetails,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestDetailsProps> = (args) => <RequestDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
    match: {
        params: {
            id: '1'
        }
    } as any,
    location: {
        hash: '#comments'
    } as any
}

export const withUser = Template.bind({});
withUser.args = {
    ...Default.args,
    user: {
        id: '2'
    } as any,
    location: {
        hash: '#private'
    } as any
}


export const withOwner = Template.bind({});
withOwner.args = {
    ...Default.args,
    user: {
        id: '1'
    } as any
}

export const closed = Template.bind({});
closed.args = {
    ...Default.args,
    match: {
        params: {
            id: '3'
        }
    } as any
}


export const closedWithOwner = Template.bind({});
closedWithOwner.args = {
    ...closed.args,
    user: {
        id: '3'
    } as any
}