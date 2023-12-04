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
  Container,FormControlLabel
} from '@material-ui/core';
import { Block } from 'src/pages/components-overview/Block.js';
// utils
// import { fData } from '../../../utils/formatNumber';
import fakeRequest from 'src/utils/fakeRequest.js';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths.js';
import { Link as RouterLink } from 'react-router-dom';
//
import Label from 'src/components/Label.js';
// import { UploadAvatar } from '../../upload';
// import countries from './countries';
// import Workflow from './Workflow';
// import Inviteas from './Inviteas';
// import { Work } from '@material-ui/icons';

// ----------------------------------------------------------------------

UserRoleEdit.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserRoleEdit({ isEdit }) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // const NewUserSchema = Yup.object().shape({
    //   name: Yup.string().required('Name is required'),
    //   email: Yup.string().required('Email is required').email(),
    //   avatarUrl: Yup.mixed().required('Avatar is required')
    // });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: 'Production Manager',
    },
    // validationSchema: NewUserSchema,
    // onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
    //   try {
    //     setIsSubmitting(true);
    //     await fakeRequest(500);
    //     resetForm();
    //     setIsSubmitting(false);
    //     enqueueSnackbar(!isEdit ? 'Update success' : 'Update success', { variant: 'success' });
    //     navigate(PATH_DASHBOARD.user.cards);
    //   } catch (error) {
    //     console.error(error);
    //     setSubmitting(false);
    //     setIsSubmitting(false);
    //     setErrors(error);
    //   }
    // }
  });

  const { handleSubmit, setFieldValue, getFieldProps } = formik;
  

  const permissionsData = [
    {
    id: 1,
    name: 'Partners',
    items: [
      { id: 1, itemName: 'Inviting partners', value: 10 },
      { id: 2, itemName: 'Assigning relationship managers', value: 11 },
    ],
  },
  {
    id: 2,
    name: 'Requests',
    items: [
      { id: 3, itemName: 'Create Request', value: 12 },
      { id: 4, itemName: 'Deleting request', value: 13 },
    ],
  },
  {
    id: 3,
    name: 'Onboarding',
    items: [
      { id: 5, itemName: 'Create Onboarding Workflows', value: 14 },
      { id: 6, itemName: 'Delete Onboarding workflows', value: 15 },
    ],
  },
  {
    id: 4,
    name: 'Payments',
    items: [
      { id: 7, itemName: 'Access all payments', value: 16 },
      { id: 8, itemName: 'Mark as paid', value: 17 },
    ],
  },
  {
    id: 5,
    name: 'Documents',
    items: [
      { id: 9, itemName: 'Add Document', value: 18 },
      { id: 10, itemName: 'Delete Document', value: 19 },
    ],
  },
  {
    id: 6,
    name: 'Insights',
    items: [
      { id: 11, itemName: 'Insights', value: 20 },
    ],
  },
  {
    id: 7,
    name: 'Team Members',
    items: [
      { id: 12, itemName: 'Inviting team members', value: 21 },
      { id: 13, itemName: 'Delete Onboarding workflows', value: 22 },
    ],
  },
  {
    id: 8,
    name: 'Custom Field Templates',
    items: [
      { id: 14, itemName: 'Create Custom Field Template', value: 23 },
      { id: 15, itemName: 'Delete Custom Field Template', value: 24 },
    ],
  },
  {
    id: 9,
    name: 'Questionnaire Templates',
    items: [
      { id: 16, itemName: 'Create Questionnaire Template', value: 25 },
      { id: 17, itemName: 'Delete Questionnaire Template', value: 26 },
    ],
  },
  {
    id: 10,
    name: 'Contacts',
    items: [
      { id: 18, itemName: 'Add Contact', value: 27 },
      { id: 19, itemName: 'Deactivate Contact', value: 28 },
      { id: 20, itemName: 'Delete Contact', value: 29 },
      { id: 21, itemName: 'View Contact', value: 30 },
      { id: 22, itemName: 'Edit Contact', value: 31 },
    ],
  },
  {
    id: 11,
    name: 'Leads',
    items: [
      { id: 23, itemName: 'Deactivate Lead', value: 32 },
      { id: 24, itemName: 'Add Lead', value: 33 },
      { id: 25, itemName: 'Convert Lead', value: 34 },
      { id: 26, itemName: 'Edit Lead', value: 35 },
      { id: 27, itemName: 'View Lead', value: 36 },
      
    ],
  },
  {
    id: 12,
    name: 'Opportunities',
    items: [
      { id: 28, itemName: 'Add Opportunity', value: 37 },
      { id: 29, itemName: 'Deactivate Opportunity', value: 38 },
      { id: 30, itemName: 'Delete Opportunity', value: 39 },
      { id: 31, itemName: 'Edit Opportunity', value: 40 },
      { id: 32, itemName: 'View Opportunity', value: 41 },
    ],
  },
  {
    id: 13,
    name: 'Cases',
    items: [
      { id: 33, itemName: 'Add Case', value: 42 },
      { id: 34, itemName: 'Deactivate Case', value: 43 },
      { id: 35, itemName: 'Delete Case', value: 44 },
    ],
  },
  {
    id: 14,
    name: 'Emails',
    items: [
      { id: 36, itemName: 'Add Email', value: 45 },
      { id: 37, itemName: 'Deactivate Email', value: 46 },
      { id: 38, itemName: 'Delete Email', value: 47 },
    ],
  },
  {
    id: 15,
    name: 'Calendar',
    items: [
      { id: 39, itemName: 'Calendar', value: 48 },
    ],
  },
  {
    id: 16,
    name: 'Meetings',
    items: [
      { id: 5, itemName: 'Add Meeting', value: 30 },
      { id: 6, itemName: 'Deactivate Meeting', value: 40 },
      { id: 6, itemName: 'Delete Meeting', value: 40 },
    ],
  },
  {
    id: 17,
    name: 'Calls',
    items: [
      { id: 5, itemName: 'Calls', value: 30 },
      { id: 6, itemName: 'Monitor Call', value: 40 },
      { id: 6, itemName: 'Access Call Recordings', value: 40 },
      { id: 6, itemName: 'Call Logs', value: 40 },
      { id: 6, itemName: 'Call Analytics', value: 40 },
      { id: 6, itemName: 'Call Account Setup', value: 40 },
    ],
  },
  {
    id: 18,
    name: 'SMS',
    items: [
      { id: 5, itemName: 'SMS', value: 30 },
      { id: 6, itemName: 'Whatsapp', value: 40 },
    ],
  },
  {
    id: 19,
    name: 'Tickets',
    items: [
      { id: 5, itemName: 'Add Ticket', value: 30 },
      { id: 6, itemName: 'Deactivate Ticket', value: 40 },
      { id: 6, itemName: 'Delete Ticket', value: 40 },
      { id: 6, itemName: 'View Ticket', value: 40 },
    ],
  },
  {
    id: 20,
    name: 'Campaigns',
    items: [
      { id: 5, itemName: 'Add Campaign', value: 30 },
      { id: 6, itemName: 'Deactivate Campaign', value: 40 },
      { id: 6, itemName: 'Delete Campaign', value: 40 },
      { id: 6, itemName: 'View Custom Contact Form', value: 40 },
      { id: 6, itemName: 'Edit Campaign', value: 40 },
      { id: 6, itemName: 'View Campaign', value: 40 },
      { id: 6, itemName: 'Add Custom Contact Form', value: 40 },
      { id: 6, itemName: 'Delete Custom Contact Form', value: 40 },
      { id: 6, itemName: 'Add Contact Form Field', value: 40 },
      { id: 6, itemName: 'Edit Contact Form Field', value: 40 },
      { id: 6, itemName: 'Delete Contact Form Field', value: 40 },
      { id: 6, itemName: 'View Target List', value: 40 },
      { id: 6, itemName: 'View Custom Field Settings', value: 40 },
      { id: 6, itemName: 'Change Custom Field Settings', value: 40 },
      { id: 6, itemName: 'Add Target List', value: 40 },
      { id: 6, itemName: 'Edit Target List', value: 40 },
      { id: 6, itemName: 'Delete Target List', value: 40 },
      { id: 6, itemName: 'Deactivate Target List', value: 40 },
    ],
  },
  {
    id: 21,
    name: 'Departments',
    items: [
      { id: 5, itemName: 'Add Department', value: 30 },
      { id: 6, itemName: 'Deactivate Department', value: 40 },
      { id: 6, itemName: 'Delete Department', value: 40 },
      { id: 6, itemName: 'View Department', value: 40 },
      { id: 6, itemName: 'Edit Department', value: 40 },
    ],
  },
  {
    id: 22,
    name: 'Point of Sales',
    items: [
      { id: 5, itemName: 'Products', value: 30 },
      { id: 6, itemName: 'Customer Orders', value: 40 },
    ],
  },
  {
    id: 23,
    name: 'Projects',
    items: [
      { id: 5, itemName: 'Projects', value: 30 },
    ],
  },
];
  
const initialPermissionState = permissionsData.map((permission) => {
  return {
    id: permission.id,
    name: permission.name,
    state: false,
    items: permission.items.map((item) => {
      return {
        id: item.id,
        itemName: item.itemName,
        state: false,
      };
    }),
  };
});

const [permissionState, setPermissionState] = useState(initialPermissionState);

  return (
     <Page title="User Role Edit | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs heading="User Role Edit" />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10}>
                  <Stack spacing={3}>
                    <Stack justifyContent='space-between' direction={{ xs: 'column', sm: 'column' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{mb:4}}>
                      <TextField fullWidth label="Name" {...getFieldProps('name')} />
                    </Stack>
                    {permissionState.map((permission, index) => {
                      const allChecked = permission.items.every((item) => item.state);
                      const someChecked = permission.items.some((item) => item.state);
                      return (
                        <Stack key={index} spacing={{ xs: 2, sm: 1 }}>
                          <Stack>
                            <FormControlLabel
                              label={permission.name}
                              control={
                                <Checkbox
                                  checked={allChecked}
                                  indeterminate={someChecked && !allChecked}
                                  onChange={() => {
                                    const updatedState = [...permissionState];
                                    const newState = !permission.state;
                                    updatedState[index].state = newState;
                                    updatedState[index].items = updatedState[index].items.map((item) => ({
                                      ...item,
                                      state: newState,
                                    }));
                                    setPermissionState(updatedState);
                                  }}
                                />
                              }
                            />
                            {permission.items.map((item, optionIndex) => (
                              <FormControlLabel
                                key={optionIndex}
                                sx={{ marginLeft: '40px' }}
                                label={item.itemName}
                                control={
                                  <Checkbox
                                    checked={item.state}
                                    onChange={() => {
                                      const updatedState = [...permissionState];
                                      updatedState[index].items[optionIndex].state = !item.state;
                                      const allCheckedNew = updatedState[index].items.every((item) => item.state);
                                      updatedState[index].state = allCheckedNew;
                                      setPermissionState(updatedState);
                                    }}
                                  />
                                }
                              />
                            ))}
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>

                  </Stack>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}
                      onClick={() => {
                        navigate(PATH_DASHBOARD.adminAccount.root); // Navigate to the desired page
                      }}
                      >  
                        {!isEdit ? 'Save Changes' : 'Save Changes'}
                      </LoadingButton>
                      <Button
                        variant="outlined"
                        type="submit"
                        component={RouterLink}
                        to={PATH_DASHBOARD.adminAccount.root}
                        sx={{ marginLeft: '10px' }}
                      >
                        Cancel
                      </Button>
                    </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

