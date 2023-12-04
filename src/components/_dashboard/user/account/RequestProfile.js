import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Box, Grid, Card, Button, Typography, Stack } from '@material-ui/core';
// redux
import { useSelector } from '../../../../redux/store';
// utils
import fakeRequest from '../../../../utils/fakeRequest';
//
import AccountBillingAddressBook from './AccountBillingAddressBook';

import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import RequestProfileDetails from 'src/components/_dashboard/user/account/RequestProfileDetails.js';


// ----------------------------------------------------------------------

export default function RequestProfile() {
  const { cards, invoices, addressBook } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await fakeRequest(500);
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={7}>
      <Grid item xs={12} md={5}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
            Medical
            </Typography>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
            Medical Purpose
            </Typography>
          </Card>
        </Stack>
        
      </Grid>

      <Grid item xs={12} md={7}>
      <RequestProfileDetails />
      </Grid>
      
    </Grid>
  );
}
