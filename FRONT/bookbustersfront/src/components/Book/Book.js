import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import bookDefaultCover from "../../assets/img/logo_bb.png";
import "./Book.scss";
import BookDetailModal from "../BookDetailModal/BookDetailModal";
import bookContext from "../../contexts/BookContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Book({ book, users }) {
  function livrePLS() {
    // permet de charger une cover de livre si la base de donnée n'en renvoi pas
    if (book.cover === undefined) {
      return bookDefaultCover;
    } else {
      return book.cover;
    }
  }

  //console.log(livre);
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setOpenedBook } = useContext(bookContext);
  return (
      <>
          <Button
              onClick={() => setOpenedBook(book)}
              sx={{
                  alignItems: 'flex-start',
              }}
          >
              <Card
                  sx={{
                      width: { xs: '160px', md: '200px' },
                      margin: { xs: '8px 4px', md: '16px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignSelf: 'stretch',
                      justifyContent: 'space-between',
                  }}
              >
                  <CardMedia
                      component='img'
                      image={livrePLS()}
                      alt={`Couverture du livre ${book.title}`}
                  />

                  <CardContent
                      sx={{
                          flexGrow: '1',
                          gap: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                      }}
                  >
                      <Typography
                          gutterBottom
                          /*variant="h5" */ sx={{ fontSize: '1.2em' }}
                          component='div'
                      >
                          {book.title}
                      </Typography>
                      <Typography
                          variant='body1'
                          color='text.secondary'
                          sx={{ fontSize: '0.9em' }}
                      >
                          {book.author}
                      </Typography>
                  </CardContent>
              </Card>
          </Button>
      </>
  );
}
