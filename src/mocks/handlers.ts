import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newGetTagsData,
  newTag,
} from "api";

export const handlers = [
  graphql.query<GetTagsQuery, GetTagsQueryVariables>(
    "GetTags",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newGetTagsData({
            allTags: {
              data: [newTag({ name: "test tag" }), null],
            },
          })
        )
      );
    }
  ),
];
