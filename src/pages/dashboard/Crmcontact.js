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
  Switch,Container, TableContainer,
  Table,TableCell,TableHead,TableBody,TableRow,TablePagination,
  TextField,
  Typography,
  Link,
  FormHelperText,
  FormControlLabel,
  Button,
  Autocomplete,
  Checkbox,
} from '@material-ui/core'

// utils
import { fData } from 'src/utils/formatNumber'
import fakeRequest from 'src/utils/fakeRequest'
import { sentenceCase } from 'change-case'
// routes
//

//component
import Scrollbar from 'src/components/Scrollbar'
import Page from 'src/components/Page'
import { UserListHead } from 'src/components/_dashboard/user/list'
import AddEdit from 'src/components/_dashboard/crm/AddEdit'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from 'src/routes/paths'
import Label from 'src/components/Label'
const Media = [
  { id: 0, value: 'Web' },
  { id: 1, value: 'email ' },
  { id: 2, value: 'Television' },
  { id: 3, value: 'Radio' },
  { id: 4, value: 'Newsletter' },
]
const STATUS = [
  { id: 0, value: 'Planning' },
  { id: 1, value: 'Active ' },
  { id: 2, value: 'In Active' },
  { id: 3, value: 'Completed' },
]
const TABLE_HEAD=[      
    { id: 0, label: 'Call Status', alignRight: false },
    { id: 1, label: 'Contact Name', alignRight: false },
    { id: 2, label: 'Phone', alignRight: false },        
    { id: 3, label: 'Updated By', alignRight: false },        
    { id: 6, label: 'Last Updated Time', alignRight: false },        
    { id:4, label: 'Status', alignRight: false },  
    {id:5,}      
]
const DATA=[
    {
        id:0,
        status:'Active',
        contact_name:'Terry Roston',
        phone:'09023579',
        by:'John',
        update:'12/03/2021 16:38:27',
        color:'#A8DF8E'
    },
    {
        id:2,
        status:'in-active',
        contact_name:'ELITE CULTIVATION, LLC',
        phone:'54654654',
        by:'Doe',
        update:'08/25/2021 14:50:48',
        color:'#89CFF3'
    },
    {
        id:3,
        status:'Active',
        phone:97734234,
        contact_name:'OG Holdings',
        by:'Mary',
        update:'07/22/2021 15:58:23',
        color:'#D71313'
    },]
export default function Crmcontact() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [add, setAdd] = useState(false)
  const [page,setPage] = useState(5)
  const [selected,setSelected] = useState([])
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
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  return (
    <Page title="All Contacts:CRM contacts | Sign-Wise Solution">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <HeaderBreadcrumbs heading="All Contacts" />
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
                        label="City"
                        {...getFieldProps('city')}
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={9}
                      label="Address"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <TextField
                        fullWidth
                        label="State"
                        {...getFieldProps('state')}
                        error={Boolean(touched.state && errors.state)}
                        helperText={touched.state && errors.state}
                      />
                       <TextField
                        fullWidth
                        label="Country"
                        {...getFieldProps('country')}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                     <TextField
                        fullWidth
                        label="Zip/Postal code"
                        {...getFieldProps('country')}
                        error={Boolean(touched.code && errors.code)}
                        helperText={touched.code && errors.code}
                      />
                    </Stack>

                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      maxRows={9}
                      label="Description"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />

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
              alignItems="center" marginBottom={2}
              justifyContent="space-between"
            >
              <Button variant='contained'
                onClick={() => {
                  setAdd(!add)
                }}
              >
                Add Contacts
              </Button>
              </Stack>
              <Grid container spacing={3}>
              <Grid item xs={12} md={10}>
              <Stack spacing={3}>
                   <Stack sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
                    <Stack sx={{display:'flex',flexDirection:'row'}}>
                        <Box sx={{width:20,height:20,backgroundColor:theme.palette.success.light}}/>
                        <Typography sx={{pl:1}}>Call not initiated</Typography>
                        </Stack>
                        <Stack sx={{display:'flex',flexDirection:'row'}}>
                        <Box sx={{width:20,height:20,backgroundColor:theme.palette.info.light}}/>
                        <Typography sx={{pl:1}}>Call initiated no response</Typography>
                        </Stack>
                        <Stack sx={{display:'flex',flexDirection:'row'}}>
                        <Box sx={{width:20,height:20,backgroundColor:theme.palette.error.dark}}/>
                        <Typography sx={{pl:1}}>3times Call initiated but no response</Typography>
                        </Stack>
                        <Stack sx={{display:'flex',flexDirection:'row'}}>
                        <Box sx={{width:20,height:20,backgroundColor:theme.palette.info.main}}/>
                        <Typography sx={{pl:1}}>Call Answered</Typography>
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
                        const { id, name, status,phone, by, update,color,contact_name } = row
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
                            <TableCell >

                                <Box sx={{backgroundColor:color,width:20,height:20}}/>
                               
                            </TableCell>
                            <TableCell onClick={()=>{
                                navigate(PATH_DASHBOARD.crm.viewcontact)
                            }} align="left">{contact_name}</TableCell>
                            <TableCell align="left">{phone}</TableCell>
                           
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
                      {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                    </TableBody>
                    {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
                  </Table>
                </TableContainer>
              </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={DATA.length}
             rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />  */}
            </Card>
          </Container>
        </Page>
      )}
    </Container>
    </Page>
  )
}
