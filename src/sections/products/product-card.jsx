
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';

import RenderButton from './product-button';

// ---------------------------------------------------------------------

export default function ShopProductCard({ product, openFilter, onOpenFilter, onCloseFilter }) {

  let color= 'error';

    if (product.IVA === 0) {
      color = 'success';
    } else if (product.IVA === 5) {
      color = 'info';
    } else {
      color = 'error'; 
    }


    const renderStatus = (
      <Label
        variant="filled"
        color={color}
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {product.IVA === 0 ? 'Sin IVA' : `IVA: ${product.IVA}%`}
      </Label>
    );
    

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );
  

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        { renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
          <RenderButton product={product} icon="eva:shopping-cart-fill" action= "addToCart" color= 'primary' />

          <RenderButton product={product} icon="lucide:pencil" action = "edit" setOpenFilter={onOpenFilter} />
          
          <RenderButton product={product} icon="eva:trash-2-fill" action = "delete" color= 'error' />
          

        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
