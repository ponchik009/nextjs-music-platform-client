import React, { useEffect } from "react";
import { PlayArrow, Pause, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";

import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useAction";

let audio;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setActiveTrack,
    setDuration,
    setVolume,
    setCurrentTime,
  } = useActions();

  useEffect(() => {
    if (!audio) {
      console.log(1);

      audio = new Audio();
    } else {
      console.log(2);

      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    audio.volume = newVolume / 100;
    setVolume(newVolume);
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCurrentTime = Number(e.target.value);
    audio.currentTime = newCurrentTime;
    setCurrentTime(newCurrentTime);
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton
        sx={{
          width: "70px",
          height: "70px",
          backgroundImage: `url(${"http://localhost:5000/" + active?.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        onClick={play}
      >
        {!pause ? (
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
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
        time
      />
      <VolumeUp sx={{ ml: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
