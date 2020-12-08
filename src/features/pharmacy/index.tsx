import * as React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
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
import EmptyVoid from "components/drawings/empty-void";
import Heartbroken from "components/drawings/heartbroken";
import { render } from "lib/render-query";
import { nl2br } from "lib/utils";

const Pharmacy: React.FC = () => {
  const { back } = useRouter();
  const result = useGetTagsQuery();
  return (
    <Flex direction="column" alignItems="flex-start">
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
const Failed: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text color="red.600" backgroundColor="red.100" px={4} py={2} rounded="md">
      Oh no! Something went wrong fetching tags.
    </Text>
  );
};

type Data = NonNullable<GetTagsQueryResult["data"]>;
const Data: React.FC<{ data: Data }> = ({ data }) => {
  const [selectedTagId, setSelectedTagId] = React.useState("");
  const [getSongsForTag, songsResult] = useSongsForTagLazyQuery();

  React.useEffect(() => {
    if (selectedTagId.length > 0) {
      getSongsForTag({
        variables: {
          tagID: selectedTagId,
        },
      });
    }
  }, [selectedTagId, getSongsForTag]);

  if (data.allTags.data.length === 0) {
    return (
      <Flex direction="column" alignItems="flex-start" width="100%">
        <Text
          mb={4}
          color="yellow.600"
          backgroundColor="yellow.100"
          px={4}
          py={2}
          rounded="md"
        >
          Oh snap! We don&apos;t have any tags to show yet.
        </Text>
        <Box color="purple.300" height={300} width={300} maxWidth="100%">
          <EmptyVoid />
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" width="100%">
      <Text>Select a feeling</Text>
      <List
        mb={4}
        display="flex"
        overflowX="auto"
        maxWidth="100%"
        py={4}
        px={2}
      >
        {data.allTags.data.map((tag) => (
          <ListItem key={tag._id} _notLast={{ mr: 4 }}>
            <Button
              colorScheme="purple"
              variant="outline"
              borderColor={
                selectedTagId === tag._id ? "purple.600" : "purple.200"
              }
              onClick={() => {
                setSelectedTagId(tag._id);
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
            Data: SongData,
          })
        : null}
    </Flex>
  );
};

export type SongData = NonNullable<SongsForTagQueryResult["data"]>;
export const SongData: React.FC<{ data: SongData }> = ({ data }) => {
  const song = data.songsForTag.data[0];
  if (!song) {
    return (
      <Flex direction="column" alignItems="flex-start" width="100%">
        <Text
          mb={4}
          color="yellow.600"
          backgroundColor="yellow.100"
          px={4}
          py={2}
          rounded="md"
        >
          Oh snap! We don&apos;t have any songs for that tag yet.
        </Text>
        <Box color="purple.300" height={300} width={300} maxWidth="100%">
          <Heartbroken />
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <Text as="h3" fontWeight="bold" lineHeight="shorter" color="purple.700">
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

export type SongError = NonNullable<SongsForTagQueryResult["error"]>;

export default Pharmacy;
