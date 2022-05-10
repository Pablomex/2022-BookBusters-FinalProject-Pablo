import React, { createContext, useState } from 'react';

const alertContext = createContext();

export function AlertProvider({ children }) {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const setErrorAlert = (message) => {
        setAlertMessage(message);
        setAlertType('error');
    };

    const setSuccessAlert = (message) => {
        setAlertMessage(message);
        setAlertType('success');
    };

    const setInfoAlert = (message) => {
        setAlertMessage(message);
        setAlertType('info');
    };

    const alert = {
        alertMessage,
        alertType,
        setAlertMessage,
        setAlertType,
        setErrorAlert,
        setSuccessAlert,
        setInfoAlert,
    };

    return (
        <alertContext.Provider value={alert}>{children}</alertContext.Provider>
    );
}

export default alertContext;
