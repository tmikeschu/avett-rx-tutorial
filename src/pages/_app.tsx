import "../styles/globals.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import mockServiceWorker from "mocks";
import { AppProps } from "next/app";

import { ApolloProvider } from "lib/apollo-client";
import theme from "styles/theme";

if (process.env.MOCK_SERVICE_WORKER === "1") {
  mockServiceWorker();
}

const AvettRxApp: React.FC<AppProps> = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider initialState={initialApolloState || {}}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default AvettRxApp;
