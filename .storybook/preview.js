import "../src/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/theme";
import { worker } from "../src/mocks/browser";
import { ApolloProvider } from "../src/test/apollo-provider";

worker.start();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (story) => (
    <ChakraProvider theme={theme}>
      <ApolloProvider>{story()}</ApolloProvider>
    </ChakraProvider>
  ),
];
