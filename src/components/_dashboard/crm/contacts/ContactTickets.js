import {
  Container,
  Grid,
  Button,
  Stack,
  Card,
  Box,
  Switch,
  TextField,
  Typography,
  Link,
  FormHelperText,
  Autocomplete,
  FormControlLabel,
  IconButton,
  Icon,
  Tooltip,Checkbox,Table,TableBody,TableHead,TableCell,TableRow,
  TableContainer,
} from '@material-ui/core'
// import { Icon } from '@iconify/react';
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import * as Yup from 'yup'
// import PropTypes from 'prop-types';
import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
import { LoadingButton, MobileDatePicker } from '@material-ui/lab'
//componenets
import { fData } from 'src/utils/formatNumber'
import fakeRequest from 'src/utils/fakeRequest'
import Scrollbar from 'src/components/Scrollbar'
// routes
import { PATH_DASHBOARD } from 'src/routes/paths'
//
import Label from 'src/components/Label'
import { UploadAvatar, UploadSingleFile } from 'src/components/upload'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { QuillEditor } from 'src/components/editor'
import { ContactSupport } from '@material-ui/icons'

//
const STATUS = [
  { id: 0, name: 'New' },
  { id: 1, name: 'In-Progress' },
  { id: 2, name: 'In-Testing' },
  { id: 3, name: 'Completed' },
  { id: 4, name: 'Cancelled' },
]
const PROJECT = [
  { id: 0, name: 'Zeta' },
  { id: 1, name: 'Lafferty' },
  { id: 2, name: 'Rubiks-Built' },
  { id: 3, name: 'Element 79' },
]
export default function ContactTickets() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [add, setAdd] = useState(false)
  const [open, setOpen] = useState(false)

  const isEdit = false
  const NewUserSchema = Yup.object().shape({
    ticket: Yup.string().required('Ticket Name is required'),
    project: Yup.string().required('Project is required'),
    
  })
  //
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }))
  //
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500)
        resetForm()
        setSubmitting(false)
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', {
          variant: 'success',
        })
        navigate(PATH_DASHBOARD.user.list)
      } catch (error) {
        console.error(error)
        setSubmitting(false)
        setErrors(error)
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
    <Container>
      {!add ? (
        <>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            marginTop={'-50px'}
            marginBottom={'20px'}
          >
            <Grid item>
              <Button variant="outlined">All Jobs</Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.info.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                New
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                In Progress
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.warning.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                In Testing
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.success.light,
                  color: theme.palette.info.contrastText,
                }}
              >
                Completed
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                Cancelled
              </Button>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={() => setAdd(!add)}>
            Add new
          </Button>
          <Card sx={{ mt: 2 }}>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: 160 }} align='center'>Task Name</TableCell>
                <TableCell align='center'>Completion %</TableCell>
                <TableCell align='center'>Task in Total</TableCell>
                <TableCell align='center'>Completed Tasks</TableCell>
                <TableCell align='center'>Pending Tasks</TableCell>
                               
              </TableRow>
            </TableHead>
            <TableBody>
              <Typography>No data available</Typography>
             
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
        </>
      ) : (
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <TextField
                        fullWidth
                        label="Ticket Name"
                        {...getFieldProps('ticket')}
                        error={Boolean(touched.ticket && errors.ticket)}
                        helperText={touched.ticket && errors.ticket}
                      />
                      <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={PROJECT}
                        getOptionLabel={(state) => state.name}
                        // sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Project" />
                        )} // Update the label
                      />
                    </Stack>
                    <div>
                      <LabelStyle>Ticket Overview</LabelStyle>
                      <QuillEditor
                        simple
                        id="product-description"
                        value={values.description}
                        onChange={(val) => setFieldValue('description', val)}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                      />
                    </div>

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <Box
                        component={MobileDatePicker}
                        label="Start Date"
                        value={values.start}
                        onChange={(date) => setFieldValue('start', date)}
                        renderInput={(params) => (
                          <TextField size="small" {...params} fullWidth />
                        )}
                      />
                      <Box
                        component={MobileDatePicker}
                        label="Due Date"
                        value={values.end}
                        onChange={(date) => setFieldValue('end', date)}
                        renderInput={(params) => (
                          <TextField size="small" {...params} fullWidth />
                        )}
                      />
                    </Stack>

                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LabelStyle>Ticket Status</LabelStyle>
                        <Tooltip title="Status">
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
                          <TextField {...params} label="Status" />
                        )} // Update the label
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                        <LabelStyle>Assign Yourself To Job</LabelStyle>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Selecting this option will add you to the Job Team." />

                    </Stack>
                    <Box
                      sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
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
                        Add
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
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      )}
    </Container>
  )
}
