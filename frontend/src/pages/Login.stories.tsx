import { Story, Meta } from '@storybook/react/types-6-0';

import { Login, LoginProps } from './Login';

export default {
    title: 'pages/Login',
    component: Login,
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Default = Template.bind({});
