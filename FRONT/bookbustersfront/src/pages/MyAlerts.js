import { Box, Typography } from '@mui/material';
import React from 'react';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import ButtonsLibrary from '../components/ButtonsLibrary/ButtonsLibrary';

import Header from '../components/Header/Header';

const MyAlerts = () => {
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
                    Bienvenue dans vos alertes
                </Typography>
                <Typography variant='body1' sx={{ padding: '15px' }}>
                    Ajoutez des alertes sur les livres que vous cherchez, pour
                    être alertez par email quand ceux-ci seront disponible au
                    don.
                </Typography>
            </Box>
            <ButtonsLibrary />
            <BookDisplay />
        </>
    );
};

export default MyAlerts;
