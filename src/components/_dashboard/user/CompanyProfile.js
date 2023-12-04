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

CompanyProfile.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function CompanyProfile({ isEdit, currentUser }) {
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
  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const handleSavingChanges = async () => {
    try {
        setIsSavingChanges(true);
      await fakeRequest(500);
      resetForm();
      setIsSavingChanges(false);
      enqueueSnackbar('Password changed successfully', { variant: 'success' });
      // Handle password change logic here
    } catch (error) {
      console.error(error);
      // Handle error if necessary
      setIsSavingChanges(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Fusion Sign & Design',
    //   lastName: 'K',
    //   email: 'signwisesolutions@gmail.com',
      avatarUrl: 'https://signwisesolutions.com//uploads/logos/fusion_log_pic.jpg',
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

  
//   const [value, setValue] = useState(options[0]);
//   const [inputValue, setInputValue] = useState('');
//   const [dateFormatValue, setDateFormatValue] = React.useState('dd/mm/yyyy');
//   const [dateFormatInputValue, setDateFormatInputValue] = React.useState('');
//   const [timeFormatValue, setTimeFormatValue] = React.useState('12 hrs');
//   const [timeFormatInputValue, setTimeFormatInputValue] = React.useState('');
  
  

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
    <Page title="Company Profile | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Logo"        
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
                            Logo
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
            <Stack spacing={-1}>
                <HeaderBreadcrumbs
                    heading="Company Name"        
                />
                    <Stack spacing={{ xs: 3, sm: 2 }} sx={{marginTop: '20px'}}>
                      <TextField
                       fullWidth
                       label="Name"
                       {...getFieldProps('name')}
                       error={Boolean(touched.name && errors.name)}
                       helperText={touched.name && errors.name}
                      />
                    </Stack>
                </Stack>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSavingChanges} onClick={handleSavingChanges}>
                    {!isEdit ? 'Save' : 'Save'}
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
