import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { RequestCommentForm, RequestCommentFormProps } from './RequestCommentForm';

export default {
    title: 'components/RequestCommentForm',
    component: RequestCommentForm,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestCommentFormProps> = (args) => <RequestCommentForm {...args} />;

export const Default = Template.bind({});
Default.args = {}
