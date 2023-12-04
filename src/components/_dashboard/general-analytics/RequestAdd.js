import * as Yup from 'yup';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
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
  FormControlLabel,CardHeader,IconButton
} from '@material-ui/core';
import { AddCircle } from "@material-ui/icons";
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink } from 'react-router-dom';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import Modal from 'src/components/_dashboard/blog/ProjectModel.js';



// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};



export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [popup,setPopup] = useState(false);

  const Workflow = [
    { code: 'AD', label: 'Eli White' },
    { code: 'AE', label: 'John Manager' },
    { code: 'AF', label: 'Installer' },
    { code: 'AG', label: 'Install Coordinator' },
    { code: 'AI', label: 'Printer All' },
    { code: 'AL', label: 'Fab Cnc' },
    { code: 'AM', label: 'Fabricator Welder' },
    { code: 'AO', label: 'Fabricator Cutting And Sending'},
    { code: 'AQ', label: 'Painter Prep' },
    { code: 'AR', label: 'Quality Check Wrap' },
    ] // replace with your workflow data

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
    //   name: currentUser?.name || '',
    //   email: currentUser?.email || '',
    //   phoneNumber: currentUser?.phoneNumber || '',
    //   address: currentUser?.address || '',
    //   country: currentUser?.country || '',
    //   Workflow : currentUser?.Workflow || '',
    //   Inviteas : currentUser?.Inviteas || '',
    //   state: currentUser?.state || '',
    //   city: currentUser?.city || '',
    //   zipCode: currentUser?.zipCode || '',
    //   isVerified: currentUser?.isVerified || true,
    //   isnotVerified: currentUser?.isnotVerified || true,
    //   status: currentUser?.status,
    //   company: currentUser?.company || '',
    //   role: currentUser?.role || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
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
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={15}>
          <Card sx={{ pb: 3 }}>
            <CardHeader title='Team' sx={{ mb: 3 }}/>
            <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <IconButton 
                  onClick={() => {
                   setPopup(!popup);
                  }}>
                    <AddCircle sx={{width:40,height:40}}/>
                </IconButton>
            </Stack>
            </Stack>
          </Card>

         <Modal
          open={popup}
          handleClose={() => {
            setPopup(false);
          }}
          modalTitle={'Add Peoples To This Requests'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={Workflow}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox checked={selected} />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Team"
                      placeholder="Search Team"
                      error={Boolean(touched.Workflow && errors.Workflow)}
                      helperText={touched.Workflow && errors.Workflow}
                      fullWidth // add this line to make the Autocomplete component full width
                    />
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setPopup(false) }} loading={isSubmitting}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => { setPopup(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>
        </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
