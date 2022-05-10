// Imports REACT
import React, { useState, useContext } from "react";
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
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

// Import Composants
import Header from "../components/Header/Header";
import Copyright from "../components/Copyright/Copyright";

// Import React-Router-Dom
import { Link, useNavigate } from "react-router-dom";

import alertContext from "../contexts/AlertContext";

const Contact = () => {
  return (
    <div>
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
            <ImportContactsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contactez BookBusters !
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Votre adresse email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={5}
                  required
                  fullWidth
                  id="message"
                  label="Votre message"
                  name="message"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer la demande
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
};

export default Contact;
