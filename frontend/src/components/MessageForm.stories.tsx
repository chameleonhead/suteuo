import { Story, Meta } from '@storybook/react/types-6-0';

import { MessageForm, MessageFormProps } from './MessageForm';

export default {
    title: 'components/MessageForm',
    component: MessageForm,
} as Meta;

const Template: Story<MessageFormProps> = (args) => <MessageForm {...args} />;

export const Default = Template.bind({});
