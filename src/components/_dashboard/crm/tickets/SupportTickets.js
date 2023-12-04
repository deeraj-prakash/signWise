
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import {
     Container,Grid,IconButton,
     Stack,Box,Button, TableRow,
     TableBody, Checkbox,Card,
     TableCell,Typography,
     TableContainer,Table,
    } from '@material-ui/core';
    import { Icon } from '@iconify/react';
    import plusFill from '@iconify/icons-eva/plus-fill';
    // redux
    import { LoadingButton } from '@material-ui/lab';
    // routes
    import { PATH_DASHBOARD } from 'src/routes/paths';
    // components


    import Scrollbar from 'src/components/Scrollbar';

    import UserList from 'src/pages/dashboard/UserList';

import { UserListHead,UserMoreMenu } from '../../user/list';
import Label from 'src/components/Label';

export default function SupportTickets(){
    const navigate = useNavigate()
    const theme = useTheme()
    const [selected,setSelected] = useState([])
    const data=[
        {
            id:"OTH0013",
            status:'Active',
            name:'Free Tickets',
            projectname:'Project X',
            total:3,
            pending:2,
            over:1,
            percent:10,
        },
        {
            id:"OTH0012",
            status:'Active',
            name:'Sample 1',
            projectname:'Project XY',
            total:3,
            pending:2,
            over:0,
            percent:100,
        },
        {
            id:"OTH0009",
            status:'Active',
            name:'Project Tickets',
            projectname:'Project XZ',
            total:3,
            pending:2,
            over:1,
            percent:10,
        },
        {
            id:"OTH00093",
            status:'Active',
            name:'New Supports Tickets',
            projectname:'Project XA',
            total:3,
            pending:2,
            over:0,
            percent:50,
        },
        {
            id:"OTH00094",
            status:'In-Active',
            name:'New Tickets',
            projectname:'Project XX',
            total:3,
            pending:2,
            over:1,
            percent:100,
        },
        {
            id:"OTH00095",
            status:'In-Active',
            name:'Sample Ticket',
            projectname:'Project XT',
            total:3,
            pending:2,
            over:0,
            percent:10,
        },
    ]
    const TABLE_HEAD=[      
            { id: 0, label: 'Tickets', alignRight: false },
            { id: 1, label: 'Task Name', alignRight: false },
            { id: 2, label: 'Project Name', alignRight: false },
            { id:3, label: 'Completion %', alignRight: false },        
            { id:4, label: 'Task in Total', alignRight: false },  
            { id:4, label: 'Completed Task ', alignRight: false },  
            { id:4, label: 'Pending Task', alignRight: false },  
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
                {data?.map(row=>{
                  const { id, name,projectname, status,percent, pending, total, over } = row;
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
                     
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="center" onClick={()=>navigate(PATH_DASHBOARD.crm.viewticket)}>{name}</TableCell>
                      <TableCell align="center">{projectname}</TableCell>
                       <TableCell align="center">
                         
                       <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={
                            percent === 100
                              ? 'success'
                              : percent === 0 || (percent > 25 && percent < 75)
                              ? 'info'
                              : 'error'
                          }
                        >
                         {percent}% Completion
                        </Label> 
                      </TableCell> 
                      <TableCell align="center">{total}</TableCell>
                      <TableCell align="center">{pending}</TableCell>
                      <TableCell align="center">{over}</TableCell>

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
    )
}