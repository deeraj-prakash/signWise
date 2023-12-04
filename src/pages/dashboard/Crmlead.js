import * as Yup from 'yup'
// import PropTypes from 'prop-types';
import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
import { sentenceCase } from 'change-case'
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
  Container,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Link,
  FormHelperText,
  FormControlLabel,
  Button,
  Autocomplete,
  Checkbox, FormControl, FormLabel, RadioGroup, Radio,
} from '@material-ui/core'

// utils
import { fData } from 'src/utils/formatNumber'
import fakeRequest from 'src/utils/fakeRequest'
// routes
//

//component
import Scrollbar from 'src/components/Scrollbar'
import Page from 'src/components/Page'
import Label from 'src/components/Label'
import { UserListHead } from 'src/components/_dashboard/user/list'
import AddEdit from 'src/components/_dashboard/crm/AddEdit'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from 'src/routes/paths'
const LEAD = [
  { id: 0, value: 'Company not in buisness' },
  { id: 1, value: 'Researched ' },
  { id: 2, value: 'call back requested' },
  { id: 3, value: 'Does not speak English' },
  { id: 4, value: 'Send SMS' },
]
const STATUS = [
  { id: 0, value: 'Processor' },
  { id: 1, value: 'Grower' },
  { id: 2, value: 'Dispensary' },
  { id: 3, value: 'Transporter' },
  { id: 4, value: 'Software Provider' },
]
const TABLE_HEAD = [
  { id: 0, label: 'Call Status', alignRight: false },
  { id: 0, label: 'Lead Status', alignRight: false },
  { id: 1, label: 'Lead Name', alignRight: false },
  { id: 2, label: 'Phone', alignRight: false },
  { id: 2, label: 'Website Source', alignRight: false },
  { id: 3, label: 'Updated By', alignRight: false },
  { id: 6, label: 'Last Updated Time', alignRight: false },
  { id: 4, label: 'Status', alignRight: false },
  { id: 5 },
]
const DATA = [
  {
    id: 0,
    status: 'Active',
    contact_name: 'Terry Roston',
    phone: '09023579',
    source: 'https://shopappela.com/',
    by: 'John',
    update: '12/03/2021 16:38:27',
    color: '#A8DF8E',
  },
  {
    id: 2,
    status: 'in-active',
    contact_name: 'ELITE CULTIVATION, LLC',
    phone: '54654654',
    source: 'https://ilabeld.com/',
    by: 'Doe',
    update: '08/25/2021 14:50:48',
    color: '#89CFF3',
  },
  {
    id: 3,
    status: 'Active',
    phone: 97734234,
    contact_name: 'OG Holdings',
    source: 'https://ilabeld.com/',
    by: 'Mary',
    update: '07/22/2021 15:58:23',
    color: '#D71313',
  },
]
export default function Crmlead() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [add, setAdd] = useState(false)
  const [page, setPage] = useState(5)
  const [selected, setSelected] = useState([])
  const [radioValue, setRadioValue] = useState()
  const [addNote, SetAddNote] = useState([])
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Campaign Name is required'),
    budget: Yup.string().required('Budget is required'),
    target: Yup.string().required('Target is required'),
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
        enqueueSnackbar()
        navigate()
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
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }
  const HandleRadioChange = (event) => {
    setRadioValue(event.target.value)
  }
  const HandleAdd = () => {
    SetAddNote([...addNote, ''])
  }

  return (
    <Page title="All Leads:CRM leads | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="All Leads" />
        </Stack>
        {add ? (
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
                          label="Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <TextField
                          fullWidth
                          label="Phone"
                          {...getFieldProps('phone')}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                        <TextField
                          fullWidth
                          label="Brand"
                          {...getFieldProps('brand')}
                          error={Boolean(touched.brand && errors.brand)}
                          helperText={touched.brand && errors.brand}
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <Stack
                          sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <LabelStyle>Currently in business for</LabelStyle>
                          <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            options={STATUS}
                            getOptionLabel={(state) => state.value}
                            sx={{ width: 400 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Type to Search Industry"
                              />
                            )} // Update the label
                          />
                        </Stack>
                      </Stack>

                      <LabelStyle>
                        What do you do to keep up with the constant changes to
                        the industry
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <LabelStyle>
                        How do you feel about the new state tracking database
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between'
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Are you currently using a seed to sale software
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            value={radioValue}
                            onChange={(e) => {
                              HandleRadioChange(e)
                            }}
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Would you be interested in receiving our newsletter
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            value={radioValue}
                            onChange={(e) => {
                              HandleRadioChange(e)
                            }}
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                      <LabelStyle>
                        Who currently does your marketing
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <LabelStyle>
                        How does your printing and labels
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between'
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Are you currently using a marketplace to sell you products
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            value={radioValue}
                            onChange={(e) => {
                              HandleRadioChange(e)
                            }}
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                      <LabelStyle>
                        If so which one
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between'
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Do have a need for credit card processing or banking
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            value={radioValue}
                            onChange={(e) => {
                              HandleRadioChange(e)
                            }}
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                      <LabelStyle>
                        What do you see as the main problem with the industry and what would you do to change that
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 3, sm: 2 }}
                      >
                        <Stack
                          sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <LabelStyle>Status</LabelStyle>
                          <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            options={LEAD}
                            getOptionLabel={(state) => state.value}
                            sx={{ width: 400 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Type to Search Lead Status"
                              />
                            )} // Update the label
                          />
                        </Stack>
                      </Stack>
                      <LabelStyle>
                        Notes
                      </LabelStyle>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={9}
                        label=""
                        {...getFieldProps('description')}
                        error={Boolean(
                          touched.description && errors.description,
                        )}
                        helperText={touched.description && errors.description}
                      />
                      {addNote?.map((index, adding) => {
                        console.log(adding, index)
                        return (<>
                          <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={9}
                            label=""
                            {...getFieldProps('description')}
                            error={Boolean(
                              touched.description && errors.description,
                            )}
                            helperText={touched.description && errors.description}
                          />
                        </>)
                      })}

                      <Box
                        sx={{
                          mt: 3,
                          display: 'flex',
                          justifyContent: 'flex-start',

                        }}
                      >
                        <Button variant='outlined' onClick={() => { HandleAdd() }}>
                          Add Another
                        </Button>
                      </Box>

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
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        ) : (
          <Page title="create campaign | Sign-Wise Solution">
            <Container>
              <Stack
                direction="row"
                alignItems="center"
                marginBottom={2}
                justifyContent="flex-start" gap={1}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setAdd(!add)
                  }}
                >
                  Add Lead
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(PATH_DASHBOARD.crm.leadstatus)
                  }}
                >
                  Lead Statuses
                </Button>
              </Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                  <Stack spacing={3}>
                    <Stack
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: theme.palette.success.light,
                          }}
                        />
                        <Typography sx={{ pl: 1 }}>
                          Call not initiated
                        </Typography>
                      </Stack>
                      <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: theme.palette.info.light,
                          }}
                        />
                        <Typography sx={{ pl: 1 }}>
                          Call initiated no response
                        </Typography>
                      </Stack>
                      <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: theme.palette.error.dark,
                          }}
                        />
                        <Typography sx={{ pl: 1 }}>
                          3times Call initiated but no response
                        </Typography>
                      </Stack>
                      <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: theme.palette.info.main,
                          }}
                        />
                        <Typography sx={{ pl: 1 }}>Call Answered</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>

              <Card>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        //   order={order}
                        //   orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        from={'onboard'}
                      //   rowCount={userList.length}
                      //   numSelected={selected.length}
                      //   onRequestSort={handleRequestSort}
                      //   onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                        {DATA?.map((row) => {
                          const {
                            id,
                            name,
                            status,
                            phone,
                            by,
                            update,
                            color,
                            contact_name,
                            source,
                          } = row
                          const isItemSelected = selected.indexOf(id) !== -1

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, id)}
                                />
                              </TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    backgroundColor: color,
                                    width: 20,
                                    height: 20,
                                  }}
                                />
                              </TableCell>
                              <TableCell>{ }</TableCell>
                              <TableCell
                                onClick={() => {
                                  navigate(PATH_DASHBOARD.crm.viewlead)
                                }}
                                align="left"
                              >
                                {contact_name}
                              </TableCell>
                              <TableCell align="left">{phone}</TableCell>
                              <TableCell align="left">{source}</TableCell>
                              <TableCell align="center">{by}</TableCell>
                              <TableCell align="center">{update}</TableCell>
                              <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(status === 'in-active' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>

                              </TableCell>

                              <TableCell align="right">
                                <AddEdit
                                  onDelete={(id) => handleDeleteUser(id)}
                                  userName={name}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}

                      </TableBody>

                    </Table>
                  </TableContainer>
                </Scrollbar>


              </Card>
            </Container>
          </Page>
        )}
      </Container>
    </Page>
  )
}
