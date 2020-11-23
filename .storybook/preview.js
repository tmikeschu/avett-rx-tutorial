import "../src/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (story) => <ChakraProvider theme={theme}>{story()}</ChakraProvider>,
];
