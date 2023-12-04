import * as Yup from 'yup';
// import PropTypes from 'prop-types';
import { useCallback ,useState} from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton,MobileDatePicker } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Link,
  FormHelperText,
  FormControlLabel,
  Button,
  Container
} from '@material-ui/core';

// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
import Page from 'src/components/Page.js';
//
import Label from '../../Label';
import { UploadAvatar, UploadSingleFile } from '../../upload';
import { Link as RouterLink } from 'react-router-dom';

import countries from '../user/countries';

export default function AddProject ({add,setAdd}){
    const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme()
  const [selectedFile, setSelectedFile] = useState(null);
  const isEdit =false
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    sh_name: Yup.string().required('Price is required'),
    Type: Yup.string().required('Special Price is required'),
    Category: Yup.string().required('Description is required'),
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
    //    name: currentUser?.name || '',
    //   email: currentUser?.email || '',
    //   phoneNumber: currentUser?.phoneNumber || '',
    //   address: currentUser?.address || '',
    //   country: currentUser?.country || '',
    //   state: currentUser?.state || '',
    //   city: currentUser?.city || '',
    //   zipCode: currentUser?.zipCode || '',
    //   avatarUrl: currentUser?.avatarUrl || null,
    //   isVerified: currentUser?.isVerified || true,
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
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

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
   const UploadImage=(e)=>{
    const file = e.target.files[0];
    setSelectedFile(file);
   }
  return (
    <Page title="Add Products | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading=" Add Products"
        /></Stack>
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
              <LabelStyle>Thumbnail</LabelStyle>
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
                {/* <LabelStyle>Approved Design</LabelStyle> */}

                {/* <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )} */}
                    
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

              {/* <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    {...getFieldProps('sh_name')}
                    error={Boolean(touched.sh_name && errors.sh_name)}
                    helperText={touched.sh_name && errors.sh_name}
                  />
                </Stack>
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="RFQ"
                    {...getFieldProps('rfq')}
                    error={Boolean(touched.rfq && errors.rfq)}
                    helperText={touched.rfq && errors.rfq}
                  />
                   <TextField
                    fullWidth
                    label="Tags"
                    {...getFieldProps('tags')}
                    error={Boolean(touched.tags && errors.tags)}
                    helperText={touched.tags && errors.tags}
                  />
                </Stack> */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                        fullWidth
                        label="Special Price"
                        {...getFieldProps('Type')}
                        error={Boolean(touched.Type && errors.Type)}
                        helperText={touched.Type && errors.Type}
                      />
    
                    <TextField
                        fullWidth
                        label="Description"
                        {...getFieldProps('Category')}
                        error={Boolean(touched.Category && errors.Category)}
                        helperText={touched.Category && errors.Category}
                      />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <Box
                    component={ MobileDatePicker }
                    label="Start Date"
                     value={values.start}
                    onChange={(date) => setFieldValue('start', date)}
                    renderInput={(params) => (
                      <TextField size="small" {...params} fullWidth />
                    )}
                    />
                      <Box
                    component={ MobileDatePicker }
                    label="End Date"
                     value={values.end}
                    onChange={(date) => setFieldValue('end', date)}
                    renderInput={(params) => (
                      <TextField size="small" {...params} fullWidth />
                    )}
                    />
                </Stack>
                
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Project Type"
                    {...getFieldProps('Type')}
                    error={Boolean(touched.Type && errors.Type)}
                    helperText={touched.Type && errors.Type}
                  />
                  <TextField
                    fullWidth
                    label="URL"
                    {...getFieldProps('URL')}
                    error={Boolean(touched.URL && errors.URL)}
                    helperText={touched.URL && errors.URL}
                    InputProps={{
                        endAdornment: (
                          <Link href={getFieldProps('URL').value} target="_blank" rel="noopener noreferrer">
                            
                          </Link>
                        ),
                      }}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack> */}

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
                </Stack> */}
                {/* <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={7}
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  /> */}
    
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" component={RouterLink} to={PATH_DASHBOARD.products.root} loading={isSubmitting}>
                    {!isEdit ? 'Add Products' : 'Add Products'}
                  </LoadingButton>
                  <Button variant="outlined" type="submit" component={RouterLink} to={PATH_DASHBOARD.products.root} sx={{marginLeft: '10px'}}>
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