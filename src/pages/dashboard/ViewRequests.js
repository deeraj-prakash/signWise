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
import RequestViewTabs from 'src/pages/dashboard/RequestViewTabs.js';
import RequestAdd from 'src/components/_dashboard/general-analytics/RequestAdd.js';


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
import Label from 'src/components/Label.js';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { MIconButton } from 'src/components/@material-extend/index.js';



// ----------------------------------------------------------------------

export default function Payments() {
    const navigate = useNavigate()
  return (
    <Page title="View Requests | SignWise Solutions">
      <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="quote 1000"
        />
            <Grid item xs={12} sm={10} sx={{ mb: 5 }}>
              <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  Accepted
            </Label>
            </Grid>

            <MIconButton>
                <Icon icon={moreVerticalFill} width={20} height={20} />
            </MIconButton>
        </Stack>
            <Grid item xs={12} sm={10} sx={{ mb: 5 , marginTop: '-40px'}}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              RFQ
              </Typography>
            </Grid>
        <Box>
        <Button
              sx={{marginTop: '-50px'}}
              onClick={()=>{
                navigate(PATH_DASHBOARD.user.invoice)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             RFQ Details
            </Button>

            <Button variant="outlined" type="submit" sx={{marginTop: '-50px', marginLeft: '10px'}} onClick={()=>{navigate(PATH_DASHBOARD.user.account)}}>
                    Cancel
                  </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <RequestViewTabs />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <RequestAdd />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
