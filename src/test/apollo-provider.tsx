import * as React from "react";
import {
  ApolloClient,
  ApolloProvider as AP,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import fetch from "cross-fetch";

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_URI,
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_VISITOR_KEY}`,
      },
      fetch: fetch,
    }),
    cache: new InMemoryCache({}),
  });
}

export const ApolloProvider: React.FC = ({ children }) => {
  return <AP client={createApolloClient()}>{children}</AP>;
};
