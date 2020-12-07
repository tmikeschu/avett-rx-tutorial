import * as React from "react";
import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newGetTagsData,
  newTag,
} from "api";
import { server } from "mocks/server";
import * as utils from "test";

import Pharmacy from "..";

const { user } = utils;

describe("<Pharmacy />", () => {
  it("allows a user to view songs based on a tag", async () => {
    server.use(
      graphql.query<GetTagsQuery, GetTagsQueryVariables>(
        "GetTags",
        (_req, res, ctx) => {
          return res(
            ctx.data(
              newGetTagsData({
                allTags: {
                  data: [newTag({ name: "😭" })],
                },
              })
            )
          );
        }
      )
    );

    const {
      queryByText,
      getByRole,
      findByRole,
      findByTestId,
      findByText,
      getByText,
      getByTestId,
      queryByTestId,
    } = utils.render(<Pharmacy />);

    expect(getByTestId("loading")).toBeInTheDocument();
    expect(await findByText(/select.*feeling/i));
    expect(queryByTestId("loading")).toBeNull();
    expect(getByRole("heading", { name: /pharmacy/i })).toBeInTheDocument();

    expect(queryByText(/sanguine/i)).toBeNull();
    const btn = getByText("😭");
    user.click(btn);
    expect(await findByTestId("loading")).toBeInTheDocument();
    expect(
      await findByRole("heading", { name: /sanguine/i })
    ).toBeInTheDocument();
    expect(queryByTestId("loading")).toBeNull();
    expect(getByText(/make me sanguine/i)).toBeInTheDocument();
    expect(getByText(/from: the gleam/i)).toBeInTheDocument();
  });
});
