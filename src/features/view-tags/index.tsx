import * as React from "react";
import { List, ListItem, Spinner, Text } from "@chakra-ui/react";

import { GetTagsQueryResult, useGetTagsQuery } from "api";
import { render } from "lib/render-query";

const ViewTags: React.FC = () => {
  const result = useGetTagsQuery();
  return render(result, {
    Loading,
    Error: Failed,
    Data,
  });
};

export default ViewTags;

const Loading: React.FC = () => {
  return <Spinner color="purple.500" data-testid="loading" />;
};

type Data = NonNullable<GetTagsQueryResult["data"]>;
const Data: React.FC<{ data: Data }> = ({ data }) => {
  const tags = data.allTags ? data.allTags.data : [];
  if (tags.length === 0) {
    return (
      <Text
        color="yellow.600"
        backgroundColor="yellow.100"
        px={4}
        py={2}
        rounded="md"
      >
        Oh snap! We don&apos;t have any tags to show yet.
      </Text>
    );
  }
  return (
    <List display="flex" aria-label="tags list">
      {tags.map((tag) =>
        tag ? (
          <ListItem key={tag._id} fontSize="4xl" _notLast={{ mr: 4 }}>
            {tag.name}
          </ListItem>
        ) : null
      )}
    </List>
  );
};

type FetchError = NonNullable<GetTagsQueryResult["error"]>;
const Failed: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text color="red.600" backgroundColor="red.100" px={4} py={2} rounded="md">
      Oh no! Something went wrong fetching that data.
    </Text>
  );
};
