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
import ProductsInvoiceToolbar from 'src/components/_dashboard/e-commerce/invoice/ProductsInvoiceToolbar.js';

// ----------------------------------------------------------------------

const INVOICE = {
  id: faker.datatype.uuid(),
  taxes: 5,
  discount: 10,
  status: 'paid',
  invoiceFrom: {
    name: faker.name.findName(),
    address: 'DieSachbearbeiter Choriner Straße 49 10435 Berlin',
    company: faker.company.companyName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat()
  },
  invoiceTo: {
    name: faker.name.findName(),
    address: 'Keas 69 Str. 15234, Chalandri Athens, Greece',
    company: faker.company.companyName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat()
  },
  items: [...Array(1)].map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.lines(),
    qty: faker.datatype.number({ min: 1, max: 5 }),
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 })
  }))
};

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function Payments() {
  const subTotal = sum(INVOICE.items.map((item) => item.price * item.qty));
  const total = subTotal - INVOICE.discount + INVOICE.taxes;

  return (
    <Page title="Payments: Invoice | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoice' }
          ]}
        />

        <ProductsInvoiceToolbar invoice={INVOICE} />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box component="img" alt="logo" src="/static/mock-images/avatars/avatar_default1.jpg" sx={{ height: 98 }} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  New
                </Label>
                <Typography variant="h6">Generated On : 10/17/2023</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>
              <Grid item xs={12} sm={6} sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box component="img" alt="logo" src="https://signwisesolutions.com/uploads/products/IMG_0172.JPG" sx={{ height: 98, marginRight: 2 }} />
                <Typography variant="body2">Lennar</Typography>
             </Grid>
            </Grid>
          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Partner</TableCell>
                    <TableCell align="left">Due</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                    {/* <TableCell align="right">Total</TableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {INVOICE.items.map((row, index) => (
                    <TableRow
                    //   key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">Signboard</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            Double Face Post mounted Sign
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">10/17/2023</TableCell>
                      <TableCell align="right">$1500.00</TableCell>
                      {/* <TableCell align="right">{fCurrency(1200 * 100)}</TableCell> */}
                    </TableRow>
                  ))}

                  {/* <RowResultStyle>
                    <TableCell colSpan={2} /> */}
                    {/* <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">$1300</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Discount</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography sx={{ color: 'error.main' }}>$100</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle> */}
                    <TableCell colSpan={3} />
                    {/* <TableCell align="right">
                      <Typography variant="body1">Taxes</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography variant="body1">$50</Typography>
                    </TableCell> */}
                  {/* </RowResultStyle> */}
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="center" width={10}>
                      <Typography variant="h6">$1500</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or extra notes let us know!
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@signwise.com</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
