import * as React from "react";
import { ApolloError, QueryResult } from "@apollo/client";

export const render = <T extends QueryResult>(
  result: T,
  uis: {
    Loading: React.FC;
    Error: React.FC<{ error: ApolloError }>;
    Data: React.FC<{ data: NonNullable<T["data"]> }>;
  }
): React.ReactElement => {
  return result.loading ? (
    <uis.Loading />
  ) : result.error ? (
    <uis.Error error={result.error} />
  ) : (
    <uis.Data data={result.data} />
  );
};
