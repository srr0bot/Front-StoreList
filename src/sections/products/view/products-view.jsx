import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useProductContext } from 'src/contexts/productContext';

import NewProduct from '../product-new';
import ProductCard from '../product-card';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [editData, setEditData] = useState(null);
  const [type, setType] = useState('cliente');
  const { reload } = useProductContext();

  const handleOpenFilter = (product) => {
    setEditData({ isOpen: true, data: product });
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setEditData(null);
    setOpenFilter(false);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
     setType(localStorage.getItem('type'));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Productos
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {type === 'admin' && (
            <NewProduct
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              editData={editData}
            />
          )}
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              onOpenFilter={() => handleOpenFilter(product)}
              onCloseFilter={handleCloseFilter}
            />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
