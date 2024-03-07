import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

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
  },
  item: {
    marginBottom: '10px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
  },
};

function Invoice({ products, open, handleClose }) {
  const currentDateTime = new Date().toLocaleString(); 
  const contentRef = useRef(null);
  let printWindow = null;

  const calculateTotal = () => {
    let total = 0;

    products.forEach((product) => {
      total += product.price * product.quantity;
    });

    return total;
  };

  const totalAmount = calculateTotal();

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

  // Cerrar la ventana emergente si se cancela la impresión
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
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Descripción</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Iva</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      {(product.price * (1 - product.IVA / 100)).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">{product.IVA}%</TableCell>
                    <TableCell align="right">{(product.price * product.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    TOTAL
                  </TableCell>
                  <TableCell align="right">{totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={handlePrint}>Imprimir Factura</Button>
          <Button onClick={handleCloseModal}>Cerrar Factura</Button>
        </div>
      </Box>
    </Modal>
  );
}

Invoice.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      IVA: PropTypes.number.isRequired,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Invoice;
