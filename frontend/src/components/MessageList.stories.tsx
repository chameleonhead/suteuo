import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';
import { findMessageRoomById } from '../data';

import { MessageList, MessageListProps } from './MessageList';

export default {
    title: 'components/MessageList',
    component: MessageList,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;


export const Default = Template.bind({});
Default.args = {
    messages: (findMessageRoomById('1') as any).messages,
    user: { id: '1' } as any
}
