import { Story, Meta } from '@storybook/react/types-6-0';

import { Home, HomeProps } from './Home';

export default {
    title: 'pages/Home',
    component: Home,
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Default = Template.bind({});
