import * as React from "react";
import { ApolloError, QueryResult } from "@apollo/client";

const isEmpty = (data: NonNullable<QueryResult["data"]>): boolean => {
  const dataValue = data[Object.keys(data)[0]];
  return (
    dataValue === null || (Array.isArray(dataValue) && dataValue.length === 0)
  );
};

export const renderResult = <T extends QueryResult>(
  result: T,
  options: {
    isEmpty?: (data: NonNullable<T["data"]>) => boolean;
    Loading: React.FC;
    Failure: React.FC<{ error: ApolloError }>;
    Empty: React.FC;
    Success: React.FC<{ data: NonNullable<T["data"]> }>;
  }
): React.ReactElement => {
  return result.loading ? (
    <options.Loading />
  ) : result.error ? (
    <options.Failure error={result.error} />
  ) : (options.isEmpty ?? isEmpty)(result.data) ? (
    <options.Empty />
  ) : (
    <options.Success data={result.data} />
  );
};
