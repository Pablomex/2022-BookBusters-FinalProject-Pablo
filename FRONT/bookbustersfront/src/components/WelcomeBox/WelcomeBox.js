import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import logoBusters from "../../assets/img/logoBusters.svg";

function WelcomeBox() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "80%" },
        maxWidth: "1280px",
        margin: "10px auto 40px auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          paddingTop: "25px",
          paddingLeft: "15px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        Bienvenue sur BookBusters !
      </Typography>
      <Box
        sx={{
          padding: "15px",
          marginBottom: "25px",
          display: "flex",
          flexFlow: { xs: "column noWrap", md: "row noWrap" },
          alignItems: "center",
          gap: "40px",
          margin: { xs: "auto" },
        }}
      >
        <Box
          component="img"
          src={logoBusters}
          sx={{ width: { xs: "150px", md: "250px" } }}
        ></Box>
        <Box sx={{ textAlign: "justify" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Bienvenue sur BookBusters, la boite à livres en ligne ! Vous pouvez
            voir juste en dessous les derniers ajouts faits par nos membres
            ainsi que les livres se trouvant autour de vous.
          </Typography>
          <br />
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Si vous souhaitez vous même faire de la place dans votre
            bibliothèque ou cherchez un livre que vous souhaitez lire depuis
            longtemps nous vous invitions à vous inscrire puis à vous connecter
            pour vous mettre en relation avec les autres utilisateurs.
          </Typography>
          <br />
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Vous aurez aussi la possibilité de créer des alertes vous permettant
            d'être avertis en cas de disponibilité du livre que vous cherchez.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomeBox;
