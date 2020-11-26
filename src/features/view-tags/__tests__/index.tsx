// src/features/view-tags/__tests__/index.tsx

import * as React from "react";
import * as utils from "test";

import { Tag, useGetTagsQuery } from "api";

import ViewTags from "..";

jest.mock("api", () => ({
  useGetTagsQuery: jest.fn(),
}));
const queryMock = useGetTagsQuery as jest.Mock;

describe("<ViewTags />", () => {
  it("shows a loading spinner while fetching data", async () => {
    queryMock.mockReturnValueOnce({
      loading: true,
    });
    const { getByTestId, container } = utils.render(<ViewTags />);
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("shows an empty state", async () => {
    queryMock.mockReturnValueOnce({
      loading: false,
      data: {
        allTags: { data: [] },
      },
    });
    const { getByText, container } = utils.render(<ViewTags />);
    expect(getByText(/don't have any tags/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("shows an error state", async () => {
    jest.spyOn(console, "error").mockImplementation();
    queryMock.mockReturnValueOnce({
      loading: false,
      error: new Error("unable to fetch"),
    });
    const { getByText, container } = utils.render(<ViewTags />);
    expect(getByText(/oh no!/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    jest.restoreAllMocks();
  });

  it("shows data after loading", async () => {
    queryMock.mockReturnValueOnce({
      loading: false,
      data: {
        allTags: {
          data: [{ name: "test tag", _id: "1" } as Tag],
        },
      },
    });
    const { queryByTestId, getByText, getByRole } = utils.render(<ViewTags />);
    expect(queryByTestId("loading")).toBeNull();
    expect(getByText(/test tag/i)).toBeInTheDocument();
    expect(getByRole("list", { name: /tags list/i })).toMatchSnapshot();
  });
});
