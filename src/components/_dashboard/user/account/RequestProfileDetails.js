import faker from 'faker';
import { sum } from 'lodash';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths.js';
// utils
import { fCurrency } from 'src/utils/formatNumber.js';
// components
import Page from 'src/components/Page.js';
import Label from 'src/components/Label.js';
import Scrollbar from 'src/components/Scrollbar.js';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
import RequestsToolbar from 'src/components/_dashboard/e-commerce/invoice/RequestsToolbar';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function RequestProfileDetails() {


  return (
    <Page>
      <Container>
        <HeaderBreadcrumbs
        />
        <Card sx={{ pt: 5, px: 5 , marginTop: '-50px'}}>
          <Grid container>
            <Grid item xs={12} sm={30} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Budget
              </Typography>
              <Grid item xs={12} sm={30}>
                <Typography variant="body2">Price Unknown</Typography>
             </Grid>
            </Grid>

            <Grid item xs={12} sm={30} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Response need to be submitted by
              </Typography>
              <Grid item xs={12} sm={30}>
                <Typography variant="body2">08/16/2023</Typography>
             </Grid>
            </Grid>

            <Grid item xs={12} sm={30} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Submission deadline passed
              </Typography>
              <Grid item xs={12} sm={30}>
                <Typography variant="body2">Participation Ends : 08/31/2023</Typography>
             </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
