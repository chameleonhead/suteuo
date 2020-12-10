import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { MessageRoom, MessageRoomProps } from './MessageRoom';

export default {
    title: 'pages/MessageRoom',
    component: MessageRoom,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<MessageRoomProps> = (args) => <MessageRoom {...args} />;

export const Default = Template.bind({});
Default.args = {
    match: {
        params: {
            id: '1'
        }
    } as any,
    user: {
        id: '1'
    } as any

}
