import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { useProductContext } from 'src/contexts/productContext';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
export const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export default function NewProduct({ openFilter, onOpenFilter, onCloseFilter, editData }) {
  
  const API_URL = import.meta.env.VITE_API_URL;
  
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [iva, setIva] = useState('');
  const [image, setImage] = useState('');
  const { reloadData } = useProductContext();

  useEffect(() => {
    if (editData?.data) {
      setId(editData.data._id || '');
      setName(editData.data.name || '');
      setPrice(editData.data.price || '');
      setIva(editData.data.IVA || '');
      setImage(editData.data.cover || '');
    }
  }, [editData]);

  const renderImage = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Imagen</Typography>
      <TextField
        value={image}
        label="URL"
        variant="outlined"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
    </Stack>
  );

  const renderName = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Nombre</Typography>
      <TextField
        value={name}
        label="Nombre del producto"
        variant="outlined"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </Stack>
  );

  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Valor</Typography>
      <TextField
        value={price}
        label="Valor"
        variant="outlined"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
    </Stack>
  );

  const renderIVA = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">IVA</Typography>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-iva">Seleccione IVA</InputLabel>
        <Select
          value={iva}
          label="IVA"
          onChange={(e) => {
            setIva(e.target.value);
          }}
          inputProps={{
            name: 'iva',
            id: 'outlined-iva',
          }}
        >
          <MenuItem value={0}>Sin IVA</MenuItem>
          <MenuItem value={5}>5%</MenuItem>
          <MenuItem value={19}>19%</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );

  const saveProduct = () => {
    const data = {
      name,
      price,
      IVA: iva,
      cover: image,
      state: true,
    };

    const url = editData?.data?._id
      ? `${API_URL}/products/${editData.data._id}`
      : `${API_URL}/products`;

    const method = editData?.data?._id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === (editData?.data?._id ? 200 : 201)) {
          setName('');
          setPrice('');
          setIva('');
          setImage('');
          onCloseFilter();
        }
        reloadData();
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Nuevo producto&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Nuevo producto
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderImage}

            {renderName}

            {renderPrice}

            {renderIVA}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={saveProduct}
          >
            Guardar
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

NewProduct.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  editData: PropTypes.object,
};
