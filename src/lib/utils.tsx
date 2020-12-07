import * as React from "react";

const newlineRegex = /(\r\n|\r|\n)/g;
export const nl2br = (str: string): Array<string | React.ReactElement> => {
  return str.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return React.createElement("br", { key: index });
    }
    return line;
  });
};
