
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Container, Grid, IconButton,
  Stack, Box, Button, TableRow,
  TableBody, Checkbox, Card,
  TableCell, Typography,
  TableContainer, Table,
  TablePagination,
  useTheme, TextField,
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
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import Modal from '../../components/_dashboard/blog/ProjectModel';
import Label from 'src/components/Label';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';

export default function leadstatus() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const onboard_data = [
    {
      id: 0,
      status: 'Active',
      name: 'company not in business',
      by: 'Tim David',
      at: '11/04/2021 15:09:47',
    },
    {
      id: 1,
      status: 'in-active',
      name: 'Tridant-Client Onboarding',
      by: 'Pepp',
      at: '10/25/2021 12:25:04',
    },
    {
      id: 2,
      status: 'Active',
      name: 'Call back requested',
      by: 'Travis Head',
      at: '11/04/2021 15:09:47',
    },
    {
      id: 3,
      status: 'Active',
      name: 'VM not set up',
      by: 'Samuel',
      at: '10/25/2021 11:14:39',
    },

  ]
  const TABLE_HEAD = [
    { id: 0, label: 'Name', alignRight: false },
    { id: 1, label: 'Added By', alignRight: false },
    { id: 2, label: 'Added At', alignRight: false },
    { id: 4, label: 'Status', alignRight: false },
    { id: 5, }
  ]
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
    <Page title="All Lead Statuses | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <HeaderBreadcrumbs
            heading="All Lead Statuses"
          />
          <Box>
            <Button
              onClick={() => {
                setOpen(!open)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Add Lead Statuses
            </Button>
          </Box>
        </Stack>
        {!open ? (


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
                    {onboard_data?.map(row => {
                      const { id, name, status, by, at } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

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
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                          </TableCell>

                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{by}</TableCell>
                          <TableCell align="left">{at}</TableCell>
                          <TableCell align="left">

                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(status === 'in-active' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>

                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              onDelete={''} userName={name}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  </TableBody>

                </Table>
              </TableContainer>
            </Scrollbar>


          </Card>
        ) : (
          <Modal
            modalTitle={'Add Lead Status'}
            open={open == true}
            handleClose={() => {
              setOpen(false)
            }}>

            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={10}>

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

                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Modal>
        )}
      </Container>
    </Page>
  );
}