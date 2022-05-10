import { Stack, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import React, { useContext } from "react";
import authContext from "../../contexts/AuthContext";

function SignButtons() {
  const { connected } = useContext(authContext);

  if (connected) {
    return null;
  }

  return (
    <Stack direction="row">
      <Box
        sx={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
        }}
        variant="contained"
      >
        <Link to="/signUp" style={{ color: "#fff", textDecoration: "none" }}>
          <Button
            value="inscription"
            variant="contained"
            sx={{
              width: "50%",
              borderRadius: "5px 0px 0px 5px",
              display: { md: "none" },
            }}
          >
            Inscription
          </Button>
        </Link>

        <Link to="/signIn" style={{ color: "#fff", textDecoration: "none" }}>
          <Button
            value="connexion"
            variant="contained"
            color="secondary"
            sx={{
              width: "50%",
              borderRadius: "0px 5px 5px 0px",
              display: { md: "none" },
            }}
          >
            Connexion
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}

export default SignButtons;
