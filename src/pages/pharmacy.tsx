import * as React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Pharmacy: NextPage = () => {
  const { back } = useRouter();
  return (
    <Flex
      minHeight="100vh"
      px="2"
      direction="column"
      justify="center"
      align="center"
    >
      <Head>
        <title>Avett Rx: Pharmacy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IconButton
        aria-label="back"
        icon={<ArrowBackIcon />}
        onClick={() => {
          back();
        }}
      />

      <Heading>Pharmacy</Heading>
    </Flex>
  );
};

export default Pharmacy;
