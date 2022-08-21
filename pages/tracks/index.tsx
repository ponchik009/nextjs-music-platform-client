import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = React.useState(null);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h1>error</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Список треков - музыкальная платформа"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField value={query} onChange={search} fullWidth />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    return {
      props: {},
    };
  }
);
