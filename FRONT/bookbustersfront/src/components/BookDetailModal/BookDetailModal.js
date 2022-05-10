import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import bookContext from '../../contexts/BookContext';
import bookDefaultCover from '../../assets/img/logo_bb.png';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import './style.scss';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookIcon from '@mui/icons-material/Book';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { updateBookStatus } from '../../api/fetchApi';
import donatorContext from '../../contexts/DonatorContext';
import alertContext from '../../contexts/AlertContext';

const styleBox = {
    position: 'absolute',
    top: { xs: '50%', md: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 2,
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: '5px',
};

function BookDetailModal({ callback = () => {} }) {
    //   const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const { openedBook, setOpenedBook } = useContext(bookContext);
    const { setDonatorInfo } = useContext(donatorContext);
    const { setErrorAlert, setInfoAlert } = useContext(alertContext);
    const navigate = useNavigate();

    const [library, setLibrary] = useState();
    const [favorit, setFavorit] = useState();
    const [alert, setAlert] = useState();
    const [donation, setDonation] = useState();

    useEffect(() => {
        if (openedBook?.connected_user) {
            !library && setLibrary(openedBook.connected_user.is_in_library);
            !favorit && setFavorit(openedBook.connected_user.is_in_favorite);
            !alert && setAlert(openedBook.connected_user.is_in_alert);
            !donation && setDonation(openedBook.connected_user.is_in_donation);
        }
        if (openedBook && !openedBook.connected_user) {
            setLibrary(false);
            setFavorit(false);
            setAlert(false);
            setDonation(false);
        }
    }, [openedBook]);

    if (!openedBook) return null;

    const book = openedBook;
    const users = book.donors;

    const handleDonorButton = (donator) => {
        console.log(donator);
        setDonatorInfo(donator);
        navigate('/ContactFormDonation');
    };
    // Inverser tout de suite la valeur de l'état pour des questions de cycles de vie
    // nous sommes dans le meme cycle de vie
    const handleUpdateBookStatus = async (statusToUpdate) => {
        const infoMessage = [];

        let bookStatus = {
            library,
            favorit,
            donation,
            alert,
            isbn10: book.isbn10,
            isbn13: book.isbn13,
        };
        switch (statusToUpdate) {
            case 'library':
                if (!library === false) {
                    if (donation) {
                        infoMessage.push(
                            "puisque vous ne possédez plus ce livre, nous l'avons retiré de vos dons",
                        );
                    }
                    setDonation(false);
                    bookStatus.donation = false;

                    setInfoAlert(infoMessage);
                }
                setLibrary(!library);
                bookStatus.library = !library;
                break;
            case 'favorit':
                setFavorit(!favorit);
                bookStatus.favorit = !favorit;
                break;
            case 'donation':
                if (!donation === true) {
                    if (!library) {
                        infoMessage.push(
                            'pour sa mise au don, nous avons ajouté ce livre à votre bibliothèque',
                        );
                    }
                    setLibrary(true);
                    bookStatus.library = true;
                    if (alert) {
                        infoMessage.push(
                            'puisque vous le possédez, nous avons retiré ce livre de vos alertes',
                        );
                    }
                    setAlert(false);
                    bookStatus.alert = false;

                    setInfoAlert(infoMessage.join(' et '));
                }
                setDonation(!donation);
                bookStatus.donation = !donation;
                break;
            case 'alert':
                if (!alert === true) {
                    if (donation) {
                        infoMessage.push(
                            "puisque vous recherchez ce livre, nous l'avons retiré de vos dons",
                        );
                    }
                    setDonation(false);
                    bookStatus.donation = false;
                }
                setAlert(!alert);
                bookStatus.alert = !alert;

                setInfoAlert(infoMessage);
                break;
            default:
                setErrorAlert(
                    'Une erreur semble avoir eu lieu, vous devriez recliquer sur le bouton.',
                );
                break;
        }
        console.log(bookStatus);
        const result = await updateBookStatus(bookStatus);
        if (result === false) {
            switch (statusToUpdate) {
                case 'library':
                    setLibrary(library);
                    break;
                case 'favorit':
                    setFavorit(favorit);
                    break;
                case 'donation':
                    setDonation(donation);
                    break;
                case 'alert':
                    setAlert(alert);
                    break;
                default:
                    break;
            }
        }
    };

    const handleCloseModal = () => {
        setOpenedBook(null);
    };

    return (
        <Modal
            open={Boolean(openedBook)}
            onClose={() => setOpenedBook(null)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            sx={{
                position: 'fixed',
            }}
        >
            <Box sx={styleBox}>
                <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={handleCloseModal}>
                        <CloseIcon sx={{ color: 'black' }} fontSize='small' />
                    </IconButton>
                </Box>
                <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{ textAlign: 'center', mb: 2 }}
                >
                    {book.title}
                </Typography>
                {/* Zone des cover des livres */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'flex' },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '200px', md: '250px' },
                            padding: { xs: 'auto', md: '0px 20px 15px 0px' },
                            display: { xs: 'flex', md: 'block' },
                            margin: { xs: '0 auto', md: '0' },
                        }}
                    >
                        {book.cover ? (
                            <img
                                className='imageCoversModal'
                                alt='Book cover'
                                src={book.cover}
                                style={{ width: 'inherit' }}
                            ></img>
                        ) : (
                            <img
                                className='imageCoversModal'
                                alt='Generic book cover'
                                src={bookDefaultCover}
                                style={{ width: 'inherit' }}
                            ></img>
                        )}
                    </Box>
                    {/* Zone des icones d'interactions */}
                    {localStorage.getItem('jwt') && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', md: 'column' },
                                justifyContent: { xs: 'space-evenly' },
                                marginTop: { xs: '10px', md: '0' },
                            }}
                        >
                            <Tooltip
                                title='Ajoutez ce livre à vos favoris'
                                arrow
                                placement='right'
                            >
                                <IconButton
                                    sx={{
                                        display: { xs: 'flex', md: 'block' },
                                        flexDirection: 'column',
                                    }}
                                    onClick={() => {
                                        handleUpdateBookStatus('favorit');
                                    }}
                                >
                                    {favorit ? (
                                        <FavoriteIcon sx={{ color: 'red' }} />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                            },
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Favoris
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title='Ajoutez ce livre à votre bilbiothèque'
                                arrow
                                placement='right'
                            >
                                <IconButton
                                    sx={{
                                        display: { xs: 'flex', md: 'block' },
                                        flexDirection: 'column',
                                    }}
                                    onClick={() => {
                                        handleUpdateBookStatus('library');
                                    }}
                                >
                                    {library ? (
                                        <BookIcon sx={{ color: 'brown' }} />
                                    ) : (
                                        <BookOutlinedIcon />
                                    )}
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                            },
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Bilbiothèque
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title='Activez la donation pour ce livre'
                                arrow
                                placement='right'
                            >
                                {/*Déclaration de fonction pour ne pas déclencher le onClick au
              chargement de la page*/}
                                <IconButton
                                    sx={{
                                        display: { xs: 'flex', md: 'block' },
                                        flexDirection: 'column',
                                    }}
                                    onClick={() => {
                                        handleUpdateBookStatus('donation');
                                    }}
                                >
                                    {donation ? (
                                        <VolunteerActivismIcon
                                            sx={{ color: 'blue' }}
                                        />
                                    ) : (
                                        <VolunteerActivismOutlinedIcon />
                                    )}
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                            },
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Don
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title='Ajoutez une alerte pour ce livre'
                                arrow
                                placement='right'
                            >
                                <IconButton
                                    sx={{
                                        display: { xs: 'flex', md: 'block' },
                                        flexDirection: 'column',
                                    }}
                                    onClick={() => {
                                        handleUpdateBookStatus('alert');
                                    }}
                                >
                                    {alert ? (
                                        <AddAlertIcon sx={{ color: 'green' }} />
                                    ) : (
                                        <AddAlertOutlinedIcon />
                                    )}
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                            },
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        Alerte
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    {/* Zone des textes */}
                    <Box
                        id='modal-modal-description'
                        sx={{ margin: '0px 15px 0px 15px' }}
                    >
                        <Typography variant='overline'>Auteur:</Typography>
                        <Typography>{book.author}</Typography>
                        <Box
                            sx={{
                                display: { md: 'inline' },
                            }}
                        >
                            <Typography variant='overline'> Résumé:</Typography>
                            {book.resume ? (
                                <Box>{book.resume}</Box>
                            ) : (
                                <Typography>
                                    Pas de résumé trouvé pour ce livre.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* Zone des donateurs */}
                <Stack>
                    {users && users[0] && users.length > 0 && (
                        <>
                            <Typography
                                variant='h5'
                                align='center'
                                sx={{ mb: '10px', mt: '10px' }}
                            >
                                Livre disponible chez
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {users.map((user, index) => (
                                    <Box
                                        className='bookUserOwner'
                                        key={index}
                                        sx={{
                                            width: '900px',
                                            padding: '10px 0',
                                            borderBottom: '1px solid #263237',
                                            display: 'flex',
                                            flexFlow: 'row wrap',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: { xs: '100%', md: '80%' },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mb: '5px',
                                                display: 'flex',
                                                flexFlow: 'row nowrap',
                                                alignItems: 'center',
                                                textAlign: 'left',
                                                justifyContent: {
                                                    xs: 'space-between',
                                                    md: 'flex-start',
                                                },
                                                width: {
                                                    xs: '100%',
                                                    md: '66%',
                                                },
                                                gap: '20px'
                                            }}
                                        >
                                            <Typography align='center'>
                                                {user?.username}
                                                {console.log(user)}
                                            </Typography>
                                            <Typography align='center'>
                                                {user.postal_code}{' '}
                                                {user.commune_name}
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant='contained'
                                            endIcon={<SendIcon />}
                                            sx={{
                                                width: {
                                                    xs: '100%',
                                                    md: '34%',
                                                },
                                            }}
                                            onClick={() => {
                                                handleDonorButton(user);
                                            }}
                                        >
                                            Contactez {user.username}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}
                    {(!users || users.length === 0) && (
                        <>
                            <Typography
                                sx={{ marginTop: '10px', textAlign: 'center' }}
                            >
                                Personne ne possède le livre !
                            </Typography>
                        </>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
}

export default BookDetailModal;
