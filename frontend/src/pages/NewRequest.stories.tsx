import { Story, Meta } from '@storybook/react/types-6-0';

import { NewRequest, NewRequestProps } from './NewRequest';

export default {
    title: 'pages/NewRequest',
    component: NewRequest,
} as Meta;

const Template: Story<NewRequestProps> = (args) => <NewRequest {...args} />;

export const Default = Template.bind({});
