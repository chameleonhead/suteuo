import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { NewRequestForm, NewRequestFormProps } from './NewRequestForm';

export default {
    title: 'components/NewRequestForm',
    component: NewRequestForm,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<NewRequestFormProps> = (args) => <NewRequestForm {...args} />;

export const Default = Template.bind({});

export const withDefaultArea = Template.bind({});
withDefaultArea.args = {
    defaultArea: '愛知県'
}