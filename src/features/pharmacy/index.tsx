import * as React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import {
  GetTagsQueryResult,
  SongsForTagQueryResult,
  useGetTagsQuery,
  useSongsForTagLazyQuery,
} from "api";
import { render } from "lib/render-query";
import { nl2br } from "lib/utils";

const Pharmacy: React.FC = () => {
  const { back } = useRouter();
  const result = useGetTagsQuery();
  return (
    <Flex direction="column">
      <IconButton
        mb={8}
        alignSelf="flex-start"
        aria-label="back"
        icon={<ArrowBackIcon />}
        onClick={() => {
          back();
        }}
      />

      <Heading mb={4}>Pharmacy</Heading>

      {render(result, { Loading, Error: Failed, Data })}
    </Flex>
  );
};

const Loading: React.FC = () => {
  return <Spinner color="purple.500" data-testid="loading" />;
};

type FetchError = NonNullable<GetTagsQueryResult["error"]>;
const Failed: React.FC<{ error: FetchError }> = () => {
  return null;
};

type Data = NonNullable<GetTagsQueryResult["data"]>;
const Data: React.FC<{ data: Data }> = ({ data }) => {
  const [getSongsForTag, songsResult] = useSongsForTagLazyQuery();

  return (
    <Flex direction="column">
      <Text mb={2}>Select a feeling</Text>
      <List mb={4}>
        {data.allTags.data.map((tag) => (
          <ListItem key={tag._id}>
            <Button
              colorScheme="purple"
              variant="outline"
              onClick={() => {
                getSongsForTag({
                  variables: {
                    tagID: tag._id,
                  },
                });
              }}
            >
              {tag.name}
            </Button>
          </ListItem>
        ))}
      </List>

      {songsResult.called === true
        ? render(songsResult, {
            Loading,
            Error: Failed,
            Data: SongsData,
          })
        : null}
    </Flex>
  );
};

export type SongsData = NonNullable<SongsForTagQueryResult["data"]>;
export const SongsData: React.FC<{ data: SongsData }> = ({ data }) => {
  const song = data.songsForTag.data[0];

  return (
    <Flex direction="column">
      <Text as="h3" fontWeight="bold" lineHeight="1.2" color="purple.700">
        {song.title}
      </Text>
      <Text color="gray.500" fontSize="sm">
        From: {song.album.title}
      </Text>
      <Text mt={2} fontStyle="italic" color="purp">
        {nl2br(song.lyrics)}
      </Text>
    </Flex>
  );
};

export default Pharmacy;
