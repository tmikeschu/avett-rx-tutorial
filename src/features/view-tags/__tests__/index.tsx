import * as React from "react";
import { server } from "mocks/server";
import { graphql } from "msw";
import * as utils from "test";

import { GetTagsQuery, GetTagsQueryVariables, newGetTagsData } from "api";

import ViewTags from "..";

describe("<ViewTags />", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  it("shows a loading spinner while fetching data", async () => {
    const { getByTestId, container } = utils.render(<ViewTags />);
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("shows an empty state", async () => {
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.data(newGetTagsData({ allTags: { data: [] } })));
        }
      )
    );
    const { findByText, container, getByTestId, queryByTestId } = utils.render(
      <ViewTags />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(await findByText(/don't have any tags/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("loading")).toBeNull();
  });

  it("shows an error state", async () => {
    jest.spyOn(console, "error").mockImplementation();
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(ctx.errors([{ message: "unable to fetch" }]));
        }
      )
    );
    const { findByText, container, getByTestId, queryByTestId } = utils.render(
      <ViewTags />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(await findByText(/oh no!/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(queryByTestId("loading")).toBeNull();
    jest.restoreAllMocks();
  });

  it("shows data after loading", async () => {
    const { queryByTestId, getByTestId, getByRole, findByText } = utils.render(
      <ViewTags />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(await findByText(/test tag/i)).toBeInTheDocument();
    expect(getByRole("list", { name: /tags list/i })).toMatchSnapshot();
    expect(queryByTestId("loading")).toBeNull();
  });
});
