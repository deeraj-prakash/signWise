import { filter } from 'lodash';
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
import  QuestionnaireTemplateToolbar  from 'src/components/_dashboard/user/list/QuestionnaireTemplateToolbar';
import  ProductsSearch  from 'src/components/_dashboard/blog/ProductsSearch.js';
import  QuestionnaireTemplateMenu  from 'src/components/_dashboard/user/list/QuestionnaireTemplateMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'name', label: 'Department Name', alignRight: false },
  { id: 'updatedby', label: 'Added By', alignRight: false },
  { id: 'lastupdatedtime', label: 'Added Time', alignRight: false }, 
  { id:'options', label: 'Options', alignRight: false},      

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

const onboard_data = [
    {
        id: 0,
        status: 'Active',
        name: 'Project needs request',
        updatedby: 'Rakesh K',
        lastupdatedtime: '07/11/2023 10:54:21',
    },

    {
      id: 1,
      status: 'Active',
      name: 'Start your free trial',
      updatedby: 'Rakesh K',
      lastupdatedtime: '08/25/2021 14:48:17',
  },

  {
    id: 2,
    status: 'Active',
    name: 'Tridant-Client Onboarding-Disclosure/Signature',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/12/2021 14:56:41',
  },

  {
    id: 3,
    status: 'Active',
    name: 'Tridant-Client Onboarding-Registration',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/12/2021 14:41:03',
  },

  {
    id: 4,
    status: 'Active',
    name: 'Tridant-Client Onboarding-Company Overview',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/12/2021 14:17:20',
  },

  {
    id: 5,
    status: 'Active',
    name: 'Tridant-Client Onboarding-Company Contact',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/12/2021 13:00:57',
  },

  {
    id: 6,
    status: 'Active',
    name: 'Checking in BioMass',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/04/2021 12:08:04',
  },

  {
    id: 7,
    status: 'Active',
    name: 'Offboarding-Exit Interview',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/03/2021 16:39:29',
  },

  {
    id: 8,
    status: 'Active',
    name: 'Printing Services Request-Project Details',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/03/2021 15:16:11',
  },

  {
    id: 9,
    status: 'Active',
    name: 'Printing Services Request-Contact Information',
    updatedby: 'Rakesh K',
    lastupdatedtime: '08/03/2021 14:30:44',
  },
    
    // Add more objects if necessary
];

export default function QuestionnaireTemplateList(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const QuestionnaireTemplateList = onboard_data; // Replaced QuestionnaireTemplateList with onboard_data
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
      const newSelecteds = QuestionnaireTemplateList.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - QuestionnaireTemplateList.length) : 0;

  const filteredUsers = applySortFilter(QuestionnaireTemplateList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="All Questionnaire Templates | SignWise Solutions">
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
          <QuestionnaireTemplateToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={QuestionnaireTemplateList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, lastupdatedtime, status, updatedby } = row;
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
                            color={(status === 'banned' && 'error') || 'info'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{updatedby}</TableCell>
                        <TableCell align="left">{lastupdatedtime}</TableCell>
                        <TableCell align="right">
                          <QuestionnaireTemplateMenu onDelete={() => handleDeleteUser(id)} userName={name} />
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
            count={QuestionnaireTemplateList.length}
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
