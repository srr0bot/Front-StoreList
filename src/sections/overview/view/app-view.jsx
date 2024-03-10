import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Stack, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  // eslint-disable-next-line no-unused-vars
  const [salesData, setSalesData] = useState([]);
  const [statisticsMonth, setStatisticsMonth] = useState([]);
  const [statisticsByIva, setStatisticsByIva] = useState([]);
  const [salesByIva, setSalesByIva] = useState([]);
  const [salesByIvaSL, setSalesByIvaSL] = useState([]);
  const [summarySales, setSummarySales] = useState([]);
  const [statisticsVisits, setStatisticsVisits] = useState([]);
  const [statisticsVisitsByMonthYear, setStatisticsVisitsByMonthYear] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateVisits, setCurrentDateVisits] = useState(new Date());

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [selectedMonthVisits, setSelectedMonthVisits] = useState(currentDateVisits.getMonth() + 1);
  const [selectedYearVisits, setSelectedYearVisits] = useState(currentDateVisits.getFullYear());

  // Generar los options para los meses
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));

  // Generar los options para los años (desde 2020 hasta el año actual)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 2019 }, (_, i) => ({
    value: currentYear - i,
    label: currentYear - i,
  }));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthvisitsChange = (event) => {
    setSelectedMonthVisits(event.target.value);
  };

  const handleYearVisitsChange = (event) => {
    setSelectedYearVisits(event.target.value);
  };

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

  useEffect(() => {
    fetch(`http://localhost:3000/sales/getByMonth/${selectedMonth}/${selectedYear}`)
      .then((response) => response.json())
      .then((data) => {
        setStatisticsMonth(data.data.statistics);
        setStatisticsByIva(data.data.groupedByIva);
        setSalesByIva(data.data.salesByIva);
        setSalesByIvaSL(data.data.salesByIvaSL);
        setSummarySales(data.data.summary);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetch(`http://localhost:3000/activity/${currentDateVisits.toISOString().split('T')[0]}`)
      .then((response) => response.json())
      .then((data) => {
        setStatisticsVisits(data.count);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentDateVisits, setStatisticsVisits]);

  useEffect(() => {
    fetch(`http://localhost:3000/activity/${selectedMonthVisits}/${selectedYearVisits}`)
      .then((response) => response.json())
      .then((data) => {
        setStatisticsVisitsByMonthYear(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedMonthVisits, selectedYearVisits]);

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

  const renderStatisticsByMount = (
    <>
      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-month-label">Mes</InputLabel>
          <Select
            labelId="select-month-label"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Mes"
          >
            {monthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-year-label">Año</InputLabel>
          <Select
            labelId="select-year-label"
            value={selectedYear}
            onChange={handleYearChange}
            label="Año"
          >
            {yearOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={12} md={6} lg={8}>
        <AppConversionRates
          title={`Ventas de ${selectedMonth}/${selectedYear}`}
          subheader="Análisis de las ventas en la fecha seleccionada"
          chart={{
            series: statisticsMonth.map((sale) => ({
              label: sale.productName,
              value: sale.totalAmount,
            })),
          }}
          data={salesByIva}
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title={`Ventas de ${selectedMonth}/${selectedYear}`}
          chart={{
            series: statisticsMonth.map((sale) => ({
              label: sale.productName,
              value: sale.totalAmount,
            })),
          }}
        />
      </Grid>

      <Grid xs={12} md={12} lg={12}>
        {statisticsByIva && statisticsByIva.series && statisticsByIva.series.length > 0 && (
          <AppWebsiteVisits
            title="Ventas por IVA"
            subheader={`Analisis de vetas por IVA para la fecha: ${selectedMonth}/${selectedYear}`}
            data={salesByIva}
            data2={salesByIvaSL}
            invoce
            isDate
            chart={{
              labels: statisticsByIva.labels,
              series: [
                // Configuración para la primera serie
                {
                  ...statisticsByIva.series[0],
                  fill: 'solid',
                  type: 'column',
                },
                // Configuración para la segunda serie
                {
                  ...statisticsByIva.series[1],
                  fill: 'solid',
                  type: 'column',
                },
                // Configuración para la tercera serie
                {
                  ...statisticsByIva.series[2],
                  fill: 'solid',
                  type: 'column',
                },
              ],
            }}
          />
        )}
      </Grid>
    </>
  );

  const renderStatisticsVisits = (
    <>
      <Grid item xs={12} sm={12} md={4}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Fecha</Typography>
          <TextField
            type="date"
            defaultValue={currentDate.toISOString().split('T')[0]}
            label="Valor"
            variant="outlined"
            onChange={(e) => {
              setCurrentDateVisits(new Date(e.target.value));
            }}
          />
        </Stack>
      </Grid>
      <Grid xs={12} md={12} lg={12}>
        {statisticsVisits && statisticsVisits.series && statisticsVisits.series.length > 0 && (
          <AppWebsiteVisits
            title="Registro de actividad"
            subheader={`Analisis de registro de actividad: ${selectedMonth}/${selectedYear}`}
            invoce={false}
            isDate={false}
            chart={{
              labels: statisticsVisits.labels,
              series: [
                {
                  ...statisticsVisits.series[0],
                  fill: 'solid',
                  type: 'line',
                },
                {
                  ...statisticsVisits.series[1],
                  fill: 'gradient',
                  type: 'area',
                },
              ],
            }}
          />
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-month-label">Mes</InputLabel>
          <Select
            labelId="select-month-label"
            value={selectedMonthVisits}
            onChange={handleMonthvisitsChange}
            label="Mes"
          >
            {monthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="select-year-label">Año</InputLabel>
          <Select
            labelId="select-year-label"
            value={selectedYearVisits}
            onChange={handleYearVisitsChange}
            label="Año"
          >
            {yearOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={12} md={12} lg={12}>
        {statisticsVisitsByMonthYear &&
          statisticsVisitsByMonthYear.series &&
          statisticsVisitsByMonthYear.series.length > 0 && (
            <AppWebsiteVisits
              title="Registro de actividad"
              subheader={`Analisis de registro de actividad : ${selectedMonthVisits}/${selectedYearVisits}`}
              invoce={false}
              isDate
              chart={{
                labels: statisticsVisitsByMonthYear.labels,
                series: [
                  {
                    ...statisticsVisitsByMonthYear.series[0],
                    fill: 'solid',
                    type: 'line',
                  },
                  {
                    ...statisticsVisitsByMonthYear.series[1],
                    fill: 'solid',
                    type: 'line',
                  },
                ],
              }}
            />
          )}
      </Grid>
    </>
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Estadisticas
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          {summarySales.mostSoldProduct && (
            <AppWidgetSummary
              title="Ventas totales"
              total={summarySales.totalSales}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          )}
          {renderInputDate}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          {summarySales.mostSoldProduct && (
            <AppWidgetSummary
              title="Total de usuarios"
              total={summarySales.totalUsers}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          )}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          {summarySales.mostSoldProduct && (
            <AppWidgetSummary
              title={`Producto más vendido - ${summarySales.mostSoldProduct.productName}`}
              total={summarySales.mostSoldProduct.totalSold}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          )}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        {summarySales.mostSoldProduct && (
          <AppWidgetSummary
            title={`Producto menos vendido ${summarySales.leastSoldProduct.productName}`}
            total={summarySales.leastSoldProduct.totalSold}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        )}
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

        {renderStatisticsByMount}
        {renderStatisticsVisits}
      </Grid>
    </Container>
  );
}
