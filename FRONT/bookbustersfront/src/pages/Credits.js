import { Paper, Typography } from "@mui/material";
import BookBustersTeam from "../assets/img/BookBustersTeam.jpg";
import linkedin from "../assets/img/linkedin.png";
import github from "../assets/img/github.png";
import instagram from "../assets/img/white-instagram.png";
import { Box } from "@mui/system";
import Header from "../components/Header/Header";
import "../styles/credit.scss";
import Link from "@mui/material/Link";

const Credits = () => {
  return (
      <>
          <Header />
          <Box
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '30px',
                  marginBottom: '40px',
              }}
          >
              <Paper
                  sx={{
                      width: '90%',
                      height: 'auto',
                      padding: '15px',
                      textAlign: 'center',
                      backgroundColor: '#263238',
                  }}
                  elevation={15}
              >
                  <Typography
                      variant='h2'
                      sx={{ color: 'white', marginBottom: '50px' }}
                  >
                      L'équipe BookBusters !
                  </Typography>
                  <Box
                      sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', md: 'row' },
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          gap: '0rem 1rem',
                          marginBottom: '20px',
                      }}
                  >
                      <Box
                          component='img'
                          src={BookBustersTeam}
                          sx={{
                              maxWidth: { xs: '100%', md: '50%' },
                              objectFit: 'contain',
                          }}
                      />
                      <br />
                      <Box
                          sx={{
                              width: { xs: '81vw', md: '27vw' },
                          }}
                      >
                          <Box sx={{ marginBottom: '0.5rem' }}>
                              <Box
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      textAlign: 'justify',
                                  }}
                              >
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          width: '100px',
                                          textAlign: 'left',
                                          color: 'white',
                                          marginRight: '2vh',
                                      }}
                                  >
                                      Elodie
                                  </Typography>
                                  <Link href='https://github.com/ElodieFaivre'>
                                      <Box
                                          component='img'
                                          src={github}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                                  <Link href='https://www.linkedin.com/in/elodie-faivre/'>
                                      <Box
                                          component='img'
                                          src={linkedin}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                              </Box>
                              <Typography
                                  sx={{
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  Dans le fin fond de la campagne, aux côtés du
                                  coq, la meilleure développeuse back en
                                  devenir.
                              </Typography>
                          </Box>

                          <Box sx={{ marginBottom: '0.5rem' }}>
                              <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          width: '100px',
                                          textAlign: 'left',
                                          color: 'white',
                                          marginRight: '2vh',
                                      }}
                                  >
                                      Julien
                                  </Typography>
                                  <Link href='https://github.com/JulienDupont11'>
                                      <Box
                                          component='img'
                                          src={github}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                                  <Link href='www.linkedin.com/in/julien-dupont11'>
                                      <Box
                                          component='img'
                                          src={linkedin}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                              </Box>
                              <Typography
                                  sx={{
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  Il y avait de la lumière et une place au
                                  chaud. Il est entré dans la famille des
                                  Bookbusters. C’est le Git Master.
                              </Typography>
                          </Box>

                          <Box sx={{ marginBottom: '0.5rem' }}>
                              <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          width: '100px',
                                          textAlign: 'left',
                                          color: 'white',
                                          marginRight: '2vh',
                                      }}
                                  >
                                      Pablo
                                  </Typography>
                                  <Link href='https://github.com/Pierre-Nicolas-D-C'>
                                      <Box
                                          component='img'
                                          src={github}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                                  <Link href='https://www.linkedin.com/in/pierrenicolasdespoissechagot/'>
                                      <Box
                                          component='img'
                                          src={linkedin}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                              </Box>
                              <Typography
                                  sx={{
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  En provenance du cinéma, il est actuellement
                                  apprenti sorcier dans le domaine du Web.
                              </Typography>
                          </Box>

                          <Box sx={{ marginBottom: '0.5rem' }}>
                              <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          width: '100px',
                                          textAlign: 'left',
                                          color: 'white',
                                          marginRight: '2vh',
                                      }}
                                  >
                                      Paul
                                  </Typography>
                                  <Link href='https://www.linkedin.com/in/paul-rigaudeau/'>
                                      <Box
                                          component='img'
                                          src={github}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                                  <Link href='https://github.com/Pololops'>
                                      <Box
                                          component='img'
                                          src={linkedin}
                                          width='25px'
                                          height='25px'
                                          sx={{ marginLeft: '2vh' }}
                                      />
                                  </Link>
                              </Box>
                              <Typography
                                  sx={{
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  Un product owner haut en couleur qui a su
                                  donné les priorités tout au long de se projet
                                  ambitieux.
                              </Typography>
                          </Box>

                          <Box sx={{ marginBottom: '0.5rem' }}>
                              <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          width: '100px',
                                          textAlign: 'left',
                                          color: 'white',
                                          marginRight: '2vh',
                                      }}
                                  >
                                      Yvan
                                  </Typography>
                                  <Link href='https://www.linkedin.com/in/yvan-mackowiak/'>
                                      <Box
                                          component='img'
                                          src={github}
                                          width='25px'
                                          height='25px'
                                          sx={{
                                              marginLeft: '2vh',
                                              marginTop: '0,5vh',
                                          }}
                                      />
                                  </Link>
                                  <Link href='https://github.com/YvanMackowiak'>
                                      <Box
                                          component='img'
                                          src={linkedin}
                                          width='25px'
                                          height='25px'
                                          sx={{
                                              marginLeft: '2vh',
                                              marginTop: '0,5vh',
                                          }}
                                      />
                                  </Link>
                              </Box>
                              <Typography
                                  sx={{
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  Emigré sudiste codant dans le grand nord.
                              </Typography>
                          </Box>

                          <Box
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  marginTop: '2rem',
                              }}
                          >
                              <Typography
                                  sx={{
                                      display: 'block',
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  un grand{' '}
                                  <Typography
                                      variant='h6'
                                      sx={{
                                          color: 'white',
                                          fontSize: '2rem',
                                          fontWeight: 'fontWeightMedium',
                                          display: 'inline',
                                      }}
                                  >
                                      MERCI
                                  </Typography>{' '}
                                  de toute l'équipe à : <br />
                                  Anne Laure pour le logo trop trop top et les
                                  visuels BookBusters.
                              </Typography>{' '}
                              <Link href='https://www.instagram.com/alp_graphiste/'>
                                  <Box
                                      component='img'
                                      src={instagram}
                                      width='25px'
                                      height='25px'
                                      sx={{
                                          display: 'block',
                                          marginLeft: '2vh',
                                          marginTop: '0,5vh',
                                      }}
                                  />
                              </Link>
                              <Typography
                                  sx={{
                                      display: 'block',
                                      color: 'white',
                                      textAlign: 'justify',
                                      fontSize: '1rem',
                                  }}
                              >
                                  Agathe pour cette magnifique idée !
                              </Typography>{' '}
                          </Box>
                          <Typography
                              sx={{
                                  color: 'white',
                                  textAlign: 'justify',
                                  fontSize: '1rem',
                                  marginTop: '3rem',
                              }}
                          >
                              Projet réalisé dans le cadre du processus
                              d'apothéose de l'école O'clock. <br />
                              <br />
                              Promotion Zagreus 02/11/2021-25/04/2022. <br />
                              <br />
                              Nous remercions tous nos profs de socle et de
                              spécialité (Data/API & React) ainsi que les deux
                              supers anges gardiens de notre promotion, Etienne
                              et son acolyte Gauthier.
                          </Typography>
                      </Box>
                  </Box>
              </Paper>
          </Box>
      </>
  );
};

export default Credits;
