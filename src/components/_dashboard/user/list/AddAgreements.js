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
  Autocomplete,
  Container,Checkbox
} from '@material-ui/core';

// utils
import { fData } from 'src/utils/formatNumber.js';
import fakeRequest from 'src/utils/fakeRequest.js';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths.js';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
import Page from 'src/components/Page.js';
//
// import Label from 'src/components/Label.js';
// import { UploadAvatar} from 'src/components/upload/index.js';
// import AddTicketProjects from 'src/components/_dashboard/user/AddTicketProjects.js';
// import AddTicketStatus from 'src/components/_dashboard/user/AddTicketStatus.js';
import { Link as RouterLink } from 'react-router-dom';
import { QuillEditor } from 'src/components/editor/index.js';



export default function AddSignAgreements (){
    const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme()
  const [selectedFile, setSelectedFile] = useState(null);
  const isEdit = false;
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
        navigate(PATH_DASHBOARD.user.account);
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
    <Page title="Create Sign Agreement | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="Create Sign Agreement"
        /></Stack>
        <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={15}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack>
                  
                    <TextField
                      fullWidth
                      label="Agreement Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack>
                  <LabelStyle>Agreement</LabelStyle>
                  <QuillEditor
                    simple
                    id="agreement"
                    value={values.Category}
                    onChange={(val) => setFieldValue('Category', val)}
                    error={Boolean(touched.Category && errors.Category)}
                  />
                  {touched.Category && errors.Category && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.Category && errors.Category}
                    </FormHelperText>
                  )}
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
                  <LoadingButton type="submit" variant="contained" component={RouterLink} to={PATH_DASHBOARD.signagreements.root} loading={isSubmitting}>
                    {!isEdit ? 'Save Agreement' : 'Save Agreement'}
                  </LoadingButton>
                  <Button variant="outlined" type="submit" component={RouterLink} to={PATH_DASHBOARD.signagreements.root} sx={{marginLeft: '10px'}}>
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