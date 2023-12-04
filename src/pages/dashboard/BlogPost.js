import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box,
   Card, Grid,
   Divider,TextField,
    Skeleton,
     Container,
      Typography,
       Pagination,
        Stack,
         Button, 
        } from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPost, getRecentPosts } from '../../redux/slices/blog';
import { LoadingButton } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserList from './UserList';
import Modal from '../../components/_dashboard/blog/ProjectModel';
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function BlogPost() {
  const dispatch = useDispatch();
  const { title } = useParams();
  const { post, error, recentPosts } = useSelector((state) => state.blog);
  const [add,setAdd] = useState(false)
  useEffect(() => {
    dispatch(getPost(title));
    dispatch(getRecentPosts(title));
  }, [dispatch, title]);
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
    <Page title="Blog: Post Details | SignWise Solutions">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="All Project Type"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            // { name: sentenceCase(title) }
          ]}
        />
        <Box>
        <Button
              onClick={()=>{setAdd(!add)}}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Add 
            </Button>
        </Box>
        </Stack>
         <UserList from='Project Type'/>  
         <Modal
          open={add ==true}
          handleClose={()=>{setAdd(false)}}
          modalTitle={'Add Project Type'}>
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
        {/* {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )} */}

        {/* {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}

        {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
      </Container>
    </Page>
  );
}
