import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router';

import { RequestBoard, RequestBoardProps } from './RequestBoard';

export default {
    title: 'pages/RequestBoard',
    component: RequestBoard,
    decorators: [story => <MemoryRouter>{story()}</MemoryRouter>]
} as Meta;

const Template: Story<RequestBoardProps> = (args) => <RequestBoard {...args} />;

export const Default = Template.bind({});
