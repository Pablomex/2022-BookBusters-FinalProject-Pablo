import { CssBaseline, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import bookDefaultCover from '../../assets/img/logo_bb.png';
import "./style.scss";
import BookDetailModal from "../BookDetailModal/BookDetailModal";
import bookContext from "../../contexts/BookContext";

function SearchResults() {
  // const [data, setData] = useState([]);
  const location = useLocation();
  // console.log(location.state);
  const searchResultsAPI = location.state;

  const { setOpenedBook } = useContext(bookContext);
  return (
      <>
          <Header />
          <CssBaseline />
          <BookDetailModal />
          <Box
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '3vh',
              }}
          >
              <Box
                  sx={{
                      width: '90%',
                      display: 'flex',
                      flexFlow: 'column wrap',
                      textAlign: 'left',
                      gap: '20px',
                  }}
              >
                  {searchResultsAPI[0] ? (
                      searchResultsAPI.map((book) => (
                          <Paper
                              onClick={() => {
                                  setOpenedBook(book);
                                  console.log(book);
                              }}
                              key={book.isbn13}
                              elevation={15}
                              sx={{
                                  display: 'flex',
                                  height: '215px',
                                  padding: '15px',
                              }}
                          >
                              <Box
                                  sx={{
                                      overflow: 'hidden',
                                      display: 'flex',
                                      alignItems: 'left',
                                      width: '210px',
                                  }}
                              >
                                  {book.cover ? (
                                      <img
                                          className='imageCovers'
                                          alt='Book cover'
                                          src={book.cover}
                                      ></img>
                                  ) : (
                                      <img
                                          className='imageCovers'
                                          alt='Generic book cover'
                                          src={bookDefaultCover}
                                      ></img>
                                  )}
                              </Box>
                              <Box
                                  sx={{
                                      padding: '0px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'flex-start',
                                      justifyContent: 'center',
                                  }}
                              >
                                  <Typography variant='overline'>
                                      Titre:
                                  </Typography>
                                  <Typography>
                                      {book.title}
                                      <br />
                                  </Typography>
                                  <br />
                                  <Typography variant='overline'>
                                      Auteur:
                                      <br />
                                  </Typography>
                                  {book.author &&
                                      book.author.map((author, index) => (
                                          <Typography
                                              key={`single-author${index}`}
                                          >
                                              {author}
                                          </Typography>
                                      ))}
                              </Box>
                          </Paper>
                      ))
                  ) : (
                      <Box
                          sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              minHeight: '80vh',
                          }}
                      >
                          <Paper
                              elevation={15}
                              sx={{
                                  height: 'auto',
                                  padding: '15px',
                              }}
                          >
                              <Typography
                                  variant='subtitle'
                                  sx={{ textAlign: 'center' }}
                              >
                                  Votre recherche n'a donné aucun résultat
                              </Typography>
                          </Paper>
                      </Box>
                  )}
              </Box>
          </Box>
      </>
  );
}

export default SearchResults;
