import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newGetTagsData,
  newTag,
  useSongsForTagQuery,
} from "api";
import { worker } from "mocks/browser";

import Pharmacy, {
  SongData,
  SongEmpty,
  SongFailure as SongFailureComponent,
  SongLoading as SongLoadingComponent,
} from "./";

export default {
  title: "Features/Pharmacy",
  component: Pharmacy,
} as Meta;

const Template: Story = () => {
  return <Pharmacy />;
};

const TAGS = "abcdefjhijklmnopqr".split("");

export const HappyPath = Template.bind({});
HappyPath.decorators = [
  (Story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.data(
              newGetTagsData({
                allTags: { data: TAGS.map((tag) => newTag({ name: tag })) },
              })
            )
          );
        }
      )
    );
    return <Story />;
  },
];

export const ErrorState = Template.bind({});
ErrorState.decorators = [
  (Story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.errors([{ message: "Unable to fetch" }]));
        }
      )
    );
    return <Story />;
  },
];

export const EmptyState = Template.bind({});
EmptyState.decorators = [
  (Story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.data(newGetTagsData({ allTags: { data: [] } })));
        }
      )
    );
    return <Story />;
  },
];

export const LoadingState = Template.bind({});
LoadingState.decorators = [
  (Story) => {
    worker.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.delay(60 * 1000 * 60),
            ctx.data(newGetTagsData({ allTags: { data: [] } }))
          );
        }
      )
    );
    return <Story />;
  },
];

const SongsDataTemplate: Story<{ data: SongData }> = (args) => {
  const { data } = useSongsForTagQuery({ variables: { tagID: "tag" } });
  return data?.songsForTag ? <SongData data={data} {...args} /> : null;
};

export const Song = SongsDataTemplate.bind({});
Song.decorators = [(Story) => <Story />];

const NoSongTemplate: Story = () => <SongEmpty />;
export const NoSong = NoSongTemplate.bind({});

const SongLoadingTemplate: Story = () => <SongLoadingComponent />;
export const SongLoading = SongLoadingTemplate.bind({});

const SongFailureTemplate: Story = () => (
  <SongFailureComponent
    error={{
      message: "unable to fetch",
      graphQLErrors: [],
      networkError: new Error(),
      name: "",
      extraInfo: {},
    }}
  />
);
export const SongFailure = SongFailureTemplate.bind({});
SongFailure.decorators = [
  (Story) => (
    <Flex direction="column" align="flex-start">
      <Story />
    </Flex>
  ),
];
