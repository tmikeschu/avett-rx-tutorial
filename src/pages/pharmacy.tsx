import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import Pharmacy from "features/pharmacy";

const PharmacyPage: NextPage = () => {
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

      <Pharmacy />
    </Flex>
  );
};

export default PharmacyPage;
