import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { favoritesBooks } from '../api/fetchApi';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import ButtonsLibrary from '../components/ButtonsLibrary/ButtonsLibrary';
import Header from '../components/Header/Header';

const Favorites = () => {
    return (
        <>
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
                    Bienvenue dans vos favoris
                </Typography>
                <Typography variant='body1' sx={{ padding: '15px' }}>
                    Ajoutez en favoris vos livres préféres.
                </Typography>
            </Box>
            <ButtonsLibrary sx={{ textAlign: "center" }} />
            <BookDisplay />
        </>
    );
};

export default Favorites;
