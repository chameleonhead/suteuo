import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';
import { findRequesById } from '../data';

import { RequestCommentList, RequestCommentListProps } from './RequestCommentList';

export default {
    title: 'components/RequestCommentList',
    component: RequestCommentList,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestCommentListProps> = (args) => <RequestCommentList {...args} />;

export const Default = Template.bind({});
Default.args = {
    comments: findRequesById('1')?.comments
}

export const withUser = Template.bind({});
withUser.args = {
    comments: findRequesById('1')?.comments,
    user: {
        id: '1'
    } as any
}

export const commentOwner = Template.bind({});
commentOwner.args = {
    comments: findRequesById('1')?.comments,
    user: {
        id: '2'
    } as any
}