import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

const VentaDetalle = ({ venta }) => {
  if (!venta) {
    return <div>Cargando...</div>;
  }


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Hora</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Productos</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{new Date(venta.date).toLocaleDateString()}</TableCell>
          <TableCell>{new Date(venta.date).toLocaleTimeString()}</TableCell>
          <TableCell>{venta.client.email}</TableCell>
          <TableCell>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>IVA</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {venta.products.map((productoVenta) => (
                  <TableRow key={productoVenta._id}>
                    <TableCell>{productoVenta.product.name}</TableCell>
                    <TableCell>{productoVenta.product.IVA}%</TableCell>
                    <TableCell>{productoVenta.product.price}</TableCell>
                    <TableCell>{productoVenta.quantity}</TableCell>
                    <TableCell>{productoVenta.product.price * productoVenta.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
          <TableCell>{venta.totalAmount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

VentaDetalle.propTypes = {
  venta: PropTypes.shape({
    date: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    client: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        product: PropTypes.shape({
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          IVA: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
};

export default VentaDetalle;
