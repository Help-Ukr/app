import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import HeaderAppBar from "../HeaderAppBar";

type Props = {};

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Stand with Ukraine</title>
        <meta name="description" content="Centralized Donations Management" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <HeaderAppBar />
      <Box>{children}</Box>
    </>
  );
};

export default PageLayout;
