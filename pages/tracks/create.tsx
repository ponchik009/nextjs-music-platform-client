import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import axios from "axios";

import StepWrapper from "../../components/StepWrapper";
import MainLayout from "../../layouts/MainLayout";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [picture, setPicture] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhostL5000/tracks", formData)
        .then((resp) => router.push("/tracks"))
        .catch((e) => console.log(e));
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" sx={{ p: "20px" }}>
            <TextField {...name} label="Название трека" sx={{ mt: "10px" }} />
            <TextField {...artist} label="Имя автора" sx={{ mt: "10px" }} />
            <TextField
              {...text}
              label="Текст песни"
              multiline
              rows={3}
              sx={{ mt: "10px" }}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button onClick={back} disabled={activeStep < 1}>
          Назад
        </Button>
        <Button onClick={next}>Вперед</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
