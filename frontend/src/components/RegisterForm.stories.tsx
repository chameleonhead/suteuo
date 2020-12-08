import { Story, Meta } from '@storybook/react/types-6-0';

import { RegisterForm, RegisterFormProps } from './RegisterForm';

export default {
    title: 'components/RegisterForm',
    component: RegisterForm,
} as Meta;

const Template: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />;

export const Default = Template.bind({});
