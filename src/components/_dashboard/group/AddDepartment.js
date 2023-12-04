import * as Yup from 'yup'
// import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { LoadingButton } from '@material-ui/lab'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Button,
} from '@material-ui/core'
import fakeRequest from '../../../utils/fakeRequest'
// routes
import Modal from '../blog/ProjectModel'

export default function AddGroup({ add, setAdd }) {
  const { enqueueSnackbar } = useSnackbar()
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500)
        resetForm()
        enqueueSnackbar('Update success', {
          variant: 'success',
        })
        // navigate(PATH_DASHBOARD.user.list)
      } catch (error) {
        console.error(error)
      }
    },
  })
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik
  return (
    <Modal
      modalTitle={'Add Department'}
      open={add == true}
      handleClose={() => {
        setAdd(false)
      }}
    >
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid
            container
            sx={{ alignItems: 'center', justifyContent: 'center' }}
            spacing={3}
          >
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Department Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setAdd(false)
                    }}
                    loading={isSubmitting}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      setAdd(false)
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
