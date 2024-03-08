import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

import Chart, { useChart } from 'src/components/chart';
import ModalInvoice from 'src/components/modal/invoce-print';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({
  title,
  subheader,
  subheader2,
  chart,
  data,
  data2,
  ...other
}) {
  const { labels, colors, series, options } = chart;
  const [tableInvoce, setTableInvoce] = React.useState();

  const [showInvoice, setShowInvoice] = React.useState(false);

  const handleOpenInvoice = () => {
    setTableInvoce(tableInvoceSL);
    setShowInvoice(true);
  };

  const handleOpenInvoice2 = () => {
    setTableInvoce(tableInvoceDate);
    setShowInvoice(true);
  };
  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} Ventas`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  const totalMonth = Object.values(data)
    .flatMap((sales) => sales)
    .reduce((total, sale) => total + sale.totalAmount * sale.products.productPrice, 0)
    .toFixed(2);

  const totalMonthProducts = Object.values(data)
    .flatMap((sales) => sales)
    .reduce((total, sale) => total + sale.totalAmount, 0)
    .toFixed(0);

  const tableInvoceDate = (
    <>
      {Object.entries(data).map(([iva, sales]) => (
        <div key={iva}>
          <Typography variant="h6" gutterBottom>
            {iva}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Nombre del Producto</TableCell>
                  <TableCell align="right">Valor sin IVA</TableCell>
                  <TableCell align="right">Valor con IVA</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Total Pagado</TableCell>
                </TableRow>
                {sales.map((sale) => (
                  <TableRow key={sale.saleId}>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.products.productName}</TableCell>
                    <TableCell align="right">
                      {(sale.products.productPrice * (1 - sale.products.IVA / 100)).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{sale.products.productPrice}</TableCell>
                    <TableCell align="right">{sale.products.productQuantity}</TableCell>
                    <TableCell align="right">
                      {(sale.products.productQuantity * sale.products.productPrice).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    TOTAL
                  </TableCell>
                  <TableCell align="right">
                    {sales.reduce((total, sale) => total + sale.products.productQuantity, 0)}
                  </TableCell>
                  <TableCell align="right">
                    {sales
                      .reduce(
                        (total, sale) =>
                          total + sale.products.productQuantity * sale.products.productPrice,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
     <div>
        <TableContainer>
          <Table>
            <TableBody>

              <TableRow>
                <TableCell >
                  <Typography variant="h6">Total del mes</Typography>
                </TableCell>
                <TableCell align="right">
                  <b>{totalMonthProducts}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{totalMonth}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );

  const tableInvoceSL = (
    <>
      {Object.entries(data2).map(([iva, sales]) => (
        <div key={iva}>
          <Typography variant="h6" gutterBottom>
            {iva}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nombre del Producto</TableCell>
                  <TableCell align="right">Valor sin IVA</TableCell>
                  <TableCell align="right">Valor con IVA</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Total Pagado</TableCell>
                </TableRow>
                {sales.map((sale) => (
                  <TableRow key={sale.saleId}>
                    <TableCell>{sale.products.productName}</TableCell>
                    <TableCell align="right">
                      {(sale.products.productPrice * (1 - sale.products.IVA / 100)).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{sale.products.productPrice}</TableCell>
                    <TableCell align="right">{sale.products.productQuantity}</TableCell>
                    <TableCell align="right">
                      {(sale.products.productQuantity * sale.products.productPrice).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    TOTAL
                  </TableCell>
                  <TableCell align="right">
                    {sales.reduce((total, sale) => total + sale.products.productQuantity, 0)}
                  </TableCell>
                  <TableCell align="right">
                    {sales
                      .reduce(
                        (total, sale) =>
                          total + sale.products.productQuantity * sale.products.productPrice,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
      <div>
        <TableContainer>
          <Table>
            <TableBody>

              <TableRow>
                <TableCell >
                  <Typography variant="h6">Total del mes</Typography>
                </TableCell>
                <TableCell align="right">
                  <b>{totalMonthProducts}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{totalMonth}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={
            <>
              <div>{subheader}</div>
              <div>{subheader2}</div>
            </>
          }
          action={
            <>
              <Button onClick={handleOpenInvoice} aria-label="Ver en factura simple">
                Ver en factura simple
              </Button>
              <Button onClick={handleOpenInvoice2} aria-label="Ver en factura por fechas">
                Ver en factura por fechas
              </Button>
            </>
          }
        />
        <Box sx={{ p: 3, pb: 1 }}>
          <Chart
            dir="ltr"
            type="line"
            series={series.map((item) => ({
              name: ` ${item.name} - Productos: ${item.totalProducts} - $${item.totalPrice}`, // Nombre de la serie
              data: item.data, // Datos de la serie
              fill: item.fill, // Tipo de relleno de la serie
              type: item.type, // Tipo de gráfico de la serie
            }))}
            options={chartOptions}
            width="100%"
            height={364}
          />
        </Box>
      </Card>

      <ModalInvoice
        open={showInvoice}
        handleClose={handleCloseInvoice}
        additionalContent={tableInvoce}
      />
    </>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  subheader2: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  data2: PropTypes.object,
};
