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
  Checkbox,FormControl, FormLabel, RadioGroup, Radio,
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

const TABLE_HEAD = [
  { id: 0, label: 'Date', alignRight: false },
  { id: 7, label: 'Direction', alignRight: true },
  { id: 1, label: 'From', alignRight: false },
  { id: 2, label: 'To', alignRight: false },
  { id: 5 },
  { id: 6 },
]
const DATA = [
  {
    id: 0,
    status: 'answered',
    from :'+19187165456',
    to:'+919496351674',
    phone: '09023579',
    direction: 'Outgoing',
    date: '12/03/2021 16:38:27',
  },
  {
    id: 2,
    status: 'answered',
    phone: '54654654',  
    direction: 'Outgoing',
    date: '08/25/2021 14:50:48',
    from :'+19187165456',
    to:'+919496351674',
  },
  {
    id: 3,
    status: 'not-answered',
    phone: 97734234,
    direction: 'Incoming',
    date: '07/22/2021 15:58:23', 
    from :'+19187165456',
    to:'+919496351674',
  },
]

export default function callLead (){
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const theme = useTheme()
    const [page, setPage] = useState(5)
    const [selected, setSelected] = useState([])
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
    return(
        <Page>
       <Container>
          <Card>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 850 }}>
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
                            status,
                            phone,date,
                           from,to ,direction
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
                                {date}
                              </TableCell>
                              <TableCell>{direction}</TableCell>
                              <TableCell align="left">{from}</TableCell>
                              <TableCell align="left">{to}</TableCell>
                              {/* <TableCell align="center">{update}</TableCell> */}
                              <TableCell align="left">
                              <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'not-answered' && 'error') || 'success'}
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
    )
}