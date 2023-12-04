import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { AttachFile, TaskAltOutlined } from '@material-ui/icons';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

// material
import {
  Container,
  Tab, Box, Table, TableBody, Tooltip,
  Tabs, Stack, Checkbox, Avatar,
  Button, Menu, TableRow, Typography,
  MenuItem, TextField, Card,
  TableContainer, TableCell, Toolbar, useTheme
} from '@material-ui/core';
// redux
import { useDispatch } from '../../redux/store';
import { getCards, getProfile, getInvoices, getAddressBook, getNotifications } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword
} from '../../components/_dashboard/user/account';
import Modal from 'src/components/_dashboard/blog/ProjectModel';
import ProjectTask from 'src/components/_dashboard/viewProject/ProjectTask';
import ProjectMember from 'src/components/_dashboard/viewProject/ProjectMember';
import Label from 'src/components/Label';
import AddTask from 'src/components/_dashboard/viewProject/AddTask';

// ----------------------------------------------------------------------

export default function ViewProject() {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState('TASKS');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);
  const TABLE_HEAD = [
    { id: 0, label: 'Added By', alignRight: false },
    { id: 1, label: 'Company', alignRight: false },
    { id: 2, label: 'Role', alignRight: false },
    { id: 3, label: 'Added On', alignRight: false },
    { id: 4, label: 'Verified', alignRight: false },
    { id: 5, label: 'Status', alignRight: false },

  ];
  const table_body = [
    { id: 0, name: 'Installation Of site maps', Level: "High", status: 'In-Progress', assignee: 'john',
    img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D' },
    { id: 1, name: 'Site Maps', Level: 'High', status: 'Completed', assignee: 'kennedy',img:'https://img.etimg.com/thumb/width-640,height-480,imgsize-318700,resizemode-75,msid-95017107/tech/startups/india-to-beat-us-europe-in-terms-of-learners-coursera-chief/jeff-maggioncalda-ceo-coursera_1-1.jpg' },
    { id: 2, name: 'Various Maps', Level: 'Low', status: 'Completed', assignee: 'Tresa',img:'https://thumbnails.texastribune.org/rkmPaACXKjvMeKn62te49iNeIbw=/850x570/smart/filters:quality(75)/https://static.texastribune.org/media/files/dd54e8c58d53f2afe0d9d72ebfc1f2f4/2022%20Pro-Life%20Conference%20McAllen%20MGO%20TT%2032.jpg' },
    { id: 3, name: 'Location Service Maps', Level: 'Medium', status: 'To-Do', assignee: 'Mattew',img:'https://www.shutterstock.com/image-photo/middle-aged-cheerful-dark-skinned-260nw-1104889238.jpg' },
    { id: 4, name: 'Gps Tracking ', Level: "High", status: 'In-Progress', assignee: 'Abraham',img:'https://media.istockphoto.com/id/1224956842/photo/portarit-of-a-handsome-older-man-drinking-coffee.webp?b=1&s=170667a&w=0&k=20&c=VW9e5YLp69IZ_nJNNDL-MaNpQdSoLsaMA_9e4ocykrc=' },
  ]
  const ACCOUNT_TABS = [
    {
      value: 'TASKS',
      icon: <Icon icon={TaskAltOutlined} width={20} height={20} />,
      component: <ProjectTask />
    },
    {
      value: 'MEMBERS',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <ProjectMember />
    },
    {
      value: 'ATTACHMENTS',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: ''
    },
    {
      value: 'STARRED',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: ''
    },
    {
      value: 'MENTIONS',
      // icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: ''
    }
  ];
  const option = [{ id: 0, value: 'Active' }, { id: 1, value: 'In Active' }, { id: 2, value: 'New' },
  { id: 3, value: 'Completed' }, { id: 4, value: 'Open' }, { id: 5, value: 'Rejected' }, { id: 6, value: 'Verified' }]
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const [value, setValue] = useState('Completed')
  const [add, setAdd] = useState(false)
  const [selected, setSelected] = useState([])
  console.log(value)
  const handleClick = (event, name) => {
    console.log(event, '%%%%%%%%%%%%', name)
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
  console.log(selected)
  return (

    <Container>
      <HeaderBreadcrumbs
        heading="Tasks"
      />

      <Stack spacing={5}>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TextField select size="small" value={value}  >
            {option.map((optio) => (
              <MenuItem onClick={() => { setValue(optio.value) }} key={optio.value} value={optio.value}>
                {optio.value}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={() => { setAdd(!add) }} sx={{ margin: 1, borderRadius: 20 }} variant='contained'>Add Task</Button>
        </Stack>

      </Stack>
      {!add ? (
        <Card>
        <Scrollbar> 
          <Typography variant='subtitle1' sx={{margin:1}}>
            Board:{table_body.length}
          </Typography>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>

              <TableBody>
                {table_body.map((row) => {
                  const { id,Level,img, name, members, status, assignee, } = row;
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
                        <Checkbox checked={isItemSelected} onClick={(e) => { handleClick(e, id) }} />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                       <TableCell align="left"></TableCell> 
                      <TableCell align='right' component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="right" spacing={2}>
                          <Tooltip title={assignee} arrow>
                            <Avatar alt={assignee} src={img} />
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                      <Typography variant='body2' sx={{
                          color: Level === 'High' ? theme.palette.error.light
                            : Level === 'Medium' ? theme.palette.warning.main
                              : Level === 'Low' ? theme.palette.info.light
                                : theme.palette.text.primary
                        }}>

                          {Level}

                        </Typography>
                        </TableCell>
                      <TableCell align="right">
                        <Typography variant='body2' sx={{
                          color: status === 'In-Progress' ? theme.palette.warning.main
                            : status === 'To-Do' ? theme.palette.info.light
                              : status === 'Completed' ? theme.palette.success.main
                                : theme.palette.text.primary
                        }}>

                          {status}

                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
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
      </Card>
      ):(
        <AddTask add={add} setAdd={setAdd} />
      )}
      
    </Container>

  );
}
