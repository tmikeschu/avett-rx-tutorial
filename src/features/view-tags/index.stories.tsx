import * as React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import { worker } from "mocks/browser";
import { graphql } from "msw";

import { GetTagsQuery, GetTagsQueryVariables, newGetTagsData } from "api";

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

export const WithData: Story = Template.bind({});
WithData.decorators = [
  (story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.data(
              newGetTagsData({
                allTags: {
                  data: [
                    { name: "🙊", _id: "1" },
                    { name: "🙈", _id: "2" },
                    { name: "🙉", _id: "3" },
                  ],
                },
              })
            )
          );
        }
      )
    );

    return story();
  },
];

export const Loading: Story = Template.bind({});
Loading.decorators = [
  (story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          // 1 hour delay to view the loading state
          return res(ctx.delay(1000 * 60 * 60), ctx.data(newGetTagsData({})));
        }
      )
    );
    return story();
  },
];

export const EmptyState: Story = Template.bind({});
EmptyState.decorators = [
  (story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.data(
              newGetTagsData({
                allTags: {
                  data: [],
                },
              })
            )
          );
        }
      )
    );

    return story();
  },
];

export const Failed: Story = Template.bind({});
Failed.decorators = [
  (story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.errors([{ message: "Unable to fetch" }]));
        }
      )
    );
    return story();
  },
];
