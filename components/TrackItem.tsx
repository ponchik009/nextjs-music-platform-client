import React from "react";
import { Card, IconButton, Grid } from "@mui/material";
import { PlayArrow, Pause, Delete } from "@mui/icons-material";

import { ITrack } from "../types/track";
import styles from "../styles/TrackItem.module.scss";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useAction";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton
        sx={{
          width: "70px",
          height: "70px",
          backgroundImage: `url(${"http://localhost:5000/" + track.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        onClick={play}
      >
        {active ? (
          <Pause color="success" fontSize="large" />
        ) : (
          <PlayArrow color="success" fontSize="large" />
        )}
      </IconButton>

      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:22</div>}
      <IconButton sx={{ ml: "auto" }} onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
