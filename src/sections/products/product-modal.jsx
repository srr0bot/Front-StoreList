import * as React from 'react';
import { PropTypes } from 'prop-types';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useProductContext } from 'src/contexts/productContext';

import Invoice from './product-invoice';
import ProductItem from './product-cart-item';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose, open }) {
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { products, setProducts } = useProductContext();

  const [showInvoice, setShowInvoice] = React.useState(false); // Estado para controlar la apertura de la factura

  const handleOpenInvoice = () => {
    setShowInvoice(true); // Abre el modal de la factura al hacer clic en el botón "Ver Factura"
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false); // Cierra el modal de la factura
  };

  const handleSave = () => {
    // handleClose();

    const totalAmount = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const productsToSave = products.map((product) => ({
      product: product._id,
      quantity: product.quantity,
    }));

    const data = {
      date: new Date(),
      products: productsToSave,
      totalAmount,
      client: localStorage.getItem('userId'),
    };

    fetch(`${API_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
        setProducts([]);
        handleClose();
      }
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Carrito
          </Typography>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
          <Button onClick={handleOpenInvoice}>Ver Factura</Button>
          <Button onClick={handleSave}>Comprar</Button>
        </Box>
      </Modal>
      <Invoice open={showInvoice} handleClose={handleCloseInvoice} products={products} />
    </>
  );
}

BasicModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
