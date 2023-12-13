import * as React from 'react';
import { PropTypes } from 'prop-types';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useProductContext } from 'src/contexts/productContext';

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
  const { products, setProducts } = useProductContext();

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
    };


    fetch('http://localhost:3000/sales', {
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

        <Button onClick={handleSave}>Guardar</Button>
      </Box>
    </Modal>
  );
}

BasicModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
