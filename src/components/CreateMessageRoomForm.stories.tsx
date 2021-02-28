import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { CreateMessageRoomForm, CreateMessageRoomFormProps } from "./CreateMessageRoomForm";

export default {
  title: "components/CreateMessageRoomForm",
  component: CreateMessageRoomForm,
} as Meta;

const Template: Story<CreateMessageRoomFormProps> = (args) => <CreateMessageRoomForm {...args} />;

export const Default = Template.bind({});
