import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Signup from "./Signup";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import configureStore from "../redux/configureStore";

Amplify.configure(awsExports);

export default {
  title: "components/Signup",
  component: Signup,
} as Meta;

const Template: Story = (args) => <Signup {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => <Provider store={configureStore()}>{story()}</Provider>,
];
