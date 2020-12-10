import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { MessageRoomList, MessageRoomListProps } from './MessageRoomList';

export default {
    title: 'pages/MessageRoomList',
    component: MessageRoomList,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<MessageRoomListProps> = (args) => <MessageRoomList {...args} />;

export const Default = Template.bind({});
Default.args = {
    user: {
        id: '1'
    } as any
}
