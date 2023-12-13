import PropTypes from 'prop-types';

import { Box, Link, Grid, Paper, Button, styled, Typography, ButtonGroup } from '@mui/material';

import { useProductContext } from 'src/contexts/productContext';

export default function ProductItem({ product }) {
  const { cover, name, price, quantity } = product;

  const { handleAddToCart, handleDeleteToCart } = useProductContext();
  const handleIncrement = () => {
    handleAddToCart(product);
  };

  const handleDecrement = () => {
    handleDeleteToCart(product);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        <Box
          component="img"
          alt={name}
          src={cover}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Item style={{ textAlign: 'left' }}>
          <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
            Producto: {name}
          </Link>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Precio: {price}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Cantidad: {quantity}
          </Typography>
        </Item>
      </Grid>

      <Grid item xs={12} md={4}>
        <Item>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="text"
          >
            <Button size="small" color="success" variant="outlined" onClick={handleIncrement}>
              +
            </Button>
            <Button size="small" color="error" variant="outlined" onClick={handleDecrement}>
              -
            </Button>
          </ButtonGroup>
        </Item>
      </Grid>
    </Grid>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};
