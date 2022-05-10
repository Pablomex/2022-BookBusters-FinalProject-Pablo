import React, { useContext } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

import alertContext from "../../contexts/AlertContext";

const AlertContainer = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alert() {
  const { alertMessage, alertType, setAlertMessage, setAlertType } =
    useContext(alertContext);

  const handleClose = () => setAlertMessage("");

  return (
    <Snackbar
      open={alertMessage.length > 0 && alertType.length > 0}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <AlertContainer
        onClose={handleClose}
        severity={alertType}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </AlertContainer>
    </Snackbar>
  );
}
