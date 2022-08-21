import React from "react";
import { Container, Stepper, Step, Card, Grid, StepLabel } from "@mui/material";

interface StepWrapperProps {
  activeStep: number;
}

const steps = ["Информация о треке", "Загрузка обложки", "Загрузка трека"];

const StepWrapper: React.FC<StepWrapperProps> = ({ children, activeStep }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={`${step}_${index}`} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        sx={{ m: "70px 0", height: "270px" }}
      >
        <Card sx={{ width: "600px" }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
