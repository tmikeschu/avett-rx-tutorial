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

const Pharmacy: React.FC = () => {
  const { back } = useRouter();
  const result = useGetTagsQuery();
  return (
    <Flex>
      <IconButton
        aria-label="back"
        icon={<ArrowBackIcon />}
        onClick={() => {
          back();
        }}
      />
      <Heading>Pharmacy</Heading>
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
    <Flex>
      <Text>Select a feeling</Text>
      <List>
        {data.allTags.data.map((tag) => (
          <ListItem key={tag._id}>
            <Button
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

type SongsData = NonNullable<SongsForTagQueryResult["data"]>;
const SongsData: React.FC<{ data: SongsData }> = ({ data }) => {
  const song = data.songsForTag.data[0];

  return (
    <Flex>
      <Heading>{song.title}</Heading>
      <Text>From: {song.album.title}</Text>
      <Text>{song.lyrics}</Text>
    </Flex>
  );
};

export default Pharmacy;
