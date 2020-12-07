import { Story, Meta } from '@storybook/react/types-6-0';

import { Register, RegisterProps } from './Register';

export default {
    title: 'pages/Register',
    component: Register,
} as Meta;

const Template: Story<RegisterProps> = (args) => <Register {...args} />;

export const Default = Template.bind({});
