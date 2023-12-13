
import PropTypes from 'prop-types';

import { Stack, IconButton } from '@mui/material';

import { useProductContext } from 'src/contexts/productContext';

import Iconify from 'src/components/iconify';

export default function RenderButton({ product, icon, action, setOpenFilter, color }) {
  const { handleAddToCart, reloadData } = useProductContext();

  const handleClick = () => {
    if (action === 'addToCart') {
      handleAddToCart(product);
    } else if (action === 'edit') {
      setOpenFilter(true, product);
    } else if (action === 'delete') {
     
      fetch(`http://localhost:3000/products/${product._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        reloadData();

      });
    }
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <IconButton color={color} aria-label="add to shopping cart" onClick={handleClick}>
        <Iconify icon={icon}  width={24} height={24} />
      </IconButton>
    </Stack>
  );
}

RenderButton.propTypes = {
  product: PropTypes.object,
  icon: PropTypes.string,
  action: PropTypes.string,
  setOpenFilter: PropTypes.func,
  color: PropTypes.string,
};
