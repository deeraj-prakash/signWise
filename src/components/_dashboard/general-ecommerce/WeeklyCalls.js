import { merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    key: 1,
    year: 'OCT 21',
    data: [
      { name: 'Total Inbound Calls', data: [1, 2, 3, 4, 4, 3, 1, 2, 4] },
      { name: 'Total Outbound Calls', data: [1, 1, 1, 1, 1, 2, 1, 2, 3] },
      { name: 'Total Missed Calls', data: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: 'Total Answered Calls', data: [5, 5, 5, 5, 5, 4, 4, 5, 5] },
    ]
  },
];

export default function YearlySales() {
  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['21 OCT', '22 OCT', '23 OCT', '24 OCT', '25 OCT', '26 OCT', '27 OCT', '28 OCT', '29 OCT']
    }
  });

  return (
    <Card>
      <CardHeader
        title="Calls"
        subheader="Calculated in last 7 days"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.key} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.key} sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type="area" series={item.data} options={chartOptions} height={364} />
        </Box>
      ))}
    </Card>
  );
}
