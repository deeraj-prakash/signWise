import * as Yup from 'yup'
// import PropTypes from 'prop-types';
import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { LoadingButton, MobileDatePicker } from '@material-ui/lab'
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
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
} from '@material-ui/core'

// utils
import { fData } from '../../../utils/formatNumber'
import fakeRequest from '../../../utils/fakeRequest'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
//
import Label from '../../Label'
import { UploadAvatar, UploadSingleFile } from '../../upload'

import countries from '../user/countries'
import Modal from '../blog/ProjectModel'
//state
const States = [
  { id: 1, name: 'Alabama' },
  { id: 2, name: 'Alaska' },
  { id: 3, name: 'Arizona' },
  { id: 4, name: 'Arkansas' },
  { id: 5, name: 'California' },
  { id: 6, name: 'Colorado' },
  { id: 7, name: 'Connecticut' },
  { id: 8, name: 'Delaware' },
  { id: 9, name: 'Florida' },
  { id: 10, name: 'Georgia' },
  { id: 11, name: 'Hawaii' },
  { id: 12, name: 'Idaho' },
  { id: 13, name: 'Illinois' },
  { id: 14, name: 'Indiana' },
  { id: 15, name: 'Iowa' },
]
const Orders=[
    { id: 1, name: 'Order 1' },
    { id: 2, name: 'Order 2' },
    { id: 3, name: 'Order 3' },
    { id: 4, name: 'Order 4' },
    { id: 5, name: 'Order 5' },
    { id: 6, name: 'Order 6' },
    { id: 7, name: 'Order 7' },
    { id: 8, name: 'Order 8' },
    { id: 9, name: 'Order 9' },
]
export default function AddGroup({ add, setAdd }) {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [Values, setValue] = useState('')
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    city: Yup.string().required('City is required'),
  })
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }))
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
      modalTitle={'Add Groups'}
      open={add == true}
      handleClose={() => {
        setAdd(false)
      }}
    >
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', }} spacing={3}>
            <Grid item xs={12} md={8}>
              {/* <Card sx={{ p: 3 }}> */}
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Group Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <Autocomplete
                    fullWidth                  
                    id="combo-box-demo"
                    options={States}
                    getOptionLabel={(state) => state.name}
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )} // Update the label
                  />
                  {/* // */}
                  <Autocomplete
                    multiple
                    fullWidth
                    id="tags-outlined"
                    options={Orders}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[States[3]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Link Orders"
                        placeholder="Favorites"
                      />
                    )}
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
              {/* </Card> */}
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Modal>
  )
}
