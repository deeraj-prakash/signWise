
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TableContainer,Table,
     TablePagination,
     useTheme,
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
    import UserList from './UserList';
    import Modal from '../../components/_dashboard/blog/ProjectModel';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import Label from 'src/components/Label';

export default function Onboarding(){
    const navigate = useNavigate()
    const theme = useTheme()
    const [add,setAdd] = useState(false)
    const [selected,setSelected] = useState([])
    const onboard_data=[
        {
            id:0,
            status:'Active',
            name:'Sales And Design',
            stage:3,
            client:2,
            member:0
        },
        {
            id:1,
            status:'Active',
            name:'Tridant-Client Onboarding',
            stage:3,
            client:2,
            member:0
        },
        {
            id:2,
            status:'Active',
            name:'Offboarding Employee',
            stage:3,
            client:2,
            member:0
        },
        {
            id:3,
            status:'Active',
            name:'New Employee Onboarding',
            stage:3,
            client:2,
            member:0
        },
        {
            id:4,
            status:'In-Active',
            name:'Vendor Onboarding',
            stage:3,
            client:2,
            member:0
        },
        {
            id:5,
            status:'In-Active',
            name:'Cannabis Laboratory Registration',
            stage:3,
            client:2,
            member:0
        },
    ]
    const TABLE_HEAD=[      
            { id: 0, label: 'Name', alignRight: false },
            { id: 1, label: 'Stage', alignRight: false },
            { id: 2, label: 'Client Assigned', alignRight: false },
            { id:3, label: 'Team Member', alignRight: false },        
            { id:4, label: 'Status', alignRight: false },  
            {id:5,}      
    ]
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
    return(
        <Page title="Onboard: Onboarding Workflows | Sign-Wise Solution">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HeaderBreadcrumbs
          heading="Onboarding Workflows"
        />
        <Box>
        <Button
              onClick={()=>{
                navigate(PATH_DASHBOARD.onboard.create)
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
             Create New Workflows
            </Button>
        </Box>
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
                  {onboard_data?.map(row=>{
                    const { id, name, status, stage, client, member } = row;
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
                        <TableCell align="center">{stage}</TableCell>
                        <TableCell align="center">{client}</TableCell>
                        <TableCell align="center">{member}</TableCell>
                        <TableCell align="center">
                           
                         <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'In-Active' && 'error') || 'success'}
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
}