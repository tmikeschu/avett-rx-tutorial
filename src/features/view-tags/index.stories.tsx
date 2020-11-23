import * as React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { Flex, Heading } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { GetTagsDocument } from "api";

import ViewTags from ".";

export default {
  title: "Features/View Tags",
  component: ViewTags,
  decorators: [
    (story) => (
      <Flex py="20" flex="1" direction="column" justify="center" align="center">
        <Heading mb={4} fontSize="6xl">
          Avett Rx
        </Heading>
        {story()}
      </Flex>
    ),
  ],
} as Meta;

const Template: Story = () => <ViewTags />;

export const Demo: Story = Template.bind({});
Demo.decorators = [
  (story) => (
    <MockedProvider
      addTypename={false}
      mocks={[
        {
          request: {
            query: GetTagsDocument,
          },
          result: {
            data: {
              allTags: {
                data: [
                  { name: "🙊", _id: "1" },
                  { name: "🙈", _id: "2" },
                  { name: "🙉", _id: "3" },
                ],
              },
            },
          },
        },
      ]}
    >
      {story()}
    </MockedProvider>
  ),
];

export const Loading: Story = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockedProvider addTypename={false} mocks={[]}>
      {story()}
    </MockedProvider>
  ),
];

export const Failed: Story = Template.bind({});
Failed.decorators = [
  (story) => (
    <MockedProvider
      addTypename={false}
      mocks={[
        {
          request: {
            query: GetTagsDocument,
          },
          error: new Error("unable to get tags"),
        },
      ]}
    >
      {story()}
    </MockedProvider>
  ),
];
