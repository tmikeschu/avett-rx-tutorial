import * as React from "react";
import {
  ApolloClient,
  ApolloProvider as AP,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { Any } from "./types";

type Cache = Record<string, Any>;
export type InitialState = Record<string, Any>;

let apolloClient: ApolloClient<Cache>;

function createApolloClient(): ApolloClient<Cache> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_URI,
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_VISITOR_KEY}`,
      },
    }),
    cache: new InMemoryCache({}),
  });
}

export function initializeApollo(
  initialState: InitialState = {}
): ApolloClient<Cache> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: InitialState): ApolloClient<Cache> {
  const store = React.useMemo(() => initializeApollo(initialState), [
    initialState,
  ]);

  return store;
}

export const ApolloProvider: React.FC<{
  initialState?: InitialState;
}> = ({ children, initialState = {} }) => {
  const client = useApollo(initialState);
  return <AP client={client}>{children}</AP>;
};
