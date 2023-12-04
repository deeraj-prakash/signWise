
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
     TablePagination,useTheme
    } from '@material-ui/core';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    // import { useDispatch, useSelector } from '../../redux/store';
    // import { getPost, getRecentPosts } from '../../redux/slices/blog';
    import { LoadingButton } from '@material-ui/lab';
    // routes
    import { PATH_DASHBOARD } from 'src/routes/paths.js';
    // components
    import Page from 'src/components/Page.js';
    // import Markdown from '../../components/Markdown';
    import Scrollbar from 'src/components/Scrollbar.js';
    import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
    // import UserList from './UserList';
    // import Modal from '../../components/_dashboard/blog/ProjectModel';
import { UserListHead, UserMoreMenu } from 'src/components/_dashboard/user/list';
import  ProductsSearch  from 'src/components/_dashboard/blog/ProductsSearch.js';
import  PaymentsMenu  from 'src/components/_dashboard/user/list/PaymentsMenu.js';
import Label from 'src/components/Label';


export default function Products(){
    const navigate = useNavigate()
    const [add,setAdd] = useState(false)
    const [selected,setSelected] = useState([])
    const theme = useTheme()
    const onboard_data = [
      {
          id: 0,
          status: 'New',
          name: 'Signboard',
          stage: '1500.00 USD',
          client: 'Lennar',
        //   member: '07/12/2023',
          image: 'https://signwisesolutions.com/uploads/products/IMG_0172.JPG',
      },
    //   {
    //       id: 1,
    //       status: 'Active',
    //       name: 'MDO Sign 4x8 Single Face',
    //       stage: '1200.00 USD',
    //       client: 'Rakesh K',
    //       member: '07/12/2023',
    //       image: '/static/mock-images/products/product_1.jpg',
    //   },
      // Add more objects if necessary
  ];
    const TABLE_HEAD=[      
            // { id: 0, },
            // { id: 1, label: 'Name', alignRight: false },
            // { id: 2, label: 'Price', alignRight: false },
            // { id: 3, label: 'Added By', alignRight: false },
            // { id:4, label: 'Added On', alignRight: false },        
            // { id:5, label: 'Status', alignRight: false },  
            // {id:6, label: 'Options', alignRight: false}      
    ]
    const handleDeleteUser = (event, id) => {

    }
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
    <Page>
      <Container>
        <Card>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                {/* <UserListHead
                //   order={order}
                //   orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                //   rowCount={userList.length}
                //   numSelected={selected.length}
                //   onRequestSort={handleRequestSort}
                //   onSelectAllClick={handleSelectAllClick}
                /> */}
                <TableBody>
                  {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                  {onboard_data?.map(row=>{
                    const { id,image, name, status, stage, client, member } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        // role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      > 
                      <TableCell align="center">                           
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'banned' && 'error') || 'info'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="center">{name}</TableCell>
                        <TableCell align="center">{stage}</TableCell>
                        <TableCell align="left">
                          {row.image && (
                              <img
                              src={row.image}
                              alt="product_image"
                              style={{
                                  width: '70px',
                                  height: '50px',
                                  borderRadius: '5px', // You can adjust the border radius as needed
                                  marginRight: '10px',
                              }}
                          />
                          
                          )}
                        </TableCell>
                        <TableCell align="center">{client}</TableCell>
                        {/* <TableCell align="center">{member}</TableCell> */}
                        

                        <TableCell align="right">
                          <PaymentsMenu />
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