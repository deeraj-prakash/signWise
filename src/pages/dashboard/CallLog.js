// import PropTypes from 'prop-types';
import * as Yup from 'yup';
// material
import {
  Box,
  Card,
  CardHeader,
  Grid,
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
  TablePagination,
  TableHead,
  TableSortLabel, 
  Tabs,
  Tab,
  TextField,
  List,
  ListItem,
  ListItemText,} from '@material-ui/core';
  import { LoadingButton, MobileDatePicker, MobileTimePicker } from '@material-ui/lab';
import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { sentenceCase, capitalCase } from 'change-case';
import Scrollbar from 'src/components/Scrollbar';
import { visuallyHidden } from '@material-ui/utils';
import Label from 'src/components/Label';
import { Form, FormikProvider, useFormik } from 'formik';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { BlogPostsSort } from 'src/components/_dashboard/blog';
//

// ----------------------------------------------------------------------

// Profile.propTypes = {
//   myProfile: PropTypes.object,
//   posts: PropTypes.array
// };

const TABLE_HEAD = [
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'start', label: 'Start', alignRight: false },
  { id: 'end', label: 'End', alignRight: false },  
  { id: 'direction', label: 'Direction', alignRight: false },
];

const ACCOUNT_TABS = [
  {
    value: 'filter',
    // icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    // component: <AccountGeneral />
  },
  {
    value: 'advance',
    // icon: <Icon icon={bellFill} width={20} height={20} />,
    // component: <AccountNotifications />
  },
];

const SORT_OPTIONS = [
  { value: 'all', label: 'All Calls' },
  { value: 'answered', label: 'Answered Calls' },
  { value: 'missed', label: 'Missed Calls' }
];

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

export default function CallLog({ myProfile, posts }) {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [userList, setUserList] = useState([
    { status: 'answered', phone: '9876543210', start: '' , end: '', direction: ''},
    { status: 'answered', phone: '9876543210', start: '' , end: '', direction: ''},
    { status: 'missed', phone: '9876543210', start: '' , end: '', direction: ''},
    { status: 'missed', phone: '9876543210', start: '' , end: '', direction: ''},
  ]);
  const [orderBy, setOrderBy] = useState('name');
  const [currentTab, setCurrentTab] = useState('filter');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState('all');

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  }

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  const UpdateUserSchema = Yup.object().shape({
    cryteria: Yup.string().required('cryteria is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cryteria: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
            {/* <CardHeader title="Social" /> */}
            <Stack sx={{ p: 2,alignItems:'center' }}>
              <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {ACCOUNT_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} value={tab.value} />
              ))}
            </Tabs>
            {currentTab==='advance' &&
            <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
              <Grid item xs={12} >
                {/* <Card sx={{ p: 3 }}> */}
                  <Stack spacing={{ xs: 2, md: 3 }} sx={{ pt: 2, px: 1}}>
                    <Stack>
                      {/* <TextField fullWidth label="Cryteria" {...getFieldProps('cryteria')} /> */}
                      <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <Box
                        component={ MobileDatePicker }
                        label="Start Date"
                        value={values.start_date}
                        onChange={(date) => setFieldValue('start_date', date)}
                        renderInput={(params) => (
                          <TextField size="medium" {...params} fullWidth />
                        )}
                      />
                      <Box
                        component={ MobileDatePicker }
                        label="End Date"
                        value={values.end_date}
                        onChange={(date) => setFieldValue('end_date', date)}
                        renderInput={(params) => (
                          <TextField size="medium" {...params} fullWidth />
                        )}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Box
                        component={ MobileTimePicker }
                        label="Start Time"
                        value={values.end_time}
                        onChange={(time) => setFieldValue('end_time', time)}
                        renderInput={(params) => (
                          <TextField size="medium" {...params} fullWidth />
                        )}
                      />
                    <Box
                        component={ MobileTimePicker }
                        label="End Time"
                        value={values.start_time}
                        onChange={(time) => setFieldValue('start_time', time)}
                        renderInput={(params) => (
                          <TextField size="medium" {...params} fullWidth />
                        )}
                      />
                    </Stack>

                  </Stack>

                  <Box sx={{ mt: 3, px: 1, pb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Submit
                    </LoadingButton>
                  </Box>
                {/* </Card> */}
              </Grid>
              </Grid>
            </Form>
          </FormikProvider>}
          {currentTab === 'filter' && 
          <Box sx={{ mt: 3, px: 1, pb: 2, width:'100%', display: 'flex', justifyContent: 'flex-start' }}>
            <List sx={{width:'100%'}}>
            <ListItem button >
                <ListItemText primary="All Calls" />
            </ListItem>
            <ListItem button >
                <ListItemText primary="Answered" />
            </ListItem>
            <ListItem button >
                <ListItemText primary="Missed" />
            </ListItem>
          </List>
          </Box>
          }
            </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Call Logs" />
              {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          {/* <Scrollbar> */}
            <TableContainer sx={{ minWidth: 300, mt: 3 }}>
              <Table>
                {/* <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                /> */}
                <TableHead>
                  <TableRow>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                      />
                    </TableCell> */}
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        {false !=='onboard'?(
                            <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            // onClick={createSortHandler(headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                              <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                            ) : null}
                          </TableSortLabel>
                        ):(
                          <TableSortLabel
                          hideSortIcon
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                          ) : null}
                        </TableSortLabel>
                        )}
                      
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { status, phone, start, end, direction } = row;
                    const isItemSelected = selected.indexOf(phone) !== -1;

                    return (
                      <TableRow
                        hover
                        key={phone}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={(status === 'missed' && 'error') || 'success'}
                        >
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{start}</TableCell>
                        <TableCell align="left">{end}</TableCell>
                        <TableCell align="left">{direction}</TableCell>
                        
                      </TableRow>
                    );
                  })}
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
          {/* </Scrollbar> */}
            </Card>
      </Grid>
    </Grid>
  );
}
