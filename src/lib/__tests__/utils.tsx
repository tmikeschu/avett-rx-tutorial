import * as React from "react";

import { nl2br } from "lib/utils";

describe("nl2br", () => {
  it("replaces newlines with break tags", () => {
    const input = "hello\nyou";
    const actual = nl2br(input);
    const expected = ["hello", <br key={1} />, "you"];
    expect(actual).toEqual(expected);
  });
});
