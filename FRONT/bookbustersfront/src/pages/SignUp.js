// Imports REACT
import React, { useState, useEffect, useContext } from "react";

// Imports MUI
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Avatar,
  Button,
  Grid,
  Box,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Import Composants
import Header from "../components/Header/Header";
import Copyright from "../components/Copyright/Copyright";

// Import React-Router-Dom
import { Link, useNavigate } from "react-router-dom";

//Import package codes postaux
import codesPostaux from "codes-postaux";

// Import de la méthode registerUser depuis fetchAPI.js
import { registerUser } from "../api/fetchApi";

import alertContext from "../contexts/AlertContext";

export default function SignUp() {
  const [postalCode, setPostalCode] = useState("");
  const [communeCode, setCommuneCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [possibleVilles, setPossibleVilles] = useState([]);
  const navigate = useNavigate();

  const { setErrorAlert, setSuccessAlert } = useContext(alertContext);

  useEffect(() => {
    if (possibleVilles.length === 1) {
      setCommuneCode(possibleVilles[0].codeCommune);
    } else if (possibleVilles.length === 0) {
      setCommuneCode("");
    }
  }, [possibleVilles]);

  const handlePostalCodeChange = ({ currentTarget }) => {
    if (currentTarget.value.length === 5) {
      setPossibleVilles(codesPostaux.find(currentTarget.value));
    } else {
      setPossibleVilles([]);
    }
    setPostalCode(currentTarget.value);
  };

  const handleRegisterSuccess = () => {
    setUsername("");
    setPostalCode("");
    setCommuneCode("");
    setEmail("");
    setPassword("");
    setPasswordConf("");
    navigate("/signIn");
    setSuccessAlert("Compte crée !");
  };

  //* Regex pour le pseudo et pour le mot de passe
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^.{6,50}$/;

  // OLD PASSWORD REGEX
  // const PWD_REGEX =/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = [];
    console.log(event);
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errors.push(
        "Problème detecté sur votre mot de passe ou nom d'utilisateur"
      );
    }

    // Vérification du code postal
    if (postalCode.length !== 5) {
      errors.push("Code postal incorrect");
    }

    // Vérification de la commune
    if (communeCode.length < 1) {
      errors.push("Ville introuvable");
    }

    // Vérification des mots de passe
    if (password !== passwordConf) {
      errors.push("Vos mots de passe ne correspondent pas");
    }

    if (errors.length > 0) {
      return setErrorAlert(errors.join(", "));
    }

    registerUser(
      postalCode,
      communeCode,
      username,
      email,
      password,
      handleRegisterSuccess,
      setErrorAlert
    );
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="pseudo"
                  required
                  fullWidth
                  id="pseudo"
                  label="Pseudo"
                  helperText="4 à 24 caractères / doit commencer par une lettre / lettres, nombres et tirets autorisés"
                  autoFocus
                  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="tel"
                  id="codePostal"
                  label="Code Postal"
                  name="codePostal"
                  placeholder="75001"
                  autoComplete="email"
                  helperText="Code postaux français"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="cities-label">Ville/Commune</InputLabel>
                  <Select
                    id="cities"
                    labelId="cities-label"
                    value={communeCode}
                    label="Ville/Commune"
                    onChange={({ target }) => setCommuneCode(target.value)}
                    required
                  >
                    {console.log(communeCode)}
                    {possibleVilles.length < 1 && (
                      <MenuItem disabled>Aucune ville trouvée</MenuItem>
                    )}
                    {possibleVilles.map((ville) => (
                      <MenuItem
                        key={ville.codeCommune}
                        value={ville.codeCommune}
                             >
                       {ville.nomCommune}
                       {console.log(ville.nomCommune)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  helperText="entre 6 et 50 caractères"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmation de mot de passe"
                  type="password"
                  id="passwordVerification"
                  value={passwordConf}
                  onChange={({ target }) => setPasswordConf(target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/SignIn"
                  style={{ color: "#000", textDecoration: "underline" }}
                >
                  Déjà inscrit? Connectez-vous
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
