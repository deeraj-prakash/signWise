import { filter, last } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, deleteUser } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';
import  RequestToolbar  from 'src/components/_dashboard/user/list/RequestToolbar';
import  CustomerOrderMenu  from 'src/components/_dashboard/user/list/CustomerOrderMenu.js';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'awarded',}, 
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'type', label: 'Request Type', alignRight: false },
  { id: 'address', label: 'Last Updated', alignRight: false },
  { id: 'status', label: 'Partner Status', alignRight: false },
  { id: 'options', label: 'Options', alignRight: false},      
            // { id: 'name', label: 'Name', alignRight: false },
            // { id: 2, label: 'Price', alignRight: false },
            // { id: 3, label: 'Added By', alignRight: false },
            // { id:4, label: 'Added On', alignRight: false },        
            // { id:5, label: 'Status', alignRight: false },  
            // {id:6, label: 'Options', alignRight: false}    
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const onboard_data=[
    {
        id:0,
        name:'quote 1000',
        type:"RFQ",
        lastupdate:"2 Months ago",
        status:"Accepted",
        awarded: "Awarded"
    },
    {
        id:1,
        name:'Quote 101',
        type:"RFQ",
        lastupdate:"2 Months ago",
        status:"Accepted",
        awarded: "Awarded"
    },
    {
        id:2,
        name:'quote 100',
        type:"RFQ",
        lastupdate:"2 Months ago",
        status:"Accepted",
        awarded: "Awarded"
    },
    {
        id:3,
        name:'quote 11',
        type:"RFQ",
        lastupdate:"2 Months ago",
        status:"Accepted",
        awarded: "Awarded"
    },
    // {
    //     id:4,
    //     status:'In-Active',
    //     name:'Vendor Onboarding',
    //     stage:3,
    //     client:2,
    //     member:0
    // },
    // {
    //     id:5,
    //     status:'In-Active',
    //     name:'Cannabis Laboratory Registration',
    //     stage:3,
    //     client:2,
    //     member:0
    // },
]

export default function Request(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const Request = onboard_data; // Replaced Request with onboard_data
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  // Rest of the code remains unchanged from here
  // ...
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Request.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Request.length) : 0;

  const filteredUsers = applySortFilter(Request, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Request | SignWise Solutions">
      <Container>
        {/* <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              New User
            </Button>
          }
        /> */}

        <Card>
           
          <RequestToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Request.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, awarded, status, type, lastupdate } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell align="left">
                        <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(awarded === 'banned' && 'error') || 'info'}
                          >
                            {awarded ? sentenceCase(awarded) : ''}
                          </Label>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{type}</TableCell>
                        <TableCell align="center">{lastupdate}</TableCell>
                        <TableCell align="center">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                            <Button    
                              variant="outlined"
                              onDelete={() => handleDeleteUser(id)} userName={name}
                              component={RouterLink}
                              to={`${PATH_DASHBOARD.user.requests}`}
                            >
                              View
                            </Button> 
                        </TableCell>
                        
                
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Request.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
