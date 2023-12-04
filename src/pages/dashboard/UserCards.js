import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Box, TextField, Checkbox, Autocomplete, Stack,Skeleton, Card, CardContent  } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
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


export default function UserCards() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [add,setAdd] = useState(false);
  const [link,setLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formik, setFormik] = useState({
    // Your formik state here
  });

  const touched = {};
  const errors = {};

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
          heading=" All Clients"
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
                  component={RouterLink}
                  to={PATH_DASHBOARD.user.newUser}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Add Client
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setAdd(!add);
                  }}
                  variant="contained"
                  startIcon={<Icon icon={linkFill} />}
                >
                  Get Invite Link
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={() => {
                    setLink(!link);
                  }}
                  variant="contained"
                  startIcon={<Icon icon={linkFill} />}
                >
                  Generated Links
                </Button>
              </Grid>
        </Grid>

        <Popbar />

        <Modal
          open={add}
          handleClose={() => {
            setAdd(false);
          }}
          modalTitle={'Get Invite Link'}
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
                  options={Inviteas} // change the options to Inviteas
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
                      {Inviteas.map((option) => (
                        <option key={option.code} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setAdd(false) }} loading={isSubmitting}>
                      {' Save '}
                    </LoadingButton>
                    <Button variant="outlined" type="submit" onClick={() => { setAdd(false) }}>
                      Cancel
                    </Button>
                  </Box>
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

        <AllClients />

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
