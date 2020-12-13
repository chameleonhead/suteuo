import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { ResetPassword, ResetPasswordProps } from './ResetPassword';

export default {
    title: 'pages/ResetPassword',
    component: ResetPassword,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<ResetPasswordProps> = (args) => <ResetPassword {...args} />;

export const Default = Template.bind({});
