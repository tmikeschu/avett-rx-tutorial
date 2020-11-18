import * as React from "react";
import { Flex, Heading, List, ListItem, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import { useGetTagsQuery } from "api";

const Home: NextPage = () => {
  const { data, loading } = useGetTagsQuery();
  const tags = data && data.allTags ? data.allTags.data : [];

  return (
    <Flex
      minHeight="100vh"
      px="2"
      direction="column"
      justify="center"
      align="center"
    >
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex py="20" flex="1" direction="column" justify="center" align="center">
        <Heading m="0" lineHeight="shorter" fontSize="6xl" textAlign="center">
          Welcome to Avett Rx
        </Heading>

        {loading ? (
          <Spinner />
        ) : (
          <List display="flex">
            {tags.map((tag) =>
              tag ? (
                <ListItem key={tag._id} fontSize="4xl" _notLast={{ mr: 4 }}>
                  {tag.name}
                </ListItem>
              ) : null
            )}
          </List>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
