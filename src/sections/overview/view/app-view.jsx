import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  // eslint-disable-next-line no-unused-vars
  const [salesData, setSalesData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState(new Date());



  useEffect(() => {
    // Formatear la fecha a un formato adecuado, por ejemplo, YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Hacer la solicitud al back-end para obtener los datos
    fetch(`http://localhost:3000/sales/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los datos obtenidos del back-end
        setSalesData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentDate]);

  const renderInputDate = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Fecha</Typography>
      <TextField
        type="date"
        defaultValue={currentDate.toISOString().split('T')[0]}
        label="Valor"
        variant="outlined"
        onChange={(e) => {
          setCurrentDate(new Date(e.target.value));
        }}
      />
    </Stack>
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Estadisticas
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
           {renderInputDate}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
       

       
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
           title={`Ventas del ${currentDate.toLocaleDateString()}`}
           subheader="Análisis de las ventas en la fecha seleccionada"
            chart={{
              series: salesData.map((sale) => ({
                label: sale.productName,
                value: sale.totalAmount,
              })),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title={`Ventas del ${currentDate.toLocaleDateString()}`}
            chart={{
              series: salesData.map((sale) => ({
                label: sale.productName,
                value: sale.totalAmount,
              })),
            }}
          />
        </Grid>


    
      </Grid>
    </Container>
  );
}
