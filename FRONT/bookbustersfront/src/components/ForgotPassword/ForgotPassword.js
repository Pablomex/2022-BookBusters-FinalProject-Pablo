// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Header from "../Header/Header";
// import { Link } from "react-router-dom";
// import KeyIcon from "@mui/icons-material/Key";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link to="/" style={{ color: "#000", textDecoration: "underline" }}>
//         BookBusters
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function ForgotPassword() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

//   return (
//     <>
//       <Header />
//       <Container component="main">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <KeyIcon />
//           </Avatar>
//           <Typography
//             component="h1"
//             variant="h5"
//             sx={{ textAlign: "center", mb: "15px" }}
//           >
//             Vous avez oublié votre mot de passe ?
//           </Typography>
//           <Typography variant="subtitle" sx={{ textAlign: "center" }}>
//             Entrez votre email et nous vous enverrons un lien pour le redéfinir.
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Adresse email"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Envoyer le lien
//             </Button>
//             <Grid container justifyContent="flex-end"></Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </>
//   );
// }
