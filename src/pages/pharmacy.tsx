import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import Pharmacy from "features/pharmacy";

const PharmacyPage: NextPage = () => {
  return (
    <Flex minHeight="100vh" p="4" direction="column" maxWidth="lg" mx="auto">
      <Head>
        <title>Avett Rx: Pharmacy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Pharmacy />
    </Flex>
  );
};

export default PharmacyPage;
