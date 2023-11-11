import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "@/styles/globals.css";
import "@/styles/Calendar.css";
import "@/styles/Spinner.css";
import { ChakraProvider } from "@chakra-ui/react"

const MyApp: AppType = ({ Component, pageProps }) => {
  return <ChakraProvider><Component {...pageProps} /></ChakraProvider>
};

export default trpc.withTRPC(MyApp);
