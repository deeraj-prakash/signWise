import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Box, TextField, Checkbox,Typography, Autocomplete, Stack,Skeleton, Card, CardContent, IconButton, Tooltip  } from '@material-ui/core';
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { Link, Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import linkFill from '@iconify/icons-eva/link-fill';
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/user';
import { PATH_DASHBOARD } from '../../routes/paths';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Popbar from 'src/layouts/dashboard/Popbar';
import AllClients from '../../pages/dashboard/AllClients';
// routes
import { PATH_PAGE } from 'src/routes/paths.js';
// components
import CopyClipboard from 'src/components/CopyClipboard.js';
import { Form, FormikProvider, useFormik } from 'formik';
import Modal from '../../components/_dashboard/blog/ProjectModel'; // replace 'path/to/Modal' with the correct path to your Modal component
import { ContactSupport } from '@material-ui/icons';

const Workflow = [
{ code: 'AD', label: 'Sales and Design', phone: '376' },
{ code: 'AE', label: 'Tridant-Client Onboarding', phone: '971' },
{ code: 'AF', label: 'Offboarding Employee', phone: '93' },
{ code: 'AG', label: 'New Employee Onboarding', phone: '1-268' },
{ code: 'AI', label: 'Printing Service Request Form', phone: '1-264' },
{ code: 'AL', label: 'Vendor Onboarding', phone: '355' },
{ code: 'AM', label: 'Job Application', phone: '374' },
{ code: 'AO', label: 'Employee Pay', phone: '244' },
{ code: 'AQ', label: 'Transpotation Agent Restriction', phone: '672' },
{ code: 'AR', label: 'Cannabis Laboratory Registration', phone: '54' },
{ code: 'AS', label: 'Vendor Registration', phone: '1-684' },
{ code: 'AS', label: 'Employee Information', phone: '1-684' },
{ code: 'AS', label: 'Initial Onboarding', phone: '1-684' },
] // replace with your workflow data

const Inviteas = [
  { code: 'AD', label: 'General Contractor', phone: '376' },
  { code: 'AE', label: 'Home Builders', phone: '971' },
  { code: 'AF', label: 'MultiFamily', phone: '93' },
  { code: 'AG', label: 'Home Assosiations', phone: '1-268' },
  { code: 'AI', label: 'Single Family', phone: '1-264' },
  { code: 'AL', label: 'Retail Buyer', phone: '355' },
  { code: 'AM', label: 'Client', phone: '374' },
  { code: 'AO', label: 'Sub Contractor', phone: '244' },
  { code: 'AQ', label: 'Inner Division', phone: '672' },
  { code: 'AR', label: 'Hybrid', phone: '54' },
  { code: 'AS', label: 'Seller', phone: '1-684' },
  { code: 'AS', label: 'Buyer', phone: '1-684' },
  { code: 'AS', label: 'Vendor', phone: '1-684' },
] // replace with your invite data

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

const STATUS = [
  { id: 0, name: 'Sales And Design' },
  { id: 1, name: 'Offboarding-Employee' },
  { id: 2, name: 'New Employee Onboarding' },
  { id: 3, name: 'Vender Onboarding' },
  { id: 4, name: 'Employee Pay' },
]
const ROLES=[
  { id: 0, name: 'Admin ' },
  { id: 1, name: 'Demo Role' },
  { id: 2, name: 'Sample Project Role' },
  { id: 3, name: 'QA' },
  { id: 4, name: 'Printer' },
]
export default function UserCards() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [add,setAdd] = useState(false);
  const [open, setOpen] = useState(false)
  const [link,setLink] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
  const NewUserSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    Password: Yup.string().required('password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    tags: Yup.string().required('Tags is required'),
    rfq: Yup.string().required('RFQ is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
    
  });
//
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }));
  //
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
    
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();

      } catch (error) {
        console.error(error);

      }
    }
  });

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFormSubmit = () => {
    // Handle form submission here
  };

  return (
    <Page title="User: Cards | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="All Team Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Clients', href: PATH_DASHBOARD.user.root },
            { name: 'All Clients' }
          ]}
          
        />

        <Grid container spacing={2} alignItems="center" justifyContent="flex-end" marginTop={'-50px'} marginBottom={'20px'}>
              <Grid item>
                <Button
                  variant="contained"
                //   component={RouterLink}
                //   to={PATH_DASHBOARD.user.newUser}
                onClick={()=>setAdd(!add)}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add Team Member
                </Button>
              </Grid>
        </Grid>

        <Popbar />

        <Modal
          open={add}
          handleClose={() => {
            setAdd(false);
          }}
          modalTitle={'Add Team Members'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
            <Grid container justifyContent="center" >
            <Grid item xs={12} md={10}>
            {/* <Card sx={{ p: 3 }}> */}
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('fname')}
                    error={Boolean(touched.fname && errors.fname)}
                    helperText={touched.fname && errors.fname}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('lname')}
                    error={Boolean(touched.lname && errors.lname)}
                    helperText={touched.lname && errors.lname}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    type='email'
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                   <TextField
                    fullWidth
                    label="Password"
                    {...getFieldProps('Password')}
                    error={Boolean(touched.Password && errors.Password)}
                    helperText={touched.Password && errors.Password}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
               <Button variant='outlined'>Add Another</Button>
               </Stack>
               <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LabelStyle>Select onboarding workflows</LabelStyle>
                        <Tooltip title="Description">
                          <IconButton
                            onClick={() => setOpen(!open)}
                            sx={{
                              position: 'relative',
                              marginLeft: '2px',                             
                            }}
                          >
                            <ContactSupport />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                      <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={STATUS}
                        getOptionLabel={(state) => state.name}
                        // sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Type to search workflows" />
                        )} // Update the label
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LabelStyle>User Roles</LabelStyle>
                        <Tooltip title="Description">
                          <IconButton
                            onClick={() => setOpen(!open)}
                            sx={{
                              position: 'relative',
                              marginLeft: '2px',                             
                            }}
                          >
                            <ContactSupport />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                      <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={ROLES}
                        getOptionLabel={(state) => state.name}
                        // sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Status" />
                        )} // Update the label
                      />
                    </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end',gap:1 }}>
                  <Button type="submit" variant="contained" onClick={()=>{setAdd(false)}} loading={isSubmitting}>
                   ADD TO SIGN WISE SOLUTIONS
                  </Button>
                 
                </Box>
              </Stack>
            
          </Grid>
            </Grid>
             
            </Form>
          </FormikProvider>
        </Modal>

        <Modal
          open={link}
          handleClose={() => {
            setLink(false);
          }}
          modalTitle={'Generated Links'}
        >
      <Container maxWidth="lg">
          <h4>Vendor Onboarding</h4>
          <CardContent>
          <CopyClipboard value="https://signwisesolutions.com/access-invite-link/1748ee3def72ee8947b43977f190c35a" />
          </CardContent>
          <h4>Offboarding Employee</h4>
          <CardContent>
          <CopyClipboard value="https://signwisesolutions.com/access-invite-link/da4d54d9a72b22958a42408e555b52e7" />
          </CardContent>
          <h4>Tridant-Client Onboarding</h4>
          <CardContent>
          <CopyClipboard value="https://signwisesolutions.com/access-invite-link/62628cfac6dc3a6ac2e93e1d7ae26c2a" />
          </CardContent>
          <h4>Vendor Onboarding</h4>
          <CardContent>
          <CopyClipboard value="https://signwisesolutions.com/access-invite-link/aefa475d23291ee57ec8fbf487a66c58" />
          </CardContent>
          <h4>Initial Onboarding</h4>
          <CardContent>
          <CopyClipboard value="https://signwisesolutions.com/access-invite-link/a38918662fa2516d187f0880b71a265d" />
          </CardContent>    
      </Container>
        </Modal>

        <AllClients isAdmin />

        {/* <Grid container spacing={3} style={{marginTop: '50px'}}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <AllClients/>
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
        </Grid> */}
      </Container>
    </Page>
  );
}
