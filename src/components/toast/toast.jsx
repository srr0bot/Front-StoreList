import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box, Slide, Alert, Stack, Snackbar, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function DirectionSnackbar({
  message,
  severity,
  autoOpen,
  duration = 3000,
  onClose,
}) {
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [severityType, setSeverityType] = useState('success');

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  useEffect(() => {
    if (message && severity) {
      setMessageText(message);
      setSeverityType(severity);
    }
  }, [message, severity]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (typeof onClose === 'function') {
      onClose(); // Llama a la función onClose pasada como prop
    }
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        TransitionComponent={TransitionRight}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        action={
          <Stack direction="row" alignItems="center">
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <Iconify icon="eva:close-outline" width={24} height={24} />
            </IconButton>
          </Stack>
        }
      >
        <Alert onClose={handleClose} severity={severityType} sx={{ width: '100%' }}>
          <Box sx={{ whiteSpace: 'pre-line' }}>{messageText}</Box>
        </Alert>
      </Snackbar>
    </div>
  );
}

DirectionSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  autoOpen: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func, // Propiedad onClose añadida para cerrar la alerta
};
