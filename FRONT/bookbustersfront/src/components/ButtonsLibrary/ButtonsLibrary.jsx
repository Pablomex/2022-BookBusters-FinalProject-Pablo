import { Container, ButtonGroup } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";

const ButtonsLibrary = () => {
  return (
      <Container sx={{ margin: "10px 0 30px 0", maxWidth: "100% !important", width: "100%" }}>
        <ButtonGroup sx={{ gap: { xs: "1px", md: "25px" }, width: "100%", justifyContent: "center",}}>
          <LinkButton to="/Library" text={"Bibliothèque"} />
          <LinkButton to="/Favorites" text={"Favoris"} />
          <LinkButton to="/MyAlerts" text={"Alertes"} />
        </ButtonGroup>
      </Container>
  );
};

export default ButtonsLibrary;
