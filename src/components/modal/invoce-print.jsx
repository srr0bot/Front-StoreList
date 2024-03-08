import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = {
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxHeight: '80vh', // Establece una altura máxima para el modal
    overflowY: 'auto', // Habilita el desplazamiento vertical cuando sea necesario
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
  },
};

function ModalInvoice({ open, handleClose, additionalContent }) {
  const currentDateTime = new Date().toLocaleString();
  const contentRef = useRef(null);
  let printWindow = null;

  useEffect(() => {
    // Actualiza el tamaño del modal cuando se abre para asegurar el desplazamiento si es necesario
    if (contentRef.current) {
      contentRef.current.parentElement.parentElement.parentElement.parentElement.style.display =
        open ? 'flex' : 'none';
    }
  }, [open]);

  const handlePrint = () => {
    const printContent = contentRef.current.innerHTML;
    printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Factura</title></head><body>');
    printWindow.document.write('<style>');
    const stylesheets = Array.from(document.styleSheets);
    stylesheets.forEach(sheet => {
      try {
        if (sheet.cssRules) {
          printWindow.document.write(sheet.cssRules[0].cssText);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    });
    printWindow.document.write('</style>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleCloseModal = () => {
    if (printWindow) {
      printWindow.close();
    }
    handleClose();
  };

  window.onafterprint = () => {
    if (printWindow) {
      printWindow.close();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="invoice-modal-title"
      aria-describedby="invoice-modal-description"
      style={styles.modalContainer}
    >
      <Box sx={styles.modalContent}>
        <div ref={contentRef}>
          <Typography variant="h4" gutterBottom style={styles.title}>
            SHOP NAME
          </Typography>
          <Typography variant="h6" gutterBottom style={styles.title}>
            CASH RECEIPT
          </Typography>
          <Typography variant="subtitle2" gutterBottom style={styles.title}>
            Fecha y Hora: {currentDateTime}
          </Typography>
          {additionalContent}
          <Button onClick={handlePrint}>Imprimir Factura</Button>
          <Button onClick={handleCloseModal}>Cerrar Factura</Button>
        </div>
      </Box>
    </Modal>
  );
}

ModalInvoice.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  additionalContent: PropTypes.node // Acepta cualquier contenido de React
};

export default ModalInvoice;
