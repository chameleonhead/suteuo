import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Modal, ModalProps } from "./Modal";

export default {
  title: "foundation/Modal",
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => (
  <div>
    <Modal {...args} />
    content
  </div>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  children: <div className="bg-white w-60 h-60 mt-60">Modal Content</div>,
};

export const Full = Template.bind({});
Full.args = {
  open: true,
  children: <div className="bg-white">Modal Content</div>,
};
