import * as Yup from 'yup';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { LoadingButton } from '@material-ui/lab';
import { Autocomplete,Checkbox } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
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
  FormControlLabel,
  MenuItem,
  Menu,
} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
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
import WorkflowAddClient from './WorkFlowAddClient';
import InviteAddClient from './InviteAddClient';


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
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      Workflow : currentUser?.Workflow || '',
      Inviteas : currentUser?.Inviteas || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      isnotVerified: currentUser?.isnotVerified || false,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || ''
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

  const [additionalFields, setAdditionalFields] = useState([{ name: '', email: '' }]);

  const handleInputChange = (e, fieldName, index) => {
    const values = [...additionalFields];
    values[index] = { ...values[index], [fieldName]: e.target.value };
    setAdditionalFields(values);
  };

  const handleAddAnother = () => {
    setAdditionalFields([...additionalFields, { name: '', email: '' }]);
  };

  const handleRemove = (index) => {
    if (index > 0) {
      const values = [...additionalFields];
      values.splice(index, 1);
      setAdditionalFields(values);
    }
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

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
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }));

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
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

              {isEdit && (
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
              )}
            </Card>
          </Grid> */}

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                {additionalFields.map((field, index) => (
                <Stack
                  key={index}
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Name/Company"
                    value={field.name}
                    onChange={(e) => handleInputChange(e, 'name', index)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={field.email}
                    onChange={(e) => handleInputChange(e, 'email', index)}
                  />
                  
                  {index > 0 && (
                    <Button
                      variant="text"
                      sx={{ width: 'fit-content' }}
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
                ))}
                <Stack
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Button
                    variant="text"
                    sx={{ width: 'fit-content' }}
                    startIcon={<Icon icon={plusFill} />}
                    onClick={handleAddAnother}
                  >
                    Add Another
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    multiple
                    fullWidth
                    id="checkboxes-tags-demo"
                    options={WorkflowAddClient}
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
                        label="Search Workflows"
                        placeholder="Search Workflows"
                        error={Boolean(touched.Workflow && errors.Workflow)}
                        helperText={touched.Workflow && errors.Workflow}
                        fullWidth // add this line to make the Autocomplete component full width
                      />
                    )}
                  />

                  <Autocomplete
                    select // change the Autocomplete to use select instead of multiple
                    fullWidth
                    id="invite-as-demo" // change the id
                    options={InviteAddClient} // change the options to Inviteas
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                      
                        {...params}
                        label="Invite as"
                        placeholder="Invite as"
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                        fullWidth // add this line to make the Autocomplete component full width
                        SelectProps={{ native: true }} // include the SelectProps
                      >
                        <option value="" />
                        {InviteAddClient.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>

                
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="State/Region"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
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
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Company"
                    {...getFieldProps('company')}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
                  <TextField
                    fullWidth
                    label="Role"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack> */}

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Email clients and invite them to join your Sign Wise Solutions account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isnotVerified')} checked={values.isnotVerified} />}
                label={
                  <>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Use custom welcome message
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              {values.isnotVerified ? (
                
                <Stack spacing={{ xs: 3, sm: 2 }}>
                  <Button onClick={handleClick} endIcon={<ArrowDropDown />} sx={{ alignSelf: 'flex-end' }}>
                  Insert
                </Button>
                  <TextField fullWidth label="Subject" /> 
                <Button onClick={handleClick} endIcon={<ArrowDropDown />} sx={{ alignSelf: 'flex-end' }}>
                  Insert
                </Button>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Email Content"
                  placeholder="Type your email content here"
                  variant="outlined"
                />
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose}>Your Name</MenuItem>
                  <MenuItem onClick={handleClose}>Your Company Name</MenuItem>
                  <MenuItem onClick={handleClose}>Clients Name</MenuItem>
                </Menu>
              </Stack>
              ) : null}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton variant="contained" component={RouterLink} to={PATH_DASHBOARD.user.cards} loading={isSubmitting}>
                    { 'Add Client & Invite To SignWise' }
                  </LoadingButton>
                  <Button variant="outlined" component={RouterLink} to={PATH_DASHBOARD.user.cards} sx={{marginLeft: '10px'}}>
                      Cancel
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
