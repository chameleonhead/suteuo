import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { ForgotPassword, ForgotPasswordProps } from './ForgotPassword';

export default {
    title: 'pages/ForgotPassword',
    component: ForgotPassword,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<ForgotPasswordProps> = (args) => <ForgotPassword {...args} />;

export const Default = Template.bind({});
