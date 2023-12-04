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
 Container, TableContainer,
  Table,TableCell,TableHead,TableBody,TableRow,TablePagination,
  TextField,
  Typography,
  
  
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
import { UserListHead } from '../../user/list'
import AddEdit from '../AddEdit'

const Media = [
  { id: 0, value: 'Processor' },
  { id: 1, value: 'Grower' },
  { id: 2, value: 'Dispensary' },
  { id: 3, value: 'Transporter' },
  { id: 4, value: 'Software Provider' },
]

const TABLE_HEAD=[      
    { id: 0, label: 'Target Name', alignRight: false },
    { id: 1, label: 'Updated By', alignRight: false },
    { id: 2, label: 'Last Updated Time', alignRight: false },        
    { id:4, label: 'Status', alignRight: false },  
    {id:5,}      
]
const DATA=[
    {
        id:0,
        status:'Active',
        name:'Website contact form',
        by:'John',
        update:'12/03/2021 16:38:27',
    },
    {
        id:2,
        status:'Complete',
        name:'Tridant Free Trail',
        by:'Doe',
        update:'08/25/2021 14:50:48',
    },
    {
        id:3,
        status:'Active',
        name:'National cannabis Bureau',
        by:'Mary',
        update:'07/22/2021 15:58:23',
    },]
export default function AddTarget (){
        const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [add, setAdd] = useState(false)
  const [page,setPage] = useState(5)
  const [selected,setSelected] = useState([])
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
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
      {add ? (
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
                        label="Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                      <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={Media}
                        getOptionLabel={(state) => state.value}
                        // sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Industry" />
                        )} // Update the label
                      />
                    </Stack>
                    

                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={7}
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
                Add Target
              </Button>
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
                        const { id, name, status, by, update } = row
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

                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="center">{by}</TableCell>
                            <TableCell align="center">{update}</TableCell>
                            <TableCell align="left">
                              {status}
                              {/* <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label> */}
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
    </>
  )
}