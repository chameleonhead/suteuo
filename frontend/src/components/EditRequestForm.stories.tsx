import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { EditRequestForm, EditRequestFormProps } from './EditRequestForm';

export default {
    title: 'components/EditRequestForm',
    component: EditRequestForm,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<EditRequestFormProps> = (args) => <EditRequestForm {...args} />;

export const Default = Template.bind({});

export const withDefaultArea = Template.bind({});
withDefaultArea.args = {
    initialValue: {
        id: '1',
        area: '愛知県',
        detailedText: 'Detailed Text',
        title: 'Title'
    }
}