import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";
import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newGetTagsData,
  newSongsForTagResponse,
  newTag,
  useSongsForTagQuery,
} from "api";
import { worker } from "mocks/browser";

import Pharmacy, { SongData } from "./";

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

export const NoSongs = SongsDataTemplate.bind({});
NoSongs.decorators = [(Story) => <Story />];
NoSongs.args = {
  data: {
    songsForTag: {
      data: [],
    },
  },
};
