// material
import { Box, Grid, Container, Typography,Button,Stack } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths.js';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
// components
import Page from 'src/components/Page.js';
import PaymentDetails from 'src/components/_dashboard/user/profile/PaymentsDetails.js';
import New1 from 'src/components/_dashboard/general-analytics/New1.js';
import Paid from 'src/components/_dashboard/general-analytics/Paid';
import AllPayments from 'src/components/_dashboard/general-analytics/AllPayments.js';

import { useNavigate, useParams } from 'react-router-dom';
import {
  AnalyticsTasks,
  AnalyticsNewUsers,
  AnalyticsBugReports,
  AnalyticsItemOrders,
  AnalyticsNewsUpdate,
  AnalyticsWeeklySales,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
} from 'src/components/_dashboard/general-analytics/index.js';


// ----------------------------------------------------------------------

export default function Payments() {
    const navigate = useNavigate()
  return (
    <Page title="Payments | SignWise Solutions">
      <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="Payments"
        />
        <Box>
        <Button
              onClick={()=>{
                navigate(PATH_DASHBOARD.payments.create)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Add New Payments
            </Button>
        </Box>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3.9}>
            <New1 />
          </Grid>
          <Grid item xs={12} sm={12} md={3.9}>
            <Paid />
          </Grid>
          <Grid item xs={12} sm={12} md={3.9}>
            <AllPayments />
          </Grid>
        </Grid>
        <Grid marginTop={'16px'} marginLeft={'-6px'}>
            <PaymentDetails />
        </Grid>
      </Container>
    </Page>
  );
}
