import * as React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

import ViewTags from "features/view-tags";

const Home: NextPage = () => {
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
        <Heading
          m="0"
          lineHeight="shorter"
          fontSize={["4xl", "6xl"]}
          textAlign="center"
        >
          Welcome to Avett Rx
        </Heading>

        <ViewTags />

        <NextLink href="/pharmacy">
          <Link>Get a prescription</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Home;
