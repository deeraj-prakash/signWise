
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { Form, FormikProvider, useFormik } from 'formik'
// material

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
// routes
//

//component
import Scrollbar from 'src/components/Scrollbar'
import Page from 'src/components/Page'
import { UserListHead } from '../../user/list'
import AddEdit from '../AddEdit'
import { PATH_DASHBOARD } from 'src/routes/paths'


const TABLE_HEAD=[      
    { id: 0, label: 'Campaign Name', alignRight: false },
    { id: 1, label: 'Updated By', alignRight: false },
    { id: 2, label: 'Last Updated Time', alignRight: false },        
    { id:4, label: 'Status', alignRight: false },  
    {id:5,}      
]
const DATA=[
    {
        id:0,
        status:'In-Active',
        name:'Contact NCB',
        by:'John',
        update:'12/03/2021 16:38:27',
    },
    {
        id:2,
        status:'Complete',
        name:'National Cannabis Bureau',
        by:'Doe',
        update:'08/25/2021 14:50:48',
    },
    {
        id:3,
        status:'Active',
        name:'Rostech Contact Form',
        by:'Mary',
        update:'07/22/2021 15:58:23',
    },]
export default function CustomContact() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [add, setAdd] = useState(false)
  const [page,setPage] = useState(5)
  const [selected,setSelected] = useState([])

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
        <Page title="create campaign | Sign-Wise Solution">
          <Container>
            <Stack
              direction="row"
              alignItems="center" marginBottom={2}
              justifyContent="space-between"
            >
              <Button variant='contained'
                onClick={() => {
                  // setAdd(!add)
                  navigate(PATH_DASHBOARD.crm.contactbuilder)
                }}
              >
                Create Custom Contact Form
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
                      from={'create-campaign'}
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
  )
}
