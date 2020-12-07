import "../src/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/theme";
import { worker } from "../src/mocks/browser";
import { ApolloProvider } from "../src/test/apollo-provider";
import RouterProvider from "../src/test/router-provider";

worker.start();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <RouterProvider>
      <ChakraProvider theme={theme}>
        <ApolloProvider>
          <Story />
        </ApolloProvider>
      </ChakraProvider>
    </RouterProvider>
  ),
];
