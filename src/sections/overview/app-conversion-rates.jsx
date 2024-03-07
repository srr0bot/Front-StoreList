import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppConversionRates({ title, subheader, chart, ...other }) {
  const { colors, series, options } = chart;
  const [totalSales, setTotalSales] = useState(0);

  // Calcula el total de ventas al montar el componente o cuando cambia el array de series
  useEffect(() => {
    const total = series.reduce((acc, curr) => acc + curr.value, 0);
    setTotalSales(total);
  }, [series]);

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={`${subheader} - Total ventas: ${fNumber(totalSales)}`}
      />

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppConversionRates.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
