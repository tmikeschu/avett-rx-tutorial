import "../styles/globals.css";

import * as React from "react";
import { AppProps } from "next/app";

import { ApolloProvider } from "lib/apollo-client";

const AvettRxApp: React.FC<AppProps> = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}) => {
  return (
    <ApolloProvider initialState={initialApolloState || {}}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default AvettRxApp;
