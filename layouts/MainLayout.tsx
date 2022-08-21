import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Музыкальная платформа"}</title>
        <meta
          name="description"
          content={
            "Музыкальная площадка для gangsta реперов." +
            (description ? " " + description : "")
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={
            keywords ||
            "Музыка, треки, артисты, музыкальная площадка, долбит по ушам, реп"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container sx={{ mt: "90px" }}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
