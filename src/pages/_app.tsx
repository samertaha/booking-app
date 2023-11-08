import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "@/styles/globals.css";
import "@/styles/Calendar.css";
import "@/styles/Spinner.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
