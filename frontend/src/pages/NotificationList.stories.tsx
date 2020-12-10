import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { NotificationList, NotificationListProps } from './NotificationList';

export default {
    title: 'pages/NotificationList',
    component: NotificationList,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<NotificationListProps> = (args) => <NotificationList {...args} />;

export const Default = Template.bind({});