// Imports REACT
import React, { useContext, useEffect, useState } from "react";

// Imports MUI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Imports composants
import Header from "../components/Header/Header";
import LibrarySign from "../assets/img/library.jpg";
import Copyright from "../components/Copyright/Copyright";
import authContext from "../contexts/AuthContext";

import alertContext from "../contexts/AlertContext";

// Import composant Link React-Router
import { Link, useNavigate } from "react-router-dom";

// Import de la méthode connectUser depuis fetchAPI.js
import { connectUser } from "../api/fetchApi";

export default function SignInSide() {
  const [login, setLogin] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setErrorAlert, setSuccessAlert } = useContext(alertContext);

  const { logIn } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
    return () => {
      setErrMsg("");
    };
  }, [login, password]);

  const handleLoginSuccess = (token, user) => {
    setLogin("");
    setPwd("");
    logIn(token);

    setErrMsg("");
    navigate("/");
    setSuccessAlert(`Bienvenue ${user.username}! Bonne pêche aux livres.`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    connectUser(login, password, setErrMsg, handleLoginSuccess);
  };

  return (
    <>
      <Header />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LibrarySign})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Si différent de success, on renvoie le form de connexion */}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            {errMsg && (
              <Typography
                variant="body2s"
                color="error"
                sx={{ mt: 2, textAlign: "center" }}
              >
                {errMsg}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPwd(e.target.value)}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* fonctionnalité de chgnmmnt de mdp à venir */}
                  {/* <Link
                    to="/ForgotPassword"
                    style={{ color: "#000", textDecoration: "underline" }}
                  >
                    Mot de passe oublié?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    to="/SignUp"
                    style={{ color: "#000", textDecoration: "underline" }}
                  >
                    {"Pas encore inscrit ? Inscrivez-vous"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </>
  );
}
