import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import phoneCallFill from '@iconify/icons-eva/phone-call-fill';
import { MIconButton } from 'src/components/@material-extend/index.js';
import { PATH_CALL } from 'src/routes/paths';
import { Block } from 'src/pages/components-overview/Block.js';
// import { Block } from '../Block';


// material
import {
  Box,
  Autocomplete,
  Checkbox,
  Button,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,Paper ,
  Divider,Avatar,Rating,IconButton
} from '@material-ui/core';
import Label from 'src/components/Label.js';
import { Popover } from '@material-ui/core';
import { Group as GroupIcon } from '@material-ui/icons';
import { Lock as LockIcon } from '@material-ui/icons';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths.js';
// utils
import { fData } from '../../../../utils/formatNumber';
//
import countries from '../countries';
import UserEdit from 'src/components/_dashboard/user/UserEdit.js';
import Request from 'src/components/_dashboard/user/profile/Request.js';
import Messages from 'src/components/_dashboard/user/profile/Messages.js';
import UserAccount from 'src/pages/dashboard/UserAccount.js';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Modal from 'src/components/_dashboard/blog/ProjectModel.js'; // replace 'path/to/Modal' with the correct path to your Modal component
import User from 'src/redux/slices/user';


// ----------------------------------------------------------------------

export default function AccountGeneral({setCurrentTab}) {
  const navigate = useNavigate()
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const [add,setAdd] = useState(false);
  const [request,setRequest] = useState(false);
  const [popup,setPopup] = useState(false);
  const [group,setGroup] = useState(false);
  const [workflows,setWorkflows] = useState(false);
  const [message,setMessage] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  const readOnlyRating = 3;
  // const [currentTab, setCurrentTab] = useState('Messages'); // Declare the currentTab state here

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }));


  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const openPopover = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const closePopover = () => {
    setPopoverAnchor(null);
  };

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

    const Request = [
      { code: 'AD', label: 'Begin Production'},
      { code: 'AE', label: 'New Quotation' },
      { code: 'AF', label: 'Request 1' },
      { code: 'AG', label: 'Signboard A'},
      { code: 'AI', label: 'Sign Request Form'},
      { code: 'AL', label: 'Request 2' },
      ] // replace with your Request data

      const Group = [
        { code: 'AD', label: 'Admin' },
        { code: 'AE', label: 'Production'},
        { code: 'AF', label: 'Design' },
        { code: 'AG', label: 'Sales'},
        ] // replace with your Request data

        const Workflows = [
        { code: 'AD', label: 'Sales and Design'},
        { code: 'AE', label: 'Tridant-Client Onboarding' },
        { code: 'AF', label: 'Offboarding Employee'},
        { code: 'AG', label: 'New Employee Onboarding' },
        { code: 'AI', label: 'Printing Service Request Form'},
        { code: 'AL', label: 'Vendor Onboarding'},
        { code: 'AM', label: 'Job Application' },
        { code: 'AO', label: 'Employee Pay' },
        { code: 'AQ', label: 'Transpotation Agent Restriction'},
        { code: 'AR', label: 'Cannabis Laboratory Registration'},
        { code: 'AS', label: 'Vendor Registration' },
        { code: 'AS', label: 'Employee Information' },
        { code: 'AS', label: 'Initial Onboarding'},
          ] // replace with your Request data

          const Relatedrequest = [
            { code: 'AD', label: 'Quote 1000'},
            { code: 'AE', label: 'Quote 101' },
            { code: 'AF', label: 'Quote 100'},
            { code: 'AG', label: 'Quote 11' },
          ] // replace with your Request data

          const Skillsorservicesrequired = [
            { code: 'AD', label: 'Cultivation'},
            { code: 'AE', label: 'Testing Lab' },
            { code: 'AF', label: 'Medical'},
            { code: 'AG', label: 'White Label' },
            { code: 'AI', label: 'Private Label'},
            { code: 'AL', label: 'Equipment Manufacture'},
            { code: 'AM', label: 'Distribution' },
            { code: 'AO', label: 'Wholesale' },
            { code: 'AQ', label: 'Retail'},
            { code: 'AR', label: 'Low MOQ'},
            { code: 'AS', label: 'Compliance' },
            { code: 'AS', label: 'Legal' },
            { code: 'AS', label: 'Purchasing'},
            { code: 'AS', label: 'Materials'},
            { code: 'AS', label: 'Label'},
          ] // replace with your Request data

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: 'Lafferty',
      email: 'lafferty@gmail.com',
      photoURL: user.photoURL,
      phoneNumber: "121333344",
      country: user.country,
      address: "Lafferty Singboard, Maryland",
      state: 'California',
      city: user.city,
      zipCode: '683123',
      about: user.about,
      isPublic: user.isPublic,
      selectworkflows:'Vendor Onboardring'
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      {!add ?
      (<>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {!message ?
        (<>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>

              <Grid container justifyContent="flex-start">
                <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                  <Box sx={{ textAlign: { sm: 'left' } }}>
                    <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                      Home Builders
                    </Label>
                  </Box>
                </Grid>
              </Grid>

            
              {/* First Section */}
              <Box sx={{ mb: 3, paddingBottom: '30px'}}>
                <UploadAvatar
                  accept="image/*"
                  file={values.photoURL}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.photoURL && errors.photoURL)}
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
                  {touched.photoURL && errors.photoURL}
                </FormHelperText>

                <Box component="fieldset" mb={3} borderColor="transparent" sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Rating name="read-only" value={readOnlyRating} readOnly />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" 
                    sx={{ cursor: 'pointer', color: 'primary.main' }}>
                      0 Reviews
                    </Typography>
                  </Stack>
                </Box>

                  <Grid item sx={{ marginTop: '20px' }}>
                    <Button
                      sx={{ marginTop: '10px' }}
                      onClick={openPopover}
                      variant="contained"
                    >
                      Actions ***
                    </Button>
                      <Popover
                        sx={{ marginTop: '40px' }}
                        open={Boolean(popoverAnchor)}
                        anchorEl={popoverAnchor}
                        onClose={closePopover}
                        anchorOrigin={{
                          vertical: 'top', // Updated to 'top'
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                      <Paper
                        sx={{
                          maxWidth: '300px', // Adjust the width as per your requirement
                          maxHeight: 200,
                          overflow: 'auto',
                          '&::-webkit-scrollbar': {
                            width: '0.4em',
                          },
                          '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            borderRadius: '4px',
                          },
                        }}
                      >
                      <Stack direction="column" spacing={2} sx={{ p: 2 }}>
                        <Typography
                          onClick={() => {
                            setMessage(true);
                            navigate(PATH_DASHBOARD.user.account); // Navigate to the desired page
                            setCurrentTab('Messages'); // Set the desired tab as active
                          }}
                          component="div"
                          variant="body1"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Send Message
                        </Typography>
                        <Typography
                          onClick={() => {
                            setRequest(!request);
                          }}
                          variant="body1"
                          component="div"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Add to Request
                        </Typography>
                        <Typography onClick={() => {setIsReviewFormOpen((prev) => !prev);}} variant="body1" component="div" sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}>
                          Add Review
                        </Typography>
                        
                        <Typography
                          onClick={() => {
                            setGroup(!group);
                          }}
                          variant="body1"
                          component="div"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Add to Group
                        </Typography>
                        <Typography
                          onClick={() => {}}
                          variant="body1"
                          component="div"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Remove Client
                        </Typography>
                        <Typography
                          onClick={() => {
                            setAdd(true);
                          }}
                          variant="body1"
                          component="div"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Edit Profile Information
                        </Typography>
                        <Typography
                          onClick={() => {
                            setWorkflows(!workflows);
                          }}
                          variant="body1"
                          component="div"
                          sx={{ cursor: 'pointer', textAlign: 'left', color: 'primary.main' }}
                        >
                          Manage On Boarding Workflows
                        </Typography>
                    </Stack>

                    </Paper>
                  </Popover>
                </Grid>
              </Box>

              <Divider sx={{ mb: 3, paddingBottom: '30px'}}/>

               {/* Second Section */}
                <Box sx={{ mx: 0, mb: 3, width: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.primary' }}>
                      Relationship managers
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <GroupIcon color="primary" fontSize="small" />
                      <Typography variant="body2" sx={{ cursor: 'pointer', color: 'primary.main' }} onClick={() => {
                                      setPopup(!popup);
                                    }}>
                        Relationship managers
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
          </Card>
          </Grid>

          <Modal
          open={popup}
          handleClose={() => {
            setPopup(false);
          }}
          modalTitle={'Set Relationship Managers'}
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
                      label="Relationship Managers"
                      placeholder="Relationship Managers"
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

        <Modal
          open={request}
          handleClose={() => {
            setRequest(false);
          }}
          modalTitle={'Add To Request'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={Request}
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
                      label="Add To Request"
                      placeholder="Add To Request"
                      error={Boolean(touched.Request && errors.Request)}
                      helperText={touched.Request && errors.Request}
                      fullWidth // add this line to make the Autocomplete component full width
                    />
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setRequest(false) }} loading={isSubmitting}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => { setRequest(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>

        <Modal
          open={group}
          handleClose={() => {
            setGroup(false);
          }}
          modalTitle={'Add To Group'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={Group}
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
                      label="Add To Group"
                      placeholder="Add To Group"
                      error={Boolean(touched.Group && errors.Group)}
                      helperText={touched.Group && errors.Group}
                      fullWidth // add this line to make the Autocomplete component full width
                    />
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setGroup(false) }} loading={isSubmitting}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => { setGroup(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>

        <Modal
          open={workflows}
          handleClose={() => {
            setWorkflows(false);
          }}
          modalTitle={'Manage Onboarding Workflows'}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off">
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>

              <TextField fullWidth label="Select Workflows" {...getFieldProps('selectworkflows')} disabled/>
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={Workflows}
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
                      label="Select Workflows"
                      placeholder="Select Workflows"
                      error={Boolean(touched.Workflows && errors.Workflows)}
                      helperText={touched.Workflows && errors.Workflows}
                      fullWidth // add this line to make the Autocomplete component full width
                    />
                  )}
                />
              </Stack>

              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <LoadingButton type="submit" variant="contained" onClick={() => { setWorkflows(false) }} loading={isSubmitting}>
                      {' Add '}
                    </LoadingButton>
                    <Button variant="outlined" onClick={() => { setWorkflows(false) }}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Modal>

          <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* First Section */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField fullWidth label="Name" {...getFieldProps('displayName')} disabled />
                <TextField fullWidth label="Email Address" {...getFieldProps('email')} disabled />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...getFieldProps('phoneNumber')}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() =>
                          window.open(PATH_CALL.root, '_blank', 'width=500,height=1000')
                        }
                      >
                        <Icon icon={phoneCallFill} width={30} height={30} color="#006097" />
                      </Button>
                    ),
                  }}
                />
                <TextField fullWidth label="City" {...getFieldProps('address')} disabled />
              </Stack>


              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} disabled />
                <TextField fullWidth label="State/Region" {...getFieldProps('state')} disabled />
              </Stack>



              {/* About Section */}
              <TextField
                {...getFieldProps('about')}
                fullWidth
                multiline
                minRows={4}
                maxRows={4}
                label="About"
              />

              {/* Save and Cancel Buttons */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', paddingBottom: 2, marginBottom: 2 }} >
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}
                component={RouterLink} to={PATH_DASHBOARD.user.cards}>
                  Save Changes
                </LoadingButton>

                <Button
                  variant="outlined"
                  type="submit"
                  component={RouterLink}
                  to={PATH_DASHBOARD.user.cards}
                  sx={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>

            <Divider sx={{ mb: 3, paddingBottom: '30px'}}/>

            {/* Second Section */}
              <Box >
                <Typography variant="h6">Groups</Typography>
                <Typography variant="body1" sx={{color: 'primary.main'}}>Traffic Solutions, Install</Typography>
              </Box>

              <Divider sx={{ mb: 3, paddingBottom: '30px'}}/>

              {/* Third Section */}
              <Box sx={{ mt: 3, display: 'flex', paddingBottom: 2, marginBottom: 2, alignItems: 'center' }}>
                {isReviewFormOpen ? (
                  <ExpandLess
                    onClick={() => {
                      setIsReviewFormOpen(false);
                    }}
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                  />
                ) : (
                  <ExpandMore
                    onClick={() => {
                      setIsReviewFormOpen(true);
                    }}
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                  />
                )}
                <Typography
                  variant="body1"
                  onClick={() => {
                    setIsReviewFormOpen((prev) => !prev);
                  }}
                  sx={{ cursor: 'pointer', color: 'primary.main' }}
                >
                  Reviews
                </Typography>
              </Box>
              {isReviewFormOpen && (
              // The form that appears when Reviews is clicked
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Stack spacing={3}> 
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}> 
                          <Grid item xs={3}>           
                            {[100].map((size, index) => (
                              <Avatar
                                key={size}
                                alt="Travis Howard"
                                src={`/static/mock-images/avatars/avatar_3.jpg`}
                                sx={{ width: size, height: size }}
                              />
                            ))}
                          </Grid>
                          
                          <TextField
                            fullWidth
                            label="Write your review here"
                            multiline
                            rows={4} // adjust the number of rows based on your design
                            placeholder="Write your review here"
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                          <Autocomplete
                            select // change the Autocomplete to use select instead of multiple
                            fullWidth
                            id="Related-request" // change the id
                            options={Relatedrequest} // change the options to Inviteas
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField
                              
                                {...params}
                                label="Add Quest"
                                placeholder="Type to add quest (optional)"
                                fullWidth // add this line to make the Autocomplete component full width
                                SelectProps={{ native: true }} // include the SelectProps
                              >
                                <option value="" />
                                {Relatedrequest.map((option) => (
                                  <option key={option.code} value={option.label}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            )}
                          />                 
                          <Autocomplete
                            multiple // change the Autocomplete to allow multiple selections
                            fullWidth
                            id="Skills-or-services-required" // change the id
                            options={Skillsorservicesrequired} // change the options to Inviteas
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Add Service"
                                placeholder="Type to add service (optional)"
                                fullWidth // add this line to make the Autocomplete component full width
                                SelectProps={{ native: true }} // include the SelectProps
                              >
                                {Skillsorservicesrequired.map((option) => (
                                  <option key={option.code} value={option.label}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            )}
                          />
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                            <div>
                              <LabelStyle>Quality</LabelStyle>
                              <Rating name="Quality" defaultValue={0} precision={0.5} />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <div>
                              <LabelStyle>Delivery</LabelStyle>
                              <Rating name="Delivery" defaultValue={0} precision={0.5} />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <div>
                              <LabelStyle>Value for money</LabelStyle>
                              <Rating name="Value-for-money" defaultValue={0} precision={0.5} />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <div>
                              <LabelStyle>Recommended</LabelStyle>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                  aria-label="like"
                                  onClick={handleLike}
                                  style={{ color: liked ? 'green' : 'inherit' }}
                                >
                                  <ThumbUpIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="dislike"
                                  onClick={handleDislike}
                                  style={{ color: disliked ? 'red' : 'inherit' }}
                                >
                                  <ThumbDownIcon />
                                </IconButton>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Stack>
                      <Stack>
                      <Box
                        sx={{
                          mt: 3,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          paddingBottom: 2,
                          marginBottom: 2,
                        }}
                        >                     
                        <Button
                          variant="contained"
                          sx={{ marginLeft: '10px' }}
                          onClick={() => {
                            setIsReviewFormOpen(false);
                          }}
                        >
                          Post Private Feedback
                        </Button>   
                        <Button
                          variant="outlined"
                          sx={{ marginLeft: '10px' }}
                          onClick={() => {
                            setIsReviewFormOpen(false);
                          }}
                        >
                          Cancel
                        </Button>                      
                      </Box>                    
                      <Stack direction="row" alignItems="center" spacing={1}
                        >
                      <LockIcon color="primary" fontSize="small" />
                      <Typography variant="body2" 
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                        }}
                        onClick={() => {}}>
                        Your feedback will only be visible to co-workers
                      </Typography>
                    </Stack>
                    </Stack>
                  </Card>
                </Grid>
              )}          
          </Card>         
        </Grid>
      </Grid>
        </>):(
          <Messages message={message} setMessage={setMessage}/>
        )}
      </Form>
      </>
        ):(
          <UserEdit add={add} setAdd={setAdd}/>
        )}
    </FormikProvider>
  );
}
