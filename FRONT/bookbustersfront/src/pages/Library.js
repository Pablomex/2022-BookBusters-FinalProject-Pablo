import { Box, Paper, Typography } from "@mui/material";
import BookDisplay from "../components/BookDisplay/BookDisplay";
import ButtonsLibrary from "../components/ButtonsLibrary/ButtonsLibrary";
import Header from "../components/Header/Header";

const Library = () => {
  return (
      <div>
          <Header />
          <Box
              sx={{
                  padding: '15px',
                  marginBottom: '25px',
                  textAlign: 'center',
                  gap: '40px',
                  margin: { xs: 'auto' },
              }}
          >
                  <Typography variant='h4' sx={{ paddingTop: '25px' }}>
                      Bienvenue dans votre bibliothèque
                  </Typography>
                  <Typography variant='h5' sx={{ padding: '15px' }}>
                      C'est comme dans une Discothèque
                      <br/>
                      juste qu'ici, il faut savoir lire.
                  </Typography>
                  <Typography variant='body1' sx={{ padding: '15px' }}>
                      Triez vos livres, et indiquez ceux que vous souhaitez donner.
                  </Typography>
          </Box>
          <ButtonsLibrary />
          <BookDisplay />
      </div>
  );
};

export default Library;
