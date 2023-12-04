// material
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import {
   Container,
   Button,
    Stack,Box,
    Grid,TextField,
   } from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../../components/_dashboard/blog';
import UserList from './UserList';
import { LoadingButton } from '@material-ui/lab';
import Modal from '../../components/_dashboard/blog/ProjectModel';
import { useState } from 'react';
// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const [add,setAdd] = useState(false)
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),  
  });
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
  return (
    <Page title="Blog: New Post | SignWise Solutions">
      <Container>    
        <HeaderBreadcrumbs
          heading="All Project Categories"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' }
          ]}
          action={
            <Button
             onClick={()=>{setAdd(!add)}}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Add 
            </Button>
          }
        />  
          
        {/* <BlogNewPostForm /> */}
        <UserList />
        <Modal
          open={add ==true}
          handleClose={()=>{setAdd(false)}}
          modalTitle={'Add Project Category'}>  
            <FormikProvider value={formik}>
    <Form noValidate autoComplete="off">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center',gap:1 }}>
                  <LoadingButton type="submit" variant="contained" onClick={()=>{setAdd(false)}} loading={isSubmitting}>
                    {' Save '} 
                  </LoadingButton>
                  <Button variant="outlined" type="submit" onClick={()=>{setAdd(false)}}>
                    Cancel
                  </Button>
                </Box>
        </Grid>
      </Grid>
    </Form>
  </FormikProvider>
         </Modal>
      </Container>
    </Page>
  );
}
