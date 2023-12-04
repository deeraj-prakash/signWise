import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Card, Stack, Switch, Typography, FormControlLabel } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useSelector } from '../../../../redux/store';
// utils
import fakeRequest from '../../../../utils/fakeRequest';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'activityComments',
    label: '"Lorem ipsum dolor sit amet,Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    value: 'activityAnswers',
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  { value: 'activityFollows', label: 'Lorem ipsum dolor sit amet, Ut enim ad minim veniam, nisi ut aliquip ex ea commodo consequat.' }
];

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'Signboard announcements' },
  { value: 'applicationProduct', label: 'Weekly signboard updates' },
  { value: 'applicationBlog', label: 'Weekly signboard production' }
];

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();
  const { notifications } = useSelector((state) => state.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activityComments: notifications.activityComments,
      activityAnswers: notifications.activityAnswers,
      activityFollows: notifications.activityFollows,
      applicationNews: notifications.applicationNews,
      applicationProduct: notifications.applicationProduct,
      applicationBlog: notifications.applicationBlog
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Activity
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {ACTIVITY_OPTIONS.map((activity) => (
                  <FormControlLabel
                    key={activity.value}
                    control={<Switch {...getFieldProps(activity.value)} checked={values[activity.value]} />}
                    label={activity.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              {/* <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Application
              </Typography> */}
              {/* <Stack spacing={1} alignItems="flex-start">
                {APPLICATION_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    control={<Switch {...getFieldProps(item.value)} checked={values[item.value]} />}
                    label={item.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack> */}
            </Stack>

            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton> */}
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
