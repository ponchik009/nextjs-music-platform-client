import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";

import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = React.useState<ITrack>(serverTrack);
  const router = useRouter();

  const state = useTypedSelector((state) => state.player);

  const username = useInput("");
  const text = useInput("");

  console.log(state);

  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={"Музыкальная платформа - " + track.name + " - " + track.artist}
      keywords={"Музыка, артисты, " + track.name + ", " + track.artist}
    >
      <Button
        variant="outlined"
        sx={{ fontSize: "32px", mb: "16px" }}
        onClick={() => router.push("/tracks")}
      >
        К списку
      </Button>
      <Grid container alignItems="center">
        <img
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
          style={{ borderRadius: 8 }}
        ></img>
        <div style={{ marginLeft: "16px" }}>
          <h1>Название трека: {track.name}</h1>
          <h1>Исполнитель: {track.artist}</h1>
          <h1>Прослушиваний: {track.listens}</h1>
        </div>
      </Grid>
      <h1>Текст песни</h1>
      <p>{track.text}</p>
      <Grid container>
        <h1>Комментарии</h1>
        <TextField {...username} label="Ваше имя" fullWidth />
        <TextField
          {...text}
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 1 }}
        />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Автор: {comment.username}</div>
            <div>Комментарий: {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
