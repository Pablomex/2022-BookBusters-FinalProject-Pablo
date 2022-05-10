import React, { useState, useContext } from 'react';
import FlipIcon from '@mui/icons-material/Flip';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from './SearchISBNBar.style';
import { searchBookByISBN } from '../../api/fetchApi';
import bookContext from '../../contexts/BookContext';
import alertContext from '../../contexts/AlertContext';
import { Typography, Button } from '@mui/material';

const SearchISBNBar = () => {
    const isbnRegexp = /^97[8-9]\d{10}$/;

    const [isbn, setIsbn] = useState('');
    const { setOpenedBook } = useContext(bookContext);
    const { setErrorAlert, setSuccessAlert } = useContext(alertContext);

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        let errors = [];

        setErrorAlert('');

        if (
            isbn &&
            (isbn.length === 10 ||
                (isbn.length === 13 && isbnRegexp.test(isbn)))
        ) {
            setSuccessAlert(`Recherche en cours avec l'isbn n° ${isbn}...`);
            const response = await searchBookByISBN(isbn);
            if(response.data.length === 0) {
                errors.push("Aucun livre avec cet isbn n'a été trouvé.");
            } else {
                setOpenedBook(response.data);
                setSuccessAlert('');
            }
        } else {
            if (!isbn) {
                errors.push('Saissisez un isbn');
            } else {
                if (isbn.length !== 10 && isbn.length !== 13) {
                    errors.push('l\'isbn doit comporter soit 10, soit 13 chiffres');
                } else {
                    if (!(isbnRegexp.test(isbn))) {
                        console.log(isbnRegexp.test(isbn));
                        errors.push('l\'isbn saisi est invalide');
                    }
                }
            }
        }

        if (errors.length > 0) {
            return setErrorAlert(errors);
        }
    };

    const handleClear = () => {
        setIsbn('');
        setErrorAlert('');
    };

    return (
        <Search
            component='form'
            onSubmit={handleSubmitSearch}
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                width: '100% !important',
                maxWidth: '600px',
                marginLeft: '0 !important',
                textAlign: 'left',
            }}
        >
            <SearchIconWrapper>
                <FlipIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Saisissez l'ISBN de votre livre"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setIsbn(e.target.value)}
                value={isbn}
                sx={{
                    width: '100% !important',
                }}
            />
            <Button
                onClick={handleClear}
                className='materialBtn'
                sx={{
                    borderRadius: '0px',
                    minWidth: '50px',
                }}
            >
                <ClearIcon />
            </Button>
            <Button
                variant='contained'
                onClick={handleSubmitSearch}
                className='materialBtn'
                sx={{
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                }}
            >
                <SearchIcon />
            </Button>
        </Search>
    );
};

export default SearchISBNBar;
