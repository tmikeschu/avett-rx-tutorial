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
  Skeleton,
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
import { renderResult } from "lib/render-result";
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

      {renderResult(result, {
        Loading,
        Failure,
        Success,
        Empty,
        isEmpty: (data) => !data.allTags.data.some(Boolean),
      })}
    </Flex>
  );
};

const Loading: React.FC = () => {
  return <Spinner color="purple.500" data-testid="loading" />;
};

type FetchError = NonNullable<GetTagsQueryResult["error"]>;
const Failure: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text color="red.600" backgroundColor="red.100" px={4} py={2} rounded="md">
      Oh no! Something went wrong fetching tags.
    </Text>
  );
};

const Empty = () => {
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
};

type Data = NonNullable<GetTagsQueryResult["data"]>;
const Success: React.FC<{ data: Data }> = ({ data }) => {
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
        {data.allTags.data.map((tag) =>
          tag ? (
            <ListItem key={tag._id} _notLast={{ mr: 4 }}>
              <Button
                isLoading={songsResult.loading && selectedTagId === tag._id}
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
          ) : null
        )}
      </List>

      {songsResult.called === true
        ? renderResult(songsResult, {
            Loading: SongLoading,
            Failure: SongFailure,
            Success: SongData,
            Empty: SongEmpty,
            isEmpty: (data) => !data.songsForTag.data.some(Boolean),
          })
        : null}
    </Flex>
  );
};

export const SongLoading: React.FC = () => {
  return (
    <Flex direction="column" align="flex-start" data-testid="loading">
      <Skeleton height="3" width="16" mb="1" />
      <Skeleton height="2" width="32" mb="2" />

      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} height="2" width="40" _notLast={{ mb: 1 }} />
      ))}
    </Flex>
  );
};

export const SongEmpty: React.FC = () => {
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
};

export type SongData = NonNullable<SongsForTagQueryResult["data"]>;
export const SongData: React.FC<{ data: SongData }> = ({ data }) => {
  const song = data.songsForTag.data[0];
  return song ? (
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
  ) : null;
};

export type SongError = NonNullable<SongsForTagQueryResult["error"]>;
export const SongFailure: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text color="red.600" backgroundColor="red.100" px={4} py={2} rounded="md">
      Oh no! Something went wrong fetching tags.
    </Text>
  );
};

export default Pharmacy;
