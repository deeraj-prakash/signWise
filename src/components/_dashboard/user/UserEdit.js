import * as Yup from 'yup';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
import Page from 'src/components/Page.js';
// material
import { LoadingButton } from '@material-ui/lab';
import { Autocomplete,Checkbox } from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  Container
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import Workflow from './Workflow';
import Inviteas from './Inviteas';
import { Work } from '@material-ui/icons';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // Workflow: Yup.string().required('Workflow is required'),
    // Inviteas: Yup.string().required('Invite as is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Lafferty',
      email: 'lafferty@gmail.com',
      phoneNumber: '121333344',
      address: 'Lafferty Singboard, Maryland',
      country: currentUser?.country || '',
      Workflow : currentUser?.Workflow || '',
      Inviteas : currentUser?.Inviteas || '',
      state: 'California',
      city: 'Maryland',
      zipCode: '683123',
      avatarUrl: '/static/mock-images/avatars/avatar_default1.jpg',
      isVerified: currentUser?.isVerified || true,
      isnotVerified: currentUser?.isnotVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: '321424324234234'
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Update success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.cards);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  const [setAdd] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <Page title="User Edit | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="User Edit"        
        />
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>

              {/* {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('status', event.target.checked ? 'banned' : 'active')}
                      checked={values.status !== 'active'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )} */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Name/Company"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    fullWidth
                    label="Fax Number"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  
                    <TextField
                     fullWidth
                     label="Address"
                     {...getFieldProps('address')}
                     error={Boolean(touched.address && errors.address)}
                     helperText={touched.address && errors.address}
                    />
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>

                <TextField
                    fullWidth
                    label="State/Region"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>


                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <Autocomplete
                    select // change the Autocomplete to use select instead of multiple
                    fullWidth
                    id="partner-type-as-demo" // change the id
                    options={Workflow} // change the options to Inviteas
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                      
                        {...params}
                        label="Partner Type"
                        placeholder="Partner Type"
                        fullWidth // add this line to make the Autocomplete component full width
                        SelectProps={{ native: true }} // include the SelectProps
                      >
                        <option value="" />
                        {Workflow.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    )}
                    />

                  <Autocomplete
                    select // change the Autocomplete to use select instead of multiple
                    fullWidth
                    id="invite-as-demo" // change the id
                    options={Inviteas} // change the options to Inviteas
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                      
                        {...params}
                        label="Rank"
                        placeholder="Rank"
                        fullWidth // add this line to make the Autocomplete component full width
                        SelectProps={{ native: true }} // include the SelectProps
                      >
                        <option value="" />
                        {Inviteas.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Save Changes' : 'Save Changes'}
                  </LoadingButton>
                  <Button variant="outlined" type="submit" component={RouterLink} to={PATH_DASHBOARD.user.cards} sx={{marginLeft: '10px'}}>
                      Cancel
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
    </Container>
    </Page> 
  );
}
