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

import fakeRequest from 'src/utils/fakeRequest'
// routes
//

//component
import Scrollbar from 'src/components/Scrollbar'
import Page from 'src/components/Page'
import { UserListHead } from '../user/list'
import AddEdit from './AddEdit'

const Media = [
  { id: 0, value: 'Yes' },
  { id: 1, value: 'No' }, 
]
const STATUS = [
  { id: 0, value: 'Planning' },
  { id: 1, value: 'Active ' },
  { id: 2, value: 'In Active' },
  { id: 3, value: 'Completed' },
]
const TABLE_HEAD=[      
    { id: 0, label: 'Field Name', alignRight: false },
    { id: 1, label: 'Required', alignRight: false },
    { id: 2, label: 'Help Text', alignRight: false },          
    {id:3,label: 'Updated By', alignRight: false } ,     
    {id:4,label: 'Last Updated Time', alignRight: false } ,
    {id:5,},    
]
const DATA=[
    {
        id:0,
        required:'Yes',
        status:'Active',
        by:'John',
        text:'Enter your email id',
        update:'12/03/2021 16:38:27',
        field:'title',
    },
    {
        id:2,
        required:'Yes',
        status:'complete',
        by:'Doe',
        text:'Enter client name',
        update:'08/25/2021 14:50:48',
        field:'name',
    },
    {
        id:3,
        required:'No',
        status:'Active',
        by:'Mary',
        text:'Name',
        update:'07/22/2021 15:58:23',
        field:'email',
    },]
export default function CustomFeildSetting() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [page,setPage] = useState(5)
  const [selected,setSelected] = useState([])
  const NewUserSchema = Yup.object().shape({
    
   
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
    <>
      {open ? (
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <TextField
                        fullWidth
                        label="Help Text"
                        {...getFieldProps('text')}
                        error={Boolean(touched.text && errors.text)}
                        helperText={touched.text && errors.text}
                      />
                       <Autocomplete
                          fullWidth
                          id="combo-box-demo"
                          options={Media}
                          getOptionLabel={(state) => state.value}
                          // sx={{ width: 400 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Type" />
                          )} // Update the label
                        />
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
                          setOpen(false)
                        }}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        variant="outlined"
                        type="submit"
                        onClick={() => {
                          setOpen(false)
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
              
            </Stack>
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
                        const { id, name, status, by, field,required,text ,update} = row
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

                            <TableCell align="left">{field}</TableCell>
                            <TableCell align="center">{required}</TableCell>
                            <TableCell align="center">{text}</TableCell>
                            <TableCell align="center">{by}</TableCell>
                            <TableCell align="center">{update}</TableCell>
                            <TableCell align="left">
                             <Button variant='outlined' onClick={()=>{setOpen(!open),id}}>
                                Change Setting
                             </Button>
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
    </>
  )
}
