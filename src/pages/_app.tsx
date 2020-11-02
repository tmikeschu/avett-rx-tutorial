import "../styles/globals.css";

import * as React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
