import Header from "../components/Header/Header";
import hanged_monster from "../assets/img/hanged_monster.png";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            height: "auto",
            padding: "15px",
            textAlign: "center",
          }}
          elevation="15"
        >
          <Box component="img" src={hanged_monster} width="10vw" />
          <br />
          <Typography variant="h6">Oups! Vous vous êtes égarés !</Typography>
          <br />
          <Typography variant="h5">
            {" "}
            Ceci est une erreur 404, pas de bouquin dispo par là...
            Mais retrouvez tous nos donateurs par <Link to= "/">ici</Link> !
          </Typography>
          
          
        </Paper>
      </Box>
    </>
  );
};

export default Error;
