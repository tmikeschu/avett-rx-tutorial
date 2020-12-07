import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { useSongsForTagQuery } from "api";

import Pharmacy, { SongsData } from "./";

export default {
  title: "Features/Pharmacy",
  component: Pharmacy,
} as Meta;

const Template: Story = () => {
  return <Pharmacy />;
};

export const HappyPath = Template.bind({});

const SongsDataTemplate: Story<{ data: SongsData }> = (args) => {
  const { data } = useSongsForTagQuery({ variables: { tagID: "tag" } });
  return data?.songsForTag ? <SongsData {...args} data={data} /> : null;
};

export const Song = SongsDataTemplate.bind({});
Song.decorators = [(Story) => <Story />];
