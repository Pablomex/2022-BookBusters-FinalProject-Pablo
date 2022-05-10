import React, { useEffect, useContext, useState } from 'react';

import './style.scss';

import {
    Html5QrcodeScanner,
    Html5QrcodeScanType,
    Html5QrcodeSupportedFormats,
} from 'html5-qrcode';

import { searchBookByISBN } from '../../api/fetchApi';
import bookContext from '../../contexts/BookContext';
import alertContext from '../../contexts/AlertContext';

const ScannerConfig = {
    // Prefer back (environment) or front (portrait) camera
    facingMode: 'environment',
    //focusMode: 'continuous',
    fps: 10,
    qrbox: { width: 200, height: 100 },
    rememberLastUsedCamera: true,
    // Set to false to prevent mirrored camera
    disableFlip: false,
    // Only support camera scan type, not file photo import
    supportedScanTypes: [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA,
        // Html5QrcodeScanType.SCAN_TYPE_FILE,
    ],
    // Restrict barcode format to EAN_13
    formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
    experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
    },
    // videoConstraints: {
    //     focusMode: 'continuous',
    //     facingMode: 'environment',
    // },
};

const Scan = () => {
    const isbnRegexp = /^97[8-9]\d{10}$/;
    const [scanner, setScanner] = useState();
    const { openedBook, setOpenedBook } = useContext(bookContext);
    const { setErrorAlert, setSuccessAlert } = useContext(alertContext);


    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            'reader',
            ScannerConfig,
            false,
        );

        setScanner(html5QrcodeScanner);

        async function onScanSuccess(decodedText, decodedResult) {
            let errors;

            html5QrcodeScanner.pause();

            const scannedISBN = decodedText;

            if (
                scannedISBN &&
                scannedISBN.length === 13 &&
                isbnRegexp.test(scannedISBN)
            ) {
                setSuccessAlert(
                    `le code barre n° ${scannedISBN} a été scanné.\nRecherche en cours...`,
                );


                const response = await searchBookByISBN(scannedISBN);
                if (response.data.length === 0) {
                    errors = `Aucun livre avec cet isbn : ${scannedISBN}, n'a été trouvé.`;
                } else {
                    setOpenedBook(response.data);
                    setSuccessAlert('');
                }
            } else {
                errors =
                    `Le code barre scanné : ${scannedISBN}, n'est pas valide.`;
                html5QrcodeScanner.resume();
            }

            if (errors) {
                return setErrorAlert(errors);
            }
        }

        html5QrcodeScanner.render(onScanSuccess);
    }, []);

    useEffect(() => {
        if (scanner) {
            if (!openedBook && scanner.getState() === 3) {
                scanner.resume();
                console.log(scanner.getState());
            } else if (scanner.getState() === 2) {
                scanner.pause();
            }
        }
    }, [openedBook]);

    return (
        //<div id='scanner'>
            <div id='reader'></div>
        //</div>
    );
};

export default Scan;
