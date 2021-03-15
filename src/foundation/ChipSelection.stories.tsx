import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ChipSelection, ChipSelectionProps } from "./ChipSelection";

export default {
  title: "foundation/ChipSelection",
  component: ChipSelection,
} as Meta;

const Template: Story<ChipSelectionProps> = (args) => (
  <ChipSelection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "チップ",
  inputValue: "",
  selectedData: [{ value: "value", text: "text" }],
};

export const withSelection = Template.bind({});
withSelection.args = {
  placeholder: "チップ",
  inputValue: "text",
  selectedData: [{ value: "value", text: "text" }],
  selection: [{ value: "value", text: "text" }],
};

export const withSelections = Template.bind({});
withSelections.args = {
  placeholder: "チップ",
  inputValue: "text",
  selectedData: [{ value: "value", text: "text" }],
  selection: [
    { value: "value1", text: "text1" },
    { value: "value2", text: "text2" },
  ],
};


export const withLongChipText = Template.bind({});
withLongChipText.args = {
  placeholder: "チップ",
  inputValue: "text",
  selectedData: [{ value: "value", text: "long long long long long long long long long long long long long long long long long long long long long long long long long long long text" }],
};
