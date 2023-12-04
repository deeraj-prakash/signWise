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
  Container,Divider
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

PersonalSettings.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function PersonalSettings({ isEdit, currentUser }) {
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

  const options = ['UTC'];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Rakesh',
      lastName: 'K',
      email: 'signwisesolutions@gmail.com',
      avatarUrl: 'https://signwisesolutions.com/uploads/users/WhatsApp_Image_2019-04-18_at_22_29_35_-_Copy.jpeg',
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
        navigate(PATH_DASHBOARD.adminAccount.root);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  const [setAdd] = useState(false);
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setIsSavingChanges(true);
      await fakeRequest(500);
      resetForm();
      setIsSavingChanges(false);
      enqueueSnackbar(!isEdit ? 'Update success' : 'Update success', { variant: 'success' });
      navigate(PATH_DASHBOARD.adminAccount.root);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setErrors(error);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsChangingPassword(true);
      await fakeRequest(500);
      resetForm();
      setIsChangingPassword(false);
      enqueueSnackbar('Password changed successfully', { variant: 'success' });
      // Handle password change logic here
    } catch (error) {
      console.error(error);
      // Handle error if necessary
      setIsChangingPassword(false);
    }
  };


  
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [dateFormatValue, setDateFormatValue] = React.useState('dd/mm/yyyy');
  const [dateFormatInputValue, setDateFormatInputValue] = React.useState('');
  const [timeFormatValue, setTimeFormatValue] = React.useState('12 hrs');
  const [timeFormatInputValue, setTimeFormatInputValue] = React.useState('');
  
  

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
    <Page title="Basic Info | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Basic Info"        
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


                <Grid container justifyContent="flex-start">
                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                      <Box sx={{ textAlign: { sm: 'left' } }}>
                        <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                            Profile Picture
                        </Label>
                      </Box>
                    </Grid>
                </Grid>

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
                    label="Last Name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <Autocomplete
                    fullWidth
                    value={value}
                    options={options}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Personal Time Zone" />}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <Autocomplete
                      fullWidth
                      value={dateFormatValue}
                      options={['dd/mm/yyyy', 'mm/dd/yyyy']}
                      onChange={(event, newValue) => {
                        setDateFormatValue(newValue);
                      }}
                      inputValue={dateFormatInputValue}
                      onInputChange={(event, newInputValue) => {
                        setDateFormatInputValue(newInputValue);
                      }}
                      renderInput={(params) => <TextField {...params} label="Date Format" />}
                    />

                    <Autocomplete
                      fullWidth
                      value={timeFormatValue}
                      options={['12 hrs', '24 hrs']}
                      onChange={(event, newValue) => {
                        setTimeFormatValue(newValue);
                      }}
                      inputValue={timeFormatInputValue}
                      onInputChange={(event, newInputValue) => {
                        setTimeFormatInputValue(newInputValue);
                      }}
                      renderInput={(params) => <TextField {...params} label="Time Format" />}
                    />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Save Changes' : 'Save Changes'}
                  </LoadingButton>
                  <Button variant="outlined" type="submit" component={RouterLink} to={PATH_DASHBOARD.adminAccount.root} sx={{marginLeft: '10px'}}>
                      Cancel
                  </Button>
                </Box>
              </Stack>
            
                <Stack spacing={-1}>
                <HeaderBreadcrumbs
                    heading="Password"        
                />
                    <Stack spacing={{ xs: 3, sm: 2 }} sx={{marginTop: '20px'}}>
                      <TextField
                        fullWidth
                        label="New Password"
                      />
                    </Stack>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isChangingPassword} onClick={handleChangePassword}>
                    {!isEdit ? 'Change Password' : 'Change Password'}
                  </LoadingButton>
                  <Button variant="outlined" component={RouterLink} to={PATH_DASHBOARD.adminAccount.root} sx={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
    </Container>
    </Page> 
  );
}
