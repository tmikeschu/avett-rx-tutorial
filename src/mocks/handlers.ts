import { graphql } from "msw";

import {
  GetTagsQuery,
  GetTagsQueryVariables,
  newAlbum,
  newGetTagsData,
  newSong,
  newSongsForTagData,
  newTag,
  SongsForTagQuery,
  SongsForTagQueryVariables,
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
  graphql.query<SongsForTagQuery, SongsForTagQueryVariables>(
    "SongsForTag",
    (_req, res, ctx) => {
      return res(
        ctx.data(
          newSongsForTagData({
            songsForTag: {
              data: [
                newSong({
                  title: "Sanguine",
                  lyrics: "Make me sanguine.\nHelp me genuinely.",
                  album: newAlbum({ title: "The Gleam" }),
                }),
              ],
            },
          })
        )
      );
    }
  ),
];
